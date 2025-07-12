// Web Worker for parallel macro calculations
const macroWorker = `
  importScripts('https://unpkg.com/comlink@4.4.1/dist/umd/comlink.js');

  // Macro calculation function
  function calculateAdjustedMacros(foodServing, userPreferences) {
    const { unit, quantity, food } = foodServing;
    const gramsInPortion = quantity * unit.grams;
    const totalMacros = {};

    if (userPreferences && userPreferences.length > 0) {
      const preferenceMetricIds = new Set(userPreferences.map(pref => pref.metric_id));
      
      for (const [key, value] of Object.entries(food.macros)) {
        if (preferenceMetricIds.has(key)) {
          totalMacros[key] = Math.round(value * gramsInPortion);
        }
      }
    } else {
      for (const [key, value] of Object.entries(food.macros)) {
        totalMacros[key] = Math.round(value * gramsInPortion);
      }
    }
    
    return totalMacros;
  }

  // Batch calculate macros for all meals
  function calculateAllMacros(meals, userPreferences) {
    const totalMacros = {};
    
    meals.forEach(meal => {
      meal.servings.forEach(foodServing => {
        const adjustedMacros = calculateAdjustedMacros(foodServing, userPreferences);
        Object.entries(adjustedMacros).forEach(([key, value]) => {
          if (value) {
            totalMacros[key] = (totalMacros[key] || 0) + value;
          }
        });
      });
    });
    
    return totalMacros;
  }

  // Expose functions to main thread
  Comlink.expose({
    calculateAdjustedMacros,
    calculateAllMacros
  });
`;

export default macroWorker; 