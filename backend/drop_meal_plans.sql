-- Drop FoodServing records that belong to MealPlans
DELETE FROM "FoodServing" WHERE "mealPlanId" IS NOT NULL;

-- Drop the foreign key constraint
ALTER TABLE "FoodServing" DROP CONSTRAINT IF EXISTS "FoodServing_mealPlanId_fkey";

-- Drop MealPlan table
DROP TABLE IF EXISTS "MealPlan"; 