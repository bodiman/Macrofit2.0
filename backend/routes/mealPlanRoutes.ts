import express from 'express';
import { PrismaClient } from '../generated/prisma';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const prisma = new PrismaClient();

// Create meal plan
router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const { user_id, meal_id, date, servings } = req.body;

    console.log(`=== CREATE MEAL PLAN ===`);
    console.log('Request body:', JSON.stringify({ user_id, meal_id, date, servings_count: servings?.length }, null, 2));

    // Validate required fields
    if (!user_id || !meal_id || !date || !servings) {
      console.log('❌ Missing required fields');
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Check if the meal exists, if not create it
    let meal = await prisma.meal.findUnique({
      where: { id: meal_id }
    });

    if (!meal) {
      console.log(`🔍 Meal not found by ID: ${meal_id}, looking for meal preference...`);
      // The meal_id is likely a meal preference ID, so we need to find the actual meal
      // First, get the meal preference to get the meal name
      const mealPreference = await prisma.userMealPreference.findUnique({
        where: { id: meal_id }
      });

      if (mealPreference) {
        console.log(`📋 Found meal preference: ${mealPreference.name}`);
        // Find the actual meal for this preference, user, and date
        meal = await prisma.meal.findFirst({
          where: {
            user_id: parseInt(user_id),
            date: new Date(date),
            name: mealPreference.name
          }
        });

        if (!meal) {
          console.log(`➕ Creating new meal: ${mealPreference.name} for ${date}`);
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
        } else {
          console.log(`✅ Found existing meal: ${meal.name} (${meal.id})`);
        }
      } else {
        console.log(`⚠️  No meal preference found, creating basic meal`);
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
    } else {
      console.log(`✅ Found existing meal: ${meal.name} (${meal.id})`);
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
      console.log(`🔄 Meal plan already exists: ${existingPlan.id}, updating instead...`);
      // Update the existing meal plan instead of creating a new one
      // First delete existing servings
      const deleteResult = await prisma.foodServing.deleteMany({
        where: {
          mealPlanId: existingPlan.id
        }
      });
      console.log(`🗑️  Deleted ${deleteResult.count} existing servings`);

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
              id: uuidv4(),
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

      console.log(`✅ Updated existing meal plan with ${updatedPlan.servings.length} servings`);
      console.log('=== END CREATE MEAL PLAN (UPDATED) ===\n');
      res.json(updatedPlan);
      return;
    }

    console.log(`➕ Creating new meal plan for meal: ${meal.name}`);
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
            id: uuidv4(),
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

    console.log(`✅ Created new meal plan: ${mealPlan.id} with ${mealPlan.servings.length} servings`);
    console.log('=== END CREATE MEAL PLAN ===\n');
    res.json(mealPlan);
  } catch (error) {
    console.error('❌ Error creating meal plan:', error);
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

    console.log(`=== UPDATE MEAL PLAN ${id} ===`);
    console.log('Request body servings:', JSON.stringify(servings, null, 2));

    // Get the meal plan to find the meal_id
    const mealPlan = await prisma.mealPlan.findUnique({
      where: { id },
      include: {
        servings: {
          include: {
            food: true,
            unit: true
          }
        },
        meal: true
      }
    });

    if (!mealPlan) {
      console.log('❌ Meal plan not found');
      res.status(404).json({ error: 'Meal plan not found' });
      return;
    }

    console.log(`📋 Found meal plan: ${mealPlan.meal?.name || 'Unknown'} (${mealPlan.id})`);
    console.log(`📊 Current servings count: ${mealPlan.servings.length}`);
    console.log('Current servings:', mealPlan.servings.map(s => ({
      id: s.id,
      food: s.food.name,
      quantity: s.quantity,
      unit: s.unit.name
    })));

    // Count existing servings before deletion
    const existingServingsCount = await prisma.foodServing.count({
      where: { mealPlanId: id }
    });
    console.log(`🗑️  About to delete ${existingServingsCount} existing servings`);

    // Delete existing servings
    const deleteResult = await prisma.foodServing.deleteMany({
      where: {
        mealPlanId: id
      }
    });

    console.log(`✅ Deleted ${deleteResult.count} servings`);

    // Verify deletion
    const afterDeleteCount = await prisma.foodServing.count({
      where: { mealPlanId: id }
    });
    console.log(`🔍 After deletion, servings count: ${afterDeleteCount}`);

    console.log(`🔄 Processing ${servings.length} new servings...`);

    // Process servings to ensure serving units exist
    const processedServings = await Promise.all(servings.map(async (serving: any, index: number) => {
      console.log(`  Processing serving ${index + 1}:`, {
        food_id: serving.food_id,
        quantity: serving.quantity,
        unit_name: serving.unit_name
      });

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
          console.log(`    Creating new serving unit: ${unitName} for food ${serving.food_id}`);
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

      console.log(`    Using serving unit: ${servingUnit.name} (${servingUnit.id})`);

      return {
        ...serving,
        unit_id: servingUnit.id
      };
    }));

    console.log(`📝 Processed servings:`, processedServings.map((s, i) => ({
      index: i + 1,
      food_id: s.food_id,
      quantity: s.quantity,
      unit_id: s.unit_id
    })));

    // Create new servings
    console.log(`➕ Creating ${processedServings.length} new servings...`);
    
    let updatedPlan;
    
    if (processedServings.length > 0) {
      // Create new servings only if there are any
      updatedPlan = await prisma.mealPlan.update({
        where: { id },
        data: {
          servings: {
            create: processedServings.map((serving: any) => ({
              id: uuidv4(),
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
    } else {
      // No servings to create, just return the meal plan without any servings
      console.log(`📝 No servings to create, returning empty meal plan`);
      updatedPlan = await prisma.mealPlan.findUnique({
        where: { id },
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
      
      // Optionally, you could delete the meal plan entirely if it has no foods
      // Uncomment the following lines if you want to delete empty meal plans:
      /*
      console.log(`🗑️  Deleting empty meal plan: ${id}`);
      await prisma.mealPlan.delete({
        where: { id }
      });
      console.log(`✅ Deleted empty meal plan: ${id}`);
      */
    }

    console.log(`✅ Successfully updated meal plan`);
    console.log(`📊 Final servings count: ${updatedPlan?.servings?.length || 0}`);
    if (updatedPlan?.servings && updatedPlan.servings.length > 0) {
      console.log('Final servings:', updatedPlan.servings.map(s => ({
        id: s.id,
        food: s.food.name,
        quantity: s.quantity,
        unit: s.unit.name
      })));
    } else {
      console.log('Final servings: None (all foods deleted)');
    }
    console.log('=== END UPDATE MEAL PLAN ===\n');

    if (!updatedPlan) {
      res.status(500).json({ error: 'Failed to update meal plan' });
      return;
    }

    res.json(updatedPlan);
  } catch (error) {
    console.error('❌ Error updating meal plan:', error);
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