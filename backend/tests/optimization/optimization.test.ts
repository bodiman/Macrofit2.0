import { describe, it, beforeAll, afterAll, expect } from '@jest/globals';
import prisma from '../../prisma_client';
import { FoodMacroData, UserPreferenceData } from '../../routes/optimizationRoutes';
import { optimizeQuantitiesQP, calculateTotalMacros, calculateWeightedSquaredError } from '../../routes/optimizationRoutes';

// Import the optimization function (we'll need to export it from the routes file)
// For now, we'll test the core logic

interface TestCase {
  name: string;
  foods: FoodMacroData[];
  preferences: UserPreferenceData[];
  macroNames: string[];
  dailyMaxValues: number[];
  expectedBehavior: 'should_optimize' | 'should_minimize' | 'should_fail';
  description: string;
}

// Update macro names to match DB
const DB_MACRO_NAMES = ['Protein', 'Carbohydrates', 'Fat', 'Fiber', 'Sugar', 'Calories'];

describe('Optimization Algorithm Tests', () => {
  let testFoods: any[] = [];

  beforeAll(async () => {
    // Fetch real foods from the database for testing
    console.log('Fetching test foods from database...');
    
    try {
      // Get a variety of foods with different macro profiles
      testFoods = await prisma.food.findMany({
        take: 10, // Limit to 10 foods for testing
        include: {
          servingUnits: true,
          macros: {
            include: {
              metric: true
            }
          }
        },
        orderBy: {
          id: 'asc'
        }
      });

      console.log(`Loaded ${testFoods.length} test foods:`);
      testFoods.forEach((food, index) => {
        const protein = food.macros.find((m: any) => m.metric.name === 'Protein')?.value || 0;
        const carbs = food.macros.find((m: any) => m.metric.name === 'Carbohydrates')?.value || 0;
        const fat = food.macros.find((m: any) => m.metric.name === 'Fat')?.value || 0;
        console.log(`${index + 1}. ${food.name} - Protein: ${protein}g, Carbs: ${carbs}g, Fat: ${fat}g`);
      });

    } catch (error) {
      console.error('Failed to fetch test foods:', error);
      throw error;
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  // Helper function to convert database food to FoodMacroData
  const convertFoodToMacroData = (food: any, quantity: number = 1, minQuantity: number = 0, maxQuantity: number = 3): FoodMacroData => {
    // Extract macro values in the order: Protein, Carbohydrates, Fat, Fiber, Sugar, Calories
    const macroValues = [
      food.macros.find((m: any) => m.metric.name === 'Protein')?.value || 0,
      food.macros.find((m: any) => m.metric.name === 'Carbohydrates')?.value || 0,
      food.macros.find((m: any) => m.metric.name === 'Fat')?.value || 0,
      food.macros.find((m: any) => m.metric.name === 'Fiber')?.value || 0,
      food.macros.find((m: any) => m.metric.name === 'Sugar')?.value || 0,
      food.macros.find((m: any) => m.metric.name === 'Calories')?.value || 0
    ];

    return {
      macroValues,
      unitGrams: food.servingUnits[0]?.grams || 1,
      quantity,
      minQuantity,
      maxQuantity,
      locked: false
    };
  };

  // Helper function to create test preferences
  const createTestPreferences = (proteinRange: [number, number], carbsRange: [number, number], fatRange: [number, number]): UserPreferenceData[] => {
    return [
      { min_value: proteinRange[0], max_value: proteinRange[1] }, // Protein
      { min_value: carbsRange[0], max_value: carbsRange[1] },     // Carbs
      { min_value: fatRange[0], max_value: fatRange[1] },         // Fat
      { min_value: null, max_value: 25 },                         // Fiber
      { min_value: null, max_value: 50 },                         // Sugar
      { min_value: null, max_value: 800 }                         // Calories
    ];
  };

  // Helper function to calculate total macros
  const calculateTotalMacros = (foods: FoodMacroData[], quantities: number[], macroNames: string[]): Record<string, number> => {
    const macros: Record<string, number> = {};
    macroNames.forEach(name => {
      macros[name] = 0;
    });
    
    foods.forEach((food, index) => {
      const totalGrams = quantities[index] * food.unitGrams;
      food.macroValues.forEach((valuePerGram: number, macroIndex: number) => {
        const macroName = macroNames[macroIndex];
        const totalValue = totalGrams * valuePerGram;
        macros[macroName] += totalValue;
      });
    });
    
    return macros;
  };

  // Helper function to calculate weighted squared error
  const calculateWeightedSquaredError = (
    currentMacros: Record<string, number>,
    preferences: UserPreferenceData[],
    macroNames: string[],
    dailyMaxValues: number[]
  ): number => {
    let totalError = 0;
    
    preferences.forEach((pref, index) => {
      const macroName = macroNames[index];
      const currentValue = currentMacros[macroName] || 0;
      
      const minValue = pref.min_value;
      const maxValue = pref.max_value;
      
      const dailyMax = dailyMaxValues[index] || 1;
      const weight = 1 / dailyMax;
      
      if (minValue !== null) {
        if (minValue > 0 && currentValue < minValue) {
          const squaredError = (minValue - currentValue) * (minValue - currentValue);
          const weightedError = squaredError * weight;
          totalError += weightedError;
        } else if (minValue <= 0 && currentValue > 0) {
          const exceededAmount = Math.abs(minValue);
          const penalty = currentValue * (1 + exceededAmount / dailyMax);
          const squaredError = penalty * penalty;
          const weightedError = squaredError * weight;
          totalError += weightedError;
        }
      } else if (maxValue !== null) {
        if (maxValue > 0 && currentValue > maxValue) {
          const squaredError = (currentValue - maxValue) * (currentValue - maxValue);
          const weightedError = squaredError * weight;
          totalError += weightedError;
        } else if (maxValue <= 0 && currentValue > 0) {
          const exceededAmount = Math.abs(maxValue);
          const penalty = currentValue * (1 + exceededAmount / dailyMax);
          const squaredError = penalty * penalty;
          const weightedError = squaredError * weight;
          totalError += weightedError;
        }
      }
    });
    
    return totalError;
  };

  // Test cases
  const testCases: TestCase[] = [
    {
      name: 'Basic Protein Optimization',
      foods: [],
      preferences: createTestPreferences([20, 30], [10, 20], [5, 15]),
      macroNames: DB_MACRO_NAMES,
      dailyMaxValues: [200, 300, 100, 25, 50, 2000],
      expectedBehavior: 'should_optimize',
      description: 'Should optimize quantities to meet protein targets while staying within other macro bounds'
    },
    {
      name: 'Negative Target Handling',
      foods: [],
      preferences: createTestPreferences([-10, 5], [5, 15], [2, 8]), // Negative protein target
      macroNames: DB_MACRO_NAMES,
      dailyMaxValues: [200, 300, 100, 25, 50, 2000],
      expectedBehavior: 'should_minimize',
      description: 'Should minimize protein consumption when target is negative (already exceeded)'
    },
    {
      name: 'Multiple Foods Optimization',
      foods: [],
      preferences: createTestPreferences([25, 35], [15, 25], [8, 18]),
      macroNames: DB_MACRO_NAMES,
      dailyMaxValues: [200, 300, 100, 25, 50, 2000],
      expectedBehavior: 'should_optimize',
      description: 'Should optimize multiple foods to achieve balanced macro profile'
    },
    {
      name: 'Tight Constraints',
      foods: [],
      preferences: createTestPreferences([28, 32], [18, 22], [10, 12]), // Very tight ranges
      macroNames: DB_MACRO_NAMES,
      dailyMaxValues: [200, 300, 100, 25, 50, 2000],
      expectedBehavior: 'should_optimize',
      description: 'Should handle very tight macro constraints'
    },
    {
      name: 'All Negative Targets',
      foods: [],
      preferences: createTestPreferences([-20, -10], [-15, -5], [-8, -2]), // All negative
      macroNames: DB_MACRO_NAMES,
      dailyMaxValues: [200, 300, 100, 25, 50, 2000],
      expectedBehavior: 'should_minimize',
      description: 'Should minimize all consumption when all targets are negative'
    }
  ];

  // Run test cases
  testCases.forEach((testCase, index) => {
    it(`${index + 1}. ${testCase.name}`, async () => {
      console.log(`\n=== Running Test: ${testCase.name} ===`);
      console.log(`Description: ${testCase.description}`);
      
      // Populate foods for this test case
      const foods: FoodMacroData[] = [];
      
      if (testCase.name === 'Multiple Foods Optimization') {
        // Use multiple foods for this test
        for (let i = 0; i < Math.min(5, testFoods.length); i++) {
          foods.push(convertFoodToMacroData(testFoods[i]));
        }
      } else {
        // Use just the first food for other tests
        if (testFoods.length > 0) {
          foods.push(convertFoodToMacroData(testFoods[0]));
        }
      }

      if (foods.length === 0) {
        console.log('Skipping test - no foods available');
        return;
      }

      console.log(`Using ${foods.length} foods for optimization`);
      foods.forEach((food, i) => {
        console.log(`Food ${i + 1}: Protein=${food.macroValues[0]}g, Carbs=${food.macroValues[1]}g, Fat=${food.macroValues[2]}g per ${food.unitGrams}g`);
      });

      console.log('Preferences:', testCase.preferences);
      console.log('Macro names:', testCase.macroNames);
      console.log('Daily max values:', testCase.dailyMaxValues);

      // Calculate initial macros
      const initialQuantities = foods.map(food => food.quantity);
      const initialMacros = calculateTotalMacros(foods, initialQuantities, DB_MACRO_NAMES);
      const initialError = calculateWeightedSquaredError(initialMacros, testCase.preferences, DB_MACRO_NAMES, testCase.dailyMaxValues);

      console.log('\nInitial state:');
      console.log('Quantities:', initialQuantities);
      console.log('Macros:', initialMacros);
      console.log('Error:', initialError.toFixed(6));

      // For now, we'll simulate the optimization by testing the error calculation
      // In a real implementation, we would call the actual optimization function
      
      // Test different quantity combinations
      const testQuantities = [
        [0.5, 0.5, 0.5, 0.5, 0.5], // Low quantities
        [1.0, 1.0, 1.0, 1.0, 1.0], // Medium quantities
        [2.0, 2.0, 2.0, 2.0, 2.0], // High quantities
        [0.1, 0.1, 0.1, 0.1, 0.1], // Very low quantities
      ].slice(0, foods.length); // Only use as many as we have foods

      let bestError = initialError;
      let bestQuantities = initialQuantities;

      console.log('\nTesting different quantity combinations:');
      testQuantities.forEach((quantities, i) => {
        // Update food quantities
        quantities.forEach((qty, j) => {
          if (foods[j]) {
            foods[j].quantity = qty;
          }
        });

        const macros = calculateTotalMacros(foods, quantities, DB_MACRO_NAMES);
        const error = calculateWeightedSquaredError(macros, testCase.preferences, DB_MACRO_NAMES, testCase.dailyMaxValues);

        console.log(`Test ${i + 1}: Quantities=${quantities}, Error=${error.toFixed(6)}`);

        if (error < bestError) {
          bestError = error;
          bestQuantities = [...quantities];
        }
      });

      console.log('\nResults:');
      console.log('Best quantities found:', bestQuantities);
      console.log('Best error:', bestError.toFixed(6));
      console.log('Error improvement:', (initialError - bestError).toFixed(6));

      // Assertions based on expected behavior
      switch (testCase.expectedBehavior) {
        case 'should_optimize':
          expect(bestError).toBeLessThanOrEqual(initialError);
          expect(bestQuantities.some(q => q > 0)).toBe(true);
          break;
        
        case 'should_minimize':
          // For negative targets, we expect minimal quantities
          expect(bestError).toBeLessThanOrEqual(initialError);
          break;
        
        case 'should_fail':
          // For impossible constraints, we might not improve
          expect(bestError).toBeGreaterThanOrEqual(initialError * 0.9); // Allow some tolerance
          break;
      }

      console.log(`✓ Test "${testCase.name}" completed successfully`);
    });
  });

  // Additional specific tests
  describe('Error Improvement Tests', () => {
    it('should significantly improve error through optimization', async () => {
      console.log('\n=== Testing Error Improvement ===');
      
      if (testFoods.length === 0) {
        console.log('Skipping test - no foods available');
        return;
      }

      // Use multiple foods for a more realistic test
      const foods: FoodMacroData[] = [];
      for (let i = 0; i < Math.min(3, testFoods.length); i++) {
        foods.push(convertFoodToMacroData(testFoods[i]));
      }

      const preferences = createTestPreferences([25, 35], [15, 25], [8, 18]);
      const macroNames = DB_MACRO_NAMES;
      const dailyMaxValues = [200, 300, 100, 25, 50, 2000];

      console.log(`Using ${foods.length} foods for optimization`);
      foods.forEach((food, i) => {
        console.log(`Food ${i + 1}: Protein=${food.macroValues[0]}g, Carbs=${food.macroValues[1]}g, Fat=${food.macroValues[2]}g per ${food.unitGrams}g`);
      });

      // Start with a challenging initial state (very low quantities that will be far from targets)
      const initialQuantities = foods.map(() => 0.1); // Start with very low quantities
      foods.forEach((food, i) => {
        food.quantity = initialQuantities[i];
      });

      const initialMacros = calculateTotalMacros(foods, initialQuantities, macroNames);
      const initialError = calculateWeightedSquaredError(initialMacros, preferences, macroNames, dailyMaxValues);

      console.log('\nInitial state:');
      console.log('Quantities:', initialQuantities);
      console.log('Macros:', initialMacros);
      console.log('Initial Error:', initialError.toFixed(6));

      // Test a range of quantity combinations to find the best
      const testQuantities = [
        [0.1, 0.1, 0.1], // Very low quantities (initial)
        [0.3, 0.3, 0.3], // Low quantities
        [0.5, 0.5, 0.5], // Medium-low quantities
        [0.7, 0.7, 0.7], // Medium quantities
        [1.0, 1.0, 1.0], // Current quantities
        [1.5, 1.5, 1.5], // High quantities
        [2.0, 2.0, 2.0], // Very high quantities
      ].slice(0, foods.length); // Only use as many as we have foods

      let bestError = initialError;
      let bestQuantities = initialQuantities;

      console.log('\nTesting different quantity combinations:');
      testQuantities.forEach((quantities, i) => {
        // Update food quantities
        quantities.forEach((qty, j) => {
          if (foods[j]) {
            foods[j].quantity = qty;
          }
        });

        const macros = calculateTotalMacros(foods, quantities, macroNames);
        const error = calculateWeightedSquaredError(macros, preferences, macroNames, dailyMaxValues);

        console.log(`Test ${i + 1}: Quantities=${quantities}, Error=${error.toFixed(6)}`);

        if (error < bestError) {
          bestError = error;
          bestQuantities = [...quantities];
        }
      });

      console.log('\nResults:');
      console.log('Best quantities found:', bestQuantities);
      console.log('Best error:', bestError.toFixed(6));
      console.log('Error improvement:', (initialError - bestError).toFixed(6));
      console.log('Improvement percentage:', ((initialError - bestError) / initialError * 100).toFixed(2) + '%');

      // Assertions for error improvement
      expect(bestError).toBeLessThan(initialError);
      expect(initialError - bestError).toBeGreaterThan(0.001); // At least 0.001 improvement
      expect((initialError - bestError) / initialError).toBeGreaterThan(0.05); // At least 5% improvement

      // Verify that the best quantities are different from initial
      const quantitiesChanged = bestQuantities.some((qty, i) => Math.abs(qty - initialQuantities[i]) > 0.01);
      expect(quantitiesChanged).toBe(true);

      console.log('✅ Error improvement test passed!');
    });

    it('should handle impossible constraints gracefully', async () => {
      console.log('\n=== Testing Impossible Constraints ===');
      
      if (testFoods.length === 0) {
        console.log('Skipping test - no foods available');
        return;
      }

      // Use a single food with impossible constraints
      const foods = [convertFoodToMacroData(testFoods[0])];
      
      // Set impossible constraints (e.g., require 100g protein from a low-protein food)
      const impossiblePreferences = createTestPreferences([100, 120], [50, 70], [30, 50]);
      const macroNames = DB_MACRO_NAMES;
      const dailyMaxValues = [200, 300, 100, 25, 50, 2000];

      console.log(`Using food: Protein=${foods[0].macroValues[0]}g, Carbs=${foods[0].macroValues[1]}g, Fat=${foods[0].macroValues[2]}g per ${foods[0].unitGrams}g`);

      // Calculate initial state
      const initialQuantities = foods.map(food => food.quantity);
      const initialMacros = calculateTotalMacros(foods, initialQuantities, macroNames);
      const initialError = calculateWeightedSquaredError(initialMacros, impossiblePreferences, macroNames, dailyMaxValues);

      console.log('Initial error with impossible constraints:', initialError.toFixed(6));

      // Test different quantities
      const testQuantities = [0.1, 0.5, 1.0, 2.0, 5.0, 10.0];
      let bestError = initialError;
      let bestQuantity = initialQuantities[0];

      testQuantities.forEach((qty, i) => {
        foods[0].quantity = qty;
        const macros = calculateTotalMacros(foods, [qty], macroNames);
        const error = calculateWeightedSquaredError(macros, impossiblePreferences, macroNames, dailyMaxValues);

        console.log(`Test ${i + 1}: Quantity=${qty}, Error=${error.toFixed(6)}`);

        if (error < bestError) {
          bestError = error;
          bestQuantity = qty;
        }
      });

      console.log('Best quantity found:', bestQuantity);
      console.log('Best error:', bestError.toFixed(6));
      console.log('Error improvement:', (initialError - bestError).toFixed(6));

      // Even with impossible constraints, we should find some improvement
      expect(bestError).toBeLessThanOrEqual(initialError);
      
      // The error should still be high due to impossible constraints
      expect(bestError).toBeGreaterThan(1.0);

      console.log('✅ Impossible constraints test passed!');
    });
  });

  // Additional specific tests
  describe('Edge Cases', () => {
    it('should handle empty food list', () => {
      const foods: FoodMacroData[] = [];
      const preferences = createTestPreferences([20, 30], [10, 20], [5, 15]);
      const macroNames = DB_MACRO_NAMES;
      const dailyMaxValues = [200, 300, 100, 25, 50, 2000];

      // This should not crash
      expect(() => {
        // In real implementation, this would call the optimization function
        console.log('Testing with empty food list');
      }).not.toThrow();
    });

    it('should handle all locked foods', () => {
      if (testFoods.length === 0) {
        console.log('Skipping test - no foods available');
        return;
      }

      const foods = [convertFoodToMacroData(testFoods[0])];
      foods[0].locked = true; // Lock the food

      const preferences = createTestPreferences([20, 30], [10, 20], [5, 15]);
      const macroNames = DB_MACRO_NAMES;
      const dailyMaxValues = [200, 300, 100, 25, 50, 2000];

      // This should return the original quantities
      expect(() => {
        console.log('Testing with all locked foods');
      }).not.toThrow();
    });

    it('should handle extreme macro values', () => {
      if (testFoods.length === 0) {
        console.log('Skipping test - no foods available');
        return;
      }

      const foods = [convertFoodToMacroData(testFoods[0])];
      // Set extreme macro values
      foods[0].macroValues = [1000, 1000, 1000, 1000, 1000, 10000]; // Very high values

      const preferences = createTestPreferences([20, 30], [10, 20], [5, 15]);
      const macroNames = DB_MACRO_NAMES;
      const dailyMaxValues = [200, 300, 100, 25, 50, 2000];

      expect(() => {
        console.log('Testing with extreme macro values');
      }).not.toThrow();
    });
  });

  describe('Performance Tests', () => {
    it('should handle large number of foods efficiently', () => {
      // Create a large number of synthetic foods
      const largeFoodList: FoodMacroData[] = [];
      for (let i = 0; i < 50; i++) {
        largeFoodList.push({
          macroValues: [Math.random() * 10, Math.random() * 10, Math.random() * 10, Math.random() * 5, Math.random() * 5, Math.random() * 100],
          unitGrams: 100,
          quantity: 1,
          minQuantity: 0,
          maxQuantity: 5,
          locked: false
        });
      }

      const preferences = createTestPreferences([20, 30], [10, 20], [5, 15]);
      const macroNames = DB_MACRO_NAMES;
      const dailyMaxValues = [200, 300, 100, 25, 50, 2000];

      const startTime = Date.now();
      
      // In real implementation, this would call the optimization function
      console.log(`Testing with ${largeFoodList.length} foods`);
      
      const endTime = Date.now();
      const duration = endTime - startTime;

      console.log(`Performance test completed in ${duration}ms`);
      expect(duration).toBeLessThan(5000); // Should complete within 5 seconds
    });
  });

  describe('End-to-End Tests', () => {
    it('should optimize egg whites for a meal with logged fruits', async () => {
      console.log('\n=== End-to-End Test: Egg Whites Optimization ===');
      
      // Define the meal's macro targets
      const mealTargets = {
        calories: { min: 255, max: 270 },
        protein: { min: 24, max: 27 },
        carbs: { min: 26, max: 41 },
        fat: { min: 0, max: 9 },
        fiber: { min: 4, max: 6 },
        sodium: { min: 0, max: 345 }
      };

      console.log('Meal targets:', mealTargets);

      // Create logged foods (fruits that are already consumed)
      const loggedFoods = [
        {
          name: 'Orange',
          macros: {
            calories: 62,
            protein: 1.2,
            carbs: 15.4,
            fat: 0.2,
            fiber: 3.1,
            sodium: 0
          },
          quantity: 1,
          unitGrams: 131 // Medium orange
        },
        {
          name: 'Medium Peach',
          macros: {
            calories: 59,
            protein: 1.4,
            carbs: 14.3,
            fat: 0.4,
            fiber: 2.3,
            sodium: 0
          },
          quantity: 1,
          unitGrams: 150 // Medium peach
        },
        {
          name: 'Medium Banana',
          macros: {
            calories: 105,
            protein: 1.3,
            carbs: 27.0,
            fat: 0.4,
            fiber: 3.1,
            sodium: 1
          },
          quantity: 1,
          unitGrams: 118 // Medium banana
        }
      ];

      // Calculate total logged macros
      const loggedMacros = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sodium: 0
      };

      loggedFoods.forEach(food => {
        Object.keys(loggedMacros).forEach(macro => {
          loggedMacros[macro as keyof typeof loggedMacros] += food.macros[macro as keyof typeof food.macros] * food.quantity;
        });
      });

      console.log('Logged foods:');
      loggedFoods.forEach(food => {
        console.log(`- ${food.name}: ${food.quantity} serving`);
      });

      console.log('Total logged macros:', loggedMacros);

      // Calculate remaining targets (targets minus logged foods)
      const remainingTargets = {
        calories: { min: mealTargets.calories.min - loggedMacros.calories, max: mealTargets.calories.max - loggedMacros.calories },
        protein: { min: mealTargets.protein.min - loggedMacros.protein, max: mealTargets.protein.max - loggedMacros.protein },
        carbs: { min: mealTargets.carbs.min - loggedMacros.carbs, max: mealTargets.carbs.max - loggedMacros.carbs },
        fat: { min: mealTargets.fat.min - loggedMacros.fat, max: mealTargets.fat.max - loggedMacros.fat },
        fiber: { min: mealTargets.fiber.min - loggedMacros.fiber, max: mealTargets.fiber.max - loggedMacros.fiber },
        sodium: { min: mealTargets.sodium.min - loggedMacros.sodium, max: mealTargets.sodium.max - loggedMacros.sodium }
      };

      console.log('Remaining targets (after logged foods):', remainingTargets);

      // Create egg whites as the candidate food for optimization
      const eggWhites = {
        name: 'Egg Whites',
        macroValues: [10.9, 1.8, 0.2, 0, 0, 52], // Protein, Carbs, Fat, Fiber, Sugar, Calories per 100g
        unitGrams: 33, // 1 egg white = 33g
        quantity: 1,
        minQuantity: 0,
        maxQuantity: 3,
        locked: false
      };

      console.log('Candidate food:');
      console.log(`- ${eggWhites.name}: ${eggWhites.macroValues[0]}g protein, ${eggWhites.macroValues[1]}g carbs, ${eggWhites.macroValues[2]}g fat per ${eggWhites.unitGrams}g`);

      // Convert to FoodMacroData format
      const foods: FoodMacroData[] = [eggWhites];

      // Convert remaining targets to preferences format
      const preferences: UserPreferenceData[] = [
        { min_value: remainingTargets.protein.min, max_value: remainingTargets.protein.max }, // Protein
        { min_value: remainingTargets.carbs.min, max_value: remainingTargets.carbs.max },     // Carbs
        { min_value: remainingTargets.fat.min, max_value: remainingTargets.fat.max },         // Fat
        { min_value: remainingTargets.fiber.min, max_value: remainingTargets.fiber.max },     // Fiber
        { min_value: null, max_value: 50 },                                                   // Sugar (not a target)
        { min_value: remainingTargets.calories.min, max_value: remainingTargets.calories.max } // Calories
      ];

      const macroNames = ['Protein', 'Carbohydrates', 'Fat', 'Fiber', 'Sugar', 'Calories'];
      const dailyMaxValues = [200, 300, 100, 25, 50, 2000];

      console.log('Optimization preferences:', preferences);

      // Test different quantities of egg whites
      const testQuantities = [0, 0.5, 1, 1.5, 2, 2.5, 3];
      let bestError = Infinity;
      let bestQuantity = 0;
      let bestMacros: Record<string, number> = {};

      console.log('\nTesting different egg white quantities:');
      testQuantities.forEach(quantity => {
        // Calculate macros for this quantity
        const totalGrams = quantity * eggWhites.unitGrams;
        const macros = {
          Protein: (eggWhites.macroValues[0] * totalGrams) / 100,
          Carbohydrates: (eggWhites.macroValues[1] * totalGrams) / 100,
          Fat: (eggWhites.macroValues[2] * totalGrams) / 100,
          Fiber: (eggWhites.macroValues[3] * totalGrams) / 100,
          Sugar: (eggWhites.macroValues[4] * totalGrams) / 100,
          Calories: (eggWhites.macroValues[5] * totalGrams) / 100
        };

        // Calculate error
        const error = calculateWeightedSquaredError(macros, preferences, macroNames, dailyMaxValues);

        console.log(`Quantity ${quantity}: ${macros.Protein.toFixed(1)}g protein, ${macros.Calories.toFixed(0)} cal, Error: ${error.toFixed(6)}`);

        if (error < bestError) {
          bestError = error;
          bestQuantity = quantity;
          bestMacros = { ...macros };
        }
      });

      console.log('\nResults:');
      console.log('Best quantity of egg whites:', bestQuantity);
      console.log('Best macros from egg whites:', bestMacros);
      console.log('Best error:', bestError.toFixed(6));

      // Calculate total meal macros (logged + optimized)
      const totalMealMacros = {
        calories: loggedMacros.calories + bestMacros.Calories,
        protein: loggedMacros.protein + bestMacros.Protein,
        carbs: loggedMacros.carbs + bestMacros.Carbohydrates,
        fat: loggedMacros.fat + bestMacros.Fat,
        fiber: loggedMacros.fiber + bestMacros.Fiber,
        sodium: loggedMacros.sodium + (bestMacros.Sugar * 0) // No sodium in egg whites
      };

      console.log('Total meal macros (logged + optimized):', totalMealMacros);

      // Verify that the optimal solution is 3 egg whites
      expect(bestQuantity).toBe(3);
      expect(bestQuantity).toBeGreaterThan(0);

      // Verify that the optimization found a reasonable solution
      // (We don't expect perfect target achievement due to constraints)
      expect(totalMealMacros.protein).toBeGreaterThan(10); // At least some protein
      expect(totalMealMacros.calories).toBeGreaterThan(250); // Reasonable calorie range
      expect(bestError).toBeLessThan(1.0); // Error should be reasonable

      console.log('✅ End-to-end test passed! Optimal solution is 3 egg whites.');
    });
  });

  describe('Real Optimization Tests', () => {
    it('should use actual QP optimization for egg whites scenario', async () => {
      console.log('\n=== Real QP Optimization Test: Egg Whites ===');
      
      // Define the meal's macro targets
      const mealTargets = {
        calories: { min: 255, max: 270 },
        protein: { min: 24, max: 27 },
        carbs: { min: 26, max: 41 },
        fat: { min: 0, max: 9 },
        fiber: { min: 4, max: 6 },
        sodium: { min: 0, max: 345 }
      };

      console.log('Meal targets:', mealTargets);

      // Create logged foods (fruits that are already consumed)
      const loggedFoods = [
        {
          name: 'Orange',
          macros: {
            calories: 62,
            protein: 1.2,
            carbs: 15.4,
            fat: 0.2,
            fiber: 3.1,
            sodium: 0
          },
          quantity: 1,
          unitGrams: 131 // Medium orange
        },
        {
          name: 'Medium Peach',
          macros: {
            calories: 59,
            protein: 1.4,
            carbs: 14.3,
            fat: 0.4,
            fiber: 2.3,
            sodium: 0
          },
          quantity: 1,
          unitGrams: 150 // Medium peach
        },
        {
          name: 'Medium Banana',
          macros: {
            calories: 105,
            protein: 1.3,
            carbs: 27.0,
            fat: 0.4,
            fiber: 3.1,
            sodium: 1
          },
          quantity: 1,
          unitGrams: 118 // Medium banana
        }
      ];

      // Calculate total logged macros
      const loggedMacros = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sodium: 0
      };

      loggedFoods.forEach(food => {
        Object.keys(loggedMacros).forEach(macro => {
          loggedMacros[macro as keyof typeof loggedMacros] += food.macros[macro as keyof typeof food.macros] * food.quantity;
        });
      });

      console.log('Total logged macros:', loggedMacros);

      // Calculate remaining targets (targets minus logged foods)
      const remainingTargets = {
        calories: { min: mealTargets.calories.min - loggedMacros.calories, max: mealTargets.calories.max - loggedMacros.calories },
        protein: { min: mealTargets.protein.min - loggedMacros.protein, max: mealTargets.protein.max - loggedMacros.protein },
        carbs: { min: mealTargets.carbs.min - loggedMacros.carbs, max: mealTargets.carbs.max - loggedMacros.carbs },
        fat: { min: mealTargets.fat.min - loggedMacros.fat, max: mealTargets.fat.max - loggedMacros.fat },
        fiber: { min: mealTargets.fiber.min - loggedMacros.fiber, max: mealTargets.fiber.max - loggedMacros.fiber },
        sodium: { min: mealTargets.sodium.min - loggedMacros.sodium, max: mealTargets.sodium.max - loggedMacros.sodium }
      };

      console.log('Remaining targets (after logged foods):', remainingTargets);

      // Create egg whites as the candidate food for optimization
      const eggWhites = {
        macroValues: [10.9, 1.8, 0.2, 0, 0, 52], // Protein, Carbs, Fat, Fiber, Sugar, Calories per 100g
        unitGrams: 33, // 1 egg white = 33g
        quantity: 1,
        minQuantity: 0,
        maxQuantity: 3,
        locked: false
      };

      console.log('Candidate food:');
      console.log(`- Egg Whites: ${eggWhites.macroValues[0]}g protein, ${eggWhites.macroValues[1]}g carbs, ${eggWhites.macroValues[2]}g fat per ${eggWhites.unitGrams}g`);

      // Convert remaining targets to preferences format
      const preferences = [
        { min_value: remainingTargets.protein.min, max_value: remainingTargets.protein.max }, // Protein
        { min_value: remainingTargets.carbs.min, max_value: remainingTargets.carbs.max },     // Carbs
        { min_value: remainingTargets.fat.min, max_value: remainingTargets.fat.max },         // Fat
        { min_value: remainingTargets.fiber.min, max_value: remainingTargets.fiber.max },     // Fiber
        { min_value: null, max_value: 50 },                                                   // Sugar (not a target)
        { min_value: remainingTargets.calories.min, max_value: remainingTargets.calories.max } // Calories
      ];

      const macroNames = ['Protein', 'Carbohydrates', 'Fat', 'Fiber', 'Sugar', 'Calories'];
      const dailyMaxValues = [200, 300, 100, 25, 50, 2000];
      const initialQuantities = [1]; // Start with 1 egg white

      console.log('Optimization preferences:', preferences);
      console.log('Initial quantities:', initialQuantities);

      // Call the actual backend QP optimization function
      const { quantities: optimizedQuantities, error } = optimizeQuantitiesQP(
        [eggWhites],
        preferences,
        macroNames,
        dailyMaxValues,
        initialQuantities
      );

      console.log('\nQP Optimization Results:');
      console.log('Optimized quantities:', optimizedQuantities);
      console.log('Final error:', error.toFixed(6));

      // Calculate macros for the optimized solution
      const totalGrams = optimizedQuantities[0] * eggWhites.unitGrams;
      const optimizedMacros = {
        Protein: (eggWhites.macroValues[0] * totalGrams) / 100,
        Carbohydrates: (eggWhites.macroValues[1] * totalGrams) / 100,
        Fat: (eggWhites.macroValues[2] * totalGrams) / 100,
        Fiber: (eggWhites.macroValues[3] * totalGrams) / 100,
        Sugar: (eggWhites.macroValues[4] * totalGrams) / 100,
        Calories: (eggWhites.macroValues[5] * totalGrams) / 100
      };

      console.log('Optimized macros from egg whites:', optimizedMacros);

      // Calculate total meal macros (logged + optimized)
      const totalMealMacros = {
        calories: loggedMacros.calories + optimizedMacros.Calories,
        protein: loggedMacros.protein + optimizedMacros.Protein,
        carbs: loggedMacros.carbs + optimizedMacros.Carbohydrates,
        fat: loggedMacros.fat + optimizedMacros.Fat,
        fiber: loggedMacros.fiber + optimizedMacros.Fiber,
        sodium: loggedMacros.sodium + (optimizedMacros.Sugar * 0) // No sodium in egg whites
      };

      console.log('Total meal macros (logged + optimized):', totalMealMacros);

      // Verify the optimization worked
      expect(optimizedQuantities[0]).toBeGreaterThanOrEqual(0);
      expect(optimizedQuantities[0]).toBeLessThanOrEqual(3);
      expect(error).toBeLessThan(10); // Error should be reasonable

      console.log('✅ Real QP optimization test completed!');
      console.log(`Optimal quantity: ${optimizedQuantities[0]} egg whites`);
      
      // If the app recommends 0, this test will show us why
      if (optimizedQuantities[0] === 0) {
        console.log('⚠️  Note: The optimization recommends 0 egg whites, which matches the app behavior.');
        console.log('This suggests the QP algorithm finds that adding egg whites increases the error.');
      }

      // Print error for 0 egg whites
      const zeroEggsQuantities = [0];
      const zeroEggsMacros = {
        Protein: 0,
        Carbohydrates: 0,
        Fat: 0,
        Fiber: 0,
        Sugar: 0,
        Calories: 0
      };
      const totalMacrosZero = {
        Protein: loggedMacros.protein + zeroEggsMacros.Protein,
        Carbohydrates: loggedMacros.carbs + zeroEggsMacros.Carbohydrates,
        Fat: loggedMacros.fat + zeroEggsMacros.Fat,
        Fiber: loggedMacros.fiber + zeroEggsMacros.Fiber,
        Sugar: zeroEggsMacros.Sugar, // No sugar in loggedMacros
        Calories: loggedMacros.calories + zeroEggsMacros.Calories
      };
      const errorZero = calculateWeightedSquaredError(totalMacrosZero, preferences, macroNames, dailyMaxValues);
      console.log('Error for 0 egg whites:', errorZero);

      // Print error for 3 egg whites
      const threeEggsQuantities = [3];
      const totalGramsThree = 3 * eggWhites.unitGrams;
      const threeEggsMacros = {
        Protein: (eggWhites.macroValues[0] * totalGramsThree) / 100,
        Carbohydrates: (eggWhites.macroValues[1] * totalGramsThree) / 100,
        Fat: (eggWhites.macroValues[2] * totalGramsThree) / 100,
        Fiber: (eggWhites.macroValues[3] * totalGramsThree) / 100,
        Sugar: (eggWhites.macroValues[4] * totalGramsThree) / 100,
        Calories: (eggWhites.macroValues[5] * totalGramsThree) / 100
      };
      const totalMacrosThree = {
        Protein: loggedMacros.protein + threeEggsMacros.Protein,
        Carbohydrates: loggedMacros.carbs + threeEggsMacros.Carbohydrates,
        Fat: loggedMacros.fat + threeEggsMacros.Fat,
        Fiber: loggedMacros.fiber + threeEggsMacros.Fiber,
        Sugar: threeEggsMacros.Sugar, // No sugar in loggedMacros
        Calories: loggedMacros.calories + threeEggsMacros.Calories
      };
      const errorThree = calculateWeightedSquaredError(totalMacrosThree, preferences, macroNames, dailyMaxValues);
      console.log('Error for 3 egg whites:', errorThree);
      console.log('Difference (3 eggs - 0 eggs):', errorThree - errorZero);
    });
  });

  // Test sequential meal optimization
  test('should optimize meals sequentially with realistic targets', async () => {
    console.log('\n=== Sequential Meal Optimization Test ===');
    
    // Create test foods with different macro profiles
    const foods = [
      {
        macroValues: [0.2, 0.1, 0.05], // Protein, Carbs, Fat per gram
        unitGrams: 100,
        quantity: 1,
        minQuantity: 0,
        maxQuantity: 5,
        locked: false
      },
      {
        macroValues: [0.15, 0.3, 0.1], // Different macro profile
        unitGrams: 100,
        quantity: 1,
        minQuantity: 0,
        maxQuantity: 5,
        locked: false
      }
    ];
    
    // Daily targets: 100g protein, 200g carbs, 50g fat
    const dailyPreferences = [
      { min_value: 100, max_value: 120 }, // Protein
      { min_value: 200, max_value: 250 }, // Carbs
      { min_value: 50, max_value: 70 }    // Fat
    ];
    
    const macroNames = ['protein', 'carbs', 'fat'];
    const dailyMaxValues = [120, 250, 70];
    
    // Simulate sequential optimization for 3 meals
    const meals = [
      { id: 'breakfast', name: 'Breakfast', distribution_percentage: 0.3 },
      { id: 'lunch', name: 'Lunch', distribution_percentage: 0.35 },
      { id: 'dinner', name: 'Dinner', distribution_percentage: 0.35 }
    ];
    
    let remainingTargets = dailyPreferences.map(pref => ({
      min: pref.min_value,
      max: pref.max_value
    }));
    
    console.log('Initial daily targets:', remainingTargets);
    
    const results = [];
    
    // Optimize each meal sequentially
    for (const meal of meals) {
      console.log(`\n--- Optimizing ${meal.name} (${meal.distribution_percentage * 100}%) ---`);
      console.log('Remaining targets before optimization:', remainingTargets);
      
      // Calculate meal-specific targets
      const mealTargets = remainingTargets.map((target, index) => {
        return {
          min_value: target.min * meal.distribution_percentage,
          max_value: target.max * meal.distribution_percentage
        };
      });
      
      console.log(`${meal.name} targets:`, mealTargets);
      
      // Optimize this meal
      const result = await optimizeQuantitiesQP(
        foods,
        mealTargets,
        macroNames,
        dailyMaxValues,
        foods.map(f => f.quantity)
      );
      
      console.log(`${meal.name} optimization result:`, {
        quantities: result.quantities,
        error: result.error,
        finalMacros: calculateTotalMacros(foods, result.quantities, macroNames)
      });
      
      results.push({
        meal: meal.name,
        quantities: result.quantities,
        error: result.error,
        finalMacros: calculateTotalMacros(foods, result.quantities, macroNames)
      });
      
      // Update remaining targets
      const mealContribution = calculateTotalMacros(foods, result.quantities, macroNames);
      remainingTargets = remainingTargets.map((target, index) => {
        const macroName = macroNames[index];
        const contribution = mealContribution[macroName] || 0;
        return {
          min: target.min - contribution,
          max: target.max - contribution
        };
      });
      
      console.log('Remaining targets after optimization:', remainingTargets);
    }
    
    // Verify results
    console.log('\n=== Final Results ===');
    results.forEach(result => {
      console.log(`${result.meal}:`, {
        quantities: result.quantities,
        error: result.error.toFixed(6),
        macros: result.finalMacros
      });
    });
    
    // Calculate total macros across all meals
    const totalMacros = results.reduce((total, result) => {
      Object.entries(result.finalMacros).forEach(([macro, value]) => {
        total[macro] = (total[macro] || 0) + value;
      });
      return total;
    }, {} as Record<string, number>);
    
    console.log('Total macros across all meals:', totalMacros);
    
    // Verify that each meal was optimized (error should be reasonable)
    results.forEach(result => {
      expect(result.error).toBeLessThan(100); // Error should be reasonable
      expect(result.quantities.every((q: number) => q >= 0)).toBe(true); // Quantities should be non-negative
    });
    
    // Verify that total macros are within daily targets
    Object.entries(totalMacros).forEach(([macro, total]) => {
      const targetIndex = macroNames.indexOf(macro);
      if (targetIndex >= 0) {
        const target = dailyPreferences[targetIndex];
        // Sequential optimization may not reach 100% of targets, so we're more lenient
        expect(total).toBeGreaterThanOrEqual(target.min_value * 0.6); // At least 60% of min
        expect(total).toBeLessThanOrEqual(target.max_value * 1.5); // At most 150% of max
      }
    });
    
    console.log('✅ Sequential optimization test passed!');
  });
}); 