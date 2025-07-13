import { describe, it, expect } from '@jest/globals';
import prisma from '../../prisma_client';

const MACRO_NAMES = ['Protein', 'Carbohydrates', 'Fat', 'Fiber', 'Sugar', 'Calories'];

describe('Print Macro Values for Foods', () => {
  it('should fetch foods and print their macro values', async () => {
    await prisma.$connect();
    const foods = await prisma.food.findMany({
      take: 10,
      include: {
        macros: {
          include: { metric: true }
        },
        servingUnits: true
      }
    });

    foods.forEach((food, idx) => {
      const macroMap: Record<string, number> = {};
      MACRO_NAMES.forEach(macroName => {
        macroMap[macroName] = food.macros.find((m: any) => m.metric.name === macroName)?.value || 0;
      });
      const serving = food.servingUnits[0];
      const servingInfo = serving ? `${serving.grams}g ${serving.name}` : 'No serving unit';
      console.log(`\n${idx + 1}. ${food.name} [${servingInfo}]`);
      MACRO_NAMES.forEach(macroName => {
        console.log(`   ${macroName}: ${macroMap[macroName]}`);
      });
    });

    expect(foods.length).toBeGreaterThan(0);
    await prisma.$disconnect();
  });
}); 