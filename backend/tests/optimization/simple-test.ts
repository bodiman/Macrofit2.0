import { describe, it, expect } from '@jest/globals';
import prisma from '../../prisma_client';

describe('Simple Database Test', () => {
  it('should connect to database and fetch foods', async () => {
    console.log('Testing database connection...');
    
    try {
      // Test database connection
      await prisma.$connect();
      console.log('✅ Database connected successfully');
      
      // Fetch a few foods to test the connection
      const foods = await prisma.food.findMany({
        take: 3,
        include: {
          servingUnits: true,
          macros: {
            include: {
              metric: true
            }
          }
        }
      });
      
      console.log(`✅ Fetched ${foods.length} foods from database`);
      
      if (foods.length > 0) {
        const food = foods[0];
        console.log(`Sample food: ${food.name}`);
        console.log(`Macros: ${food.macros.length} macro entries`);
        food.macros.forEach(macro => {
          console.log(`  ${macro.metric.name}: ${macro.value}${macro.metric.unit}`);
        });
        console.log(`Serving units: ${food.servingUnits.length} units available`);
      }
      
      expect(foods).toBeDefined();
      expect(Array.isArray(foods)).toBe(true);
      
    } catch (error) {
      console.error('❌ Database test failed:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
      console.log('✅ Database disconnected');
    }
  });

  it('should have foods with macro data', async () => {
    console.log('Testing food macro data...');
    
    try {
      await prisma.$connect();
      
      const foodsWithMacros = await prisma.food.findMany({
        where: {
          macros: {
            some: {} // Has at least one macro entry
          }
        },
        take: 5,
        include: {
          macros: {
            include: {
              metric: true
            }
          }
        }
      });
      
      console.log(`Found ${foodsWithMacros.length} foods with macro data`);
      
      foodsWithMacros.forEach((food, index) => {
        const protein = food.macros.find(m => m.metric.name === 'protein')?.value || 0;
        const carbs = food.macros.find(m => m.metric.name === 'carbs')?.value || 0;
        const fat = food.macros.find(m => m.metric.name === 'fat')?.value || 0;
        console.log(`${index + 1}. ${food.name}: P=${protein}g, C=${carbs}g, F=${fat}g`);
      });
      
      expect(foodsWithMacros.length).toBeGreaterThan(0);
      
    } catch (error) {
      console.error('❌ Macro data test failed:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  });
}); 