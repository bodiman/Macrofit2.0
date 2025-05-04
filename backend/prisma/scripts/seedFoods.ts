import prisma from '../../prisma_client';

async function main() {
  // Example food items
  const foods = [
    {
      id: "chicken-breast",
      name: "Chicken Breast",
      description: "Lean white meat",
      macros: {
        calories: 165,
        protein: 31,
        carbohydrates: 0,
        fat: 3.6,
        fiber: 0,
        sodium: 74,
        potassium: 256,
      },
    },
    {
      id: "brown-rice",
      name: "Brown Rice",
      description: "Whole grain rice",
      macros: {
        calories: 216,
        protein: 4.5,
        carbohydrates: 45,
        fat: 1.8,
        fiber: 3.5,
        sodium: 10,
        potassium: 84,
      },
    },
    {
      id: "broccoli",
      name: "Broccoli",
      description: "Green cruciferous vegetable",
      macros: {
        calories: 55,
        protein: 3.7,
        carbohydrates: 11,
        fat: 0.6,
        fiber: 2.6,
        sodium: 33,
        potassium: 316,
      },
    },
  ];

  for (const food of foods) {
    await prisma.food.upsert({
      where: { id: food.id },
      update: {},
      create: {
        id: food.id,
        name: food.name,
        description: food.description,
        macros: {
          create: Object.entries(food.macros).map(([metric_id, value]) => ({
            metric_id,
            value,
          })),
        },
      },
    });
  }

  console.log("🌱 Seed complete");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
