import express from 'express';
import { PrismaClient } from '../generated/prisma';

const router = express.Router();
const prisma = new PrismaClient();

// Create meal plan
router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const { user_id, meal_id, date, servings } = req.body;

    // Validate required fields
    if (!user_id || !meal_id || !date || !servings) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Check if the meal exists, if not create it
    let meal = await prisma.meal.findUnique({
      where: { id: meal_id }
    });

    if (!meal) {
      // The meal_id is likely a meal preference ID, so we need to find the actual meal
      // First, get the meal preference to get the meal name
      const mealPreference = await prisma.userMealPreference.findUnique({
        where: { id: meal_id }
      });

      if (mealPreference) {
        // Find the actual meal for this preference, user, and date
        meal = await prisma.meal.findFirst({
          where: {
            user_id: parseInt(user_id),
            date: new Date(date),
            name: mealPreference.name
          }
        });

        if (!meal) {
          // Create the meal using the preference data
          meal = await prisma.meal.create({
            data: {
              id: `${mealPreference.id}-${date}`,
              name: mealPreference.name,
              date: new Date(date),
              user_id: parseInt(user_id),
              time: mealPreference.default_time
            }
          });
        }
      } else {
        // If no meal preference found, create a basic meal as fallback
        meal = await prisma.meal.create({
          data: {
            id: meal_id,
            name: 'Meal', // Default name
            date: new Date(date),
            user_id: parseInt(user_id),
            time: '12:00:00' // Default time
          }
        });
      }
    }

    // Now check if meal plan already exists for this user, meal, and date using the actual meal ID
    const existingPlan = await prisma.mealPlan.findFirst({
      where: {
        user_id: parseInt(user_id),
        meal_id: meal.id, // Use the actual meal ID, not the original meal_id
        date: new Date(date)
      }
    });

    if (existingPlan) {
      // Update the existing meal plan instead of creating a new one
      // First delete existing servings
      await prisma.foodServing.deleteMany({
        where: {
          mealPlanId: existingPlan.id
        }
      });

      // Process servings to ensure serving units exist
      const processedServings = await Promise.all(servings.map(async (serving: any) => {
        const unitId = serving.unit_id || serving.unit_name;
        const unitName = serving.unit_name || 'g';
        
        // Check if serving unit exists by ID first
        let servingUnit = await prisma.servingUnit.findUnique({
          where: { id: unitId }
        });

        if (!servingUnit) {
          // Check if serving unit exists by name and food_id combination
          servingUnit = await prisma.servingUnit.findFirst({
            where: {
              name: unitName,
              food_id: serving.food_id
            }
          });

          if (!servingUnit) {
            // Create a default serving unit if it doesn't exist
            servingUnit = await prisma.servingUnit.create({
              data: {
                id: unitId,
                name: unitName,
                grams: 1, // Default to 1 gram
                food_id: serving.food_id
              }
            });
          }
        }

        return {
          ...serving,
          unit_id: servingUnit.id
        };
      }));

      // Update the existing meal plan with new servings
      const updatedPlan = await prisma.mealPlan.update({
        where: { id: existingPlan.id },
        data: {
          servings: {
            create: processedServings.map((serving: any) => ({
              id: `${Date.now()}-${Math.random()}`,
              food: {
                connect: { id: serving.food_id }
              },
              meal: {
                connect: { id: meal.id } // Connect to the actual meal
              },
              quantity: serving.quantity,
              unit: {
                connect: { id: serving.unit_id }
              }
            }))
          }
        },
        include: {
          servings: {
            include: {
              food: {
                include: {
                  macros: {
                    include: {
                      metric: true
                    }
                  },
                  servingUnits: true
                }
              },
              unit: true
            }
          },
          meal: true
        }
      });

      res.json(updatedPlan);
      return;
    }

    // Process servings to ensure serving units exist
    const processedServings = await Promise.all(servings.map(async (serving: any) => {
      const unitId = serving.unit_id || serving.unit_name;
      const unitName = serving.unit_name || 'g';
      
      // Check if serving unit exists by ID first
      let servingUnit = await prisma.servingUnit.findUnique({
        where: { id: unitId }
      });

      if (!servingUnit) {
        // Check if serving unit exists by name and food_id combination
        servingUnit = await prisma.servingUnit.findFirst({
          where: {
            name: unitName,
            food_id: serving.food_id
          }
        });

        if (!servingUnit) {
          // Create a default serving unit if it doesn't exist
          servingUnit = await prisma.servingUnit.create({
            data: {
              id: unitId,
              name: unitName,
              grams: 1, // Default to 1 gram
              food_id: serving.food_id
            }
          });
        }
      }

      return {
        ...serving,
        unit_id: servingUnit.id
      };
    }));

    // Create meal plan with servings
    const mealPlan = await prisma.mealPlan.create({
      data: {
        user_id: parseInt(user_id),
        meal_id: meal.id, // Reference the actual meal
        date: new Date(date),
        servings: {
          create: processedServings.map((serving: any) => ({
            id: `${Date.now()}-${Math.random()}`,
            food: {
              connect: { id: serving.food_id }
            },
            meal: {
              connect: { id: meal.id } // Connect to the actual meal
            },
            quantity: serving.quantity,
            unit: {
              connect: { id: serving.unit_id }
            }
            // mealPlanId will be automatically set by Prisma due to the relation
          }))
        }
      },
      include: {
        servings: {
          include: {
            food: {
              include: {
                macros: {
                  include: {
                    metric: true
                  }
                },
                servingUnits: true
              }
            },
            unit: true
          }
        },
        meal: true
      }
    });

    res.json(mealPlan);
  } catch (error) {
    console.error('Error creating meal plan:', error);
    res.status(500).json({ error: 'Failed to create meal plan' });
  }
});

