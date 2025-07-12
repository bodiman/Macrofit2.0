const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function checkMealPlans() {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    console.log(`Checking meal plans for user 5 on ${today}...\n`);

    // Find all meal plans for user 5 today
    const mealPlans = await prisma.mealPlan.findMany({
      where: {
        user_id: 5,
        date: new Date(today)
      },
      include: {
        meal: true,
        servings: {
          include: {
            food: true,
            unit: true
          }
        }
      }
    });

    console.log(`Found ${mealPlans.length} meal plans:\n`);

    mealPlans.forEach((plan, index) => {
      console.log(`Meal Plan ${index + 1}:`);
      console.log(`  Plan ID: ${plan.id}`);
      console.log(`  Meal ID: ${plan.meal_id}`);
      console.log(`  Meal Name: ${plan.meal?.name}`);
      console.log(`  Servings count: ${plan.servings.length}`);
      console.log(`  Servings:`);
      
      plan.servings.forEach((serving, servingIndex) => {
        console.log(`    ${servingIndex + 1}. ${serving.food.name} - ${serving.quantity} ${serving.unit.name}`);
      });
      console.log('');
    });

    // Also check the actual meals
    console.log('Actual meals for today:');
    const meals = await prisma.meal.findMany({
      where: {
        user_id: 5,
        date: new Date(today)
      }
    });

    meals.forEach((meal, index) => {
      console.log(`  ${index + 1}. ${meal.name} - ID: ${meal.id}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkMealPlans(); 