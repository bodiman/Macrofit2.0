import prisma from '../../prisma_client';
import nutritionixTable from '../../utils/Nutritionix/nutritionix_table';

const specificMetrics = [
  { name: 'Calories', unit: '', description: 'Total energy content', id: "calories" },
  { name: 'Protein', unit: 'g', description: 'Protein content', id: "protein" },
  { name: 'Carbohydrates', unit: 'g', description: 'Total carbohydrates', id: "carbohydrates" },
  { name: 'Fat', unit: 'g', description: 'Total fat content', id: "fat" },
  { name: 'Fiber', unit: 'g', description: 'Dietary fiber', id: "fiber" },
  { name: 'Sugar', unit: 'g', description: 'Total sugar content', id: "sugar" },
  { name: 'Sodium', unit: 'mg', description: 'Sodium content', id: "sodium" },
  { name: 'Cholesterol', unit: 'mg', description: 'Cholesterol content', id: "cholesterol" },
  { name: 'Saturated Fat', unit: 'g', description: 'Saturated fat content', id: "saturated_fat" },
  { name: 'Potassium', unit: 'mg', description: 'Potassium content', id: "potassium" },
  { name: 'Vitamin A', unit: 'iu', description: 'Vitamin A content', id: "vitamin_a" },
  { name: 'Vitamin C', unit: 'mg', description: 'Vitamin C content', id: "vitamin_c" },
  { name: 'Calcium', unit: 'mg', description: 'Calcium content', id: "calcium" },
  { name: 'Iron', unit: 'mg', description: 'Iron content', id: "iron" },
  { name: 'Water', unit: 'g', description: 'Water content', id: "water" },
  { name: 'Vitamin D', unit: 'iu', description: 'Vitamin D content', id: "vitamin_d" },
  { name: 'Trans Fat', unit: 'g', description: 'Trans fat content', id: "trans_fat" },
];

const specificMetricIds = specificMetrics.map((metric) => metric.id);

type TableEntry = {
  attr_id: number,
  '2018 NFP': number,
  name: string,
  unit: string,
  id: string,
}

const defaultMetrics = nutritionixTable.map((metric) => {
  const metricEntry = metric as TableEntry;
  return {
    name: metricEntry.name,
    unit: metricEntry.unit,
    description: "",
    id: metricEntry.id,
  }
}).filter((metric) => {
  // filter out speficifMetrics
  return !specificMetricIds.includes(metric.id);
});

const allMetrics = [...specificMetrics, ...defaultMetrics];
// const allMetrics = specificMetrics;

async function main() {
  // Create default metrics if they don't exist
  for (const metric of allMetrics) {
    console.log("seeding metric", metric.id);
    try {
      await prisma.nutritionalMetric.upsert({
        where: { name: metric.name },
        update: {},
        create: metric,
      });
    } catch (error) {
      console.log("error seeding metric", metric.id);
      // console.error(`Error creating metric ${metric.name}:`, error);
    }
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