// Get meal plans for a user and date
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const { user_id, date } = req.query;

    if (!user_id || !date) {
      res.status(400).json({ error: 'Missing user_id or date parameter' });
      return;
    }

    const mealPlans = await prisma.mealPlan.findMany({
      where: {
        user_id: parseInt(user_id as string),
        date: new Date(date as string)
      },
      include: {
        servings: {
          include: {
            food: {
              include: {
                macros: {
                  include: {
                    metric: true
                  }
                },
                servingUnits: true
              }
            },
            unit: true
          }
        },
        meal: true
      }
    });

    res.json(mealPlans);
  } catch (error) {
    console.error('Error fetching meal plans:', error);
    res.status(500).json({ error: 'Failed to fetch meal plans' });
  }
});

// Update meal plan
router.put('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { servings } = req.body;

    // Get the meal plan to find the meal_id
    const mealPlan = await prisma.mealPlan.findUnique({
      where: { id }
    });

    if (!mealPlan) {
      res.status(404).json({ error: 'Meal plan not found' });
      return;
    }

    // Delete existing servings
    await prisma.foodServing.deleteMany({
      where: {
        mealPlanId: id
      }
    });

    // Process servings to ensure serving units exist
    const processedServings = await Promise.all(servings.map(async (serving: any) => {
      const unitId = serving.unit_id || serving.unit_name;
      const unitName = serving.unit_name || 'g';
      
      // Check if serving unit exists by ID first
      let servingUnit = await prisma.servingUnit.findUnique({
        where: { id: unitId }
      });

      if (!servingUnit) {
        // Check if serving unit exists by name and food_id combination
        servingUnit = await prisma.servingUnit.findFirst({
          where: {
            name: unitName,
            food_id: serving.food_id
          }
        });

        if (!servingUnit) {
          // Create a default serving unit if it doesn't exist
          servingUnit = await prisma.servingUnit.create({
            data: {
              id: unitId,
              name: unitName,
              grams: 1, // Default to 1 gram
              food_id: serving.food_id
            }
          });
        }
      }

      return {
        ...serving,
        unit_id: servingUnit.id
      };
    }));

    // Create new servings
    const updatedPlan = await prisma.mealPlan.update({
      where: { id },
      data: {
        servings: {
          create: processedServings.map((serving: any) => ({
            id: `${Date.now()}-${Math.random()}`,
            food: {
              connect: { id: serving.food_id }
            },
            meal: {
              connect: { id: mealPlan.meal_id }
            },
            quantity: serving.quantity,
            unit: {
              connect: { id: serving.unit_id }
            }
          }))
        }
      },
      include: {
        servings: {
          include: {
            food: {
              include: {
                macros: {
                  include: {
                    metric: true
                  }
                },
                servingUnits: true
              }
            },
            unit: true
          }
        },
        meal: true
      }
    });

    res.json(updatedPlan);
  } catch (error) {
    console.error('Error updating meal plan:', error);
    res.status(500).json({ error: 'Failed to update meal plan' });
  }
});

// Delete meal plan
router.delete('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    await prisma.mealPlan.delete({
      where: { id }
    });

    res.json({ message: 'Meal plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting meal plan:', error);
    res.status(500).json({ error: 'Failed to delete meal plan' });
  }
});

// Update serving quantity (for when foods are logged)
router.put('/:id/servings/:servingId', async (req: express.Request, res: express.Response) => {
  try {
    const { id, servingId } = req.params;
    const { remaining_quantity } = req.body;

    if (remaining_quantity <= 0) {
      // Delete the serving if quantity is 0 or negative
      await prisma.foodServing.delete({
        where: { id: servingId }
      });
    } else {
      // Update the serving quantity
      await prisma.foodServing.update({
        where: { id: servingId },
        data: { quantity: remaining_quantity }
      });
    }

    res.json({ message: 'Serving updated successfully' });
  } catch (error) {
    console.error('Error updating serving:', error);
    res.status(500).json({ error: 'Failed to update serving' });
  }
});

export default router; 