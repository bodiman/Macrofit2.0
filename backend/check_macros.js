const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function checkMacros() {
  try {
    await prisma.$connect();
    
    // Get all nutritional metrics
    const metrics = await prisma.nutritionalMetric.findMany({
      orderBy: { name: 'asc' }
    });
    
    console.log('Available nutritional metrics:');
    metrics.forEach(metric => {
      console.log(`- ${metric.name} (${metric.unit})`);
    });
    
    // Get a sample food with its macros
    const sampleFood = await prisma.food.findFirst({
      include: {
        macros: {
          include: {
            metric: true
          }
        }
      }
    });
    
    if (sampleFood) {
      console.log(`\nSample food: ${sampleFood.name}`);
      console.log('Macros:');
      sampleFood.macros.forEach(macro => {
        console.log(`  ${macro.metric.name}: ${macro.value}${macro.metric.unit}`);
      });
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkMacros(); 