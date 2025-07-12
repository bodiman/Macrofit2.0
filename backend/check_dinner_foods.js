const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function checkDinnerFoods() {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    console.log(`Checking dinner foods for user 5 on ${today}...\n`);

    // Find the dinner meal for user 5 today
    const dinnerMeal = await prisma.meal.findFirst({
      where: {
        user_id: 5,
        date: new Date(today),
        name: 'Dinner'
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
                }
              }
            },
            unit: true
          }
        }
      }
    });

    if (!dinnerMeal) {
      console.log('No dinner meal found for user 5 today.');
      return;
    }

    console.log(`Dinner meal found: ${dinnerMeal.name} (ID: ${dinnerMeal.id})`);
    console.log(`Time: ${dinnerMeal.time}`);
    console.log(`Servings count: ${dinnerMeal.servings.length}\n`);

    if (dinnerMeal.servings.length === 0) {
      console.log('No foods logged in dinner yet.');
    } else {
      console.log('Foods in dinner:');
      dinnerMeal.servings.forEach((serving, index) => {
        console.log(`${index + 1}. ${serving.food.name}`);
        console.log(`   Quantity: ${serving.quantity} ${serving.unit.name}`);
        console.log(`   Food ID: ${serving.food.id}`);
        console.log(`   Serving ID: ${serving.id}`);
        
        if (serving.food.macros && serving.food.macros.length > 0) {
          console.log(`   Macros:`);
          serving.food.macros.forEach(macro => {
            console.log(`     ${macro.metric.name}: ${macro.value} ${macro.metric.unit}`);
          });
        }
        console.log('');
      });
    }

    // Also check if there are any meal plans for dinner
    const dinnerMealPlan = await prisma.mealPlan.findFirst({
      where: {
        user_id: 5,
        meal_id: dinnerMeal.id,
        date: new Date(today)
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
                }
              }
            },
            unit: true
          }
        }
      }
    });

    if (dinnerMealPlan) {
      console.log(`\nMeal plan found for dinner:`);
      console.log(`Meal plan ID: ${dinnerMealPlan.id}`);
      console.log(`Planned servings count: ${dinnerMealPlan.servings.length}\n`);

      if (dinnerMealPlan.servings.length > 0) {
        console.log('Planned foods for dinner:');
        dinnerMealPlan.servings.forEach((serving, index) => {
          console.log(`${index + 1}. ${serving.food.name}`);
          console.log(`   Quantity: ${serving.quantity} ${serving.unit.name}`);
          console.log(`   Food ID: ${serving.food.id}`);
          console.log(`   Serving ID: ${serving.id}`);
          console.log('');
        });
      }
    } else {
      console.log('\nNo meal plan found for dinner today.');
    }

  } catch (error) {
    console.error('Error checking dinner foods:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDinnerFoods(); 