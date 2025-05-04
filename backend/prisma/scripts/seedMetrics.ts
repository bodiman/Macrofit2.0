import prisma from '../../prisma_client';

const defaultMetrics = [
  { name: 'Calories', unit: 'kcal', description: 'Total energy content', id: "calories" },
  { name: 'Protein', unit: 'g', description: 'Protein content', id: "protein" },
  { name: 'Carbohydrates', unit: 'g', description: 'Total carbohydrates', id: "carbohydrates" },
  { name: 'Fat', unit: 'g', description: 'Total fat content', id: "fat" },
  { name: 'Fiber', unit: 'g', description: 'Dietary fiber', id: "fiber" },
  { name: 'Sugar', unit: 'g', description: 'Total sugar content', id: "sugar" },
  { name: 'Sodium', unit: 'mg', description: 'Sodium content', id: "sodium" },
  { name: 'Cholesterol', unit: 'mg', description: 'Cholesterol content', id: "cholesterol" },
  { name: 'Saturated Fat', unit: 'g', description: 'Saturated fat content', id: "saturated_fat" },
  { name: 'Potassium', unit: 'mg', description: 'Potassium content', id: "potassium" },
];

const defaultPreferences = {
  Calories: { min: 1500, max: 2500 },
  Protein: { min: 120, max: 200 },
  Carbohydrates: { min: 100, max: 300 },
  Fat: { min: 10, max: 75 },
  Fiber: { min: 25, max: 40 },
  Sugar: { min: 0, max: 50 },
  Sodium: { min: 0, max: 2300 },
  Cholesterol: { min: 0, max: 300 },
  'Saturated Fat': { min: 0, max: 20 },
};

async function main() {
  // Create default metrics if they don't exist
  for (const metric of defaultMetrics) {
    await prisma.nutritionalMetric.upsert({
      where: { name: metric.name },
      update: {},
      create: metric,
    });
  }
}

main()
.catch((e) => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
}); 