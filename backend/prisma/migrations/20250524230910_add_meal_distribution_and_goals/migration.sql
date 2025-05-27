/*
  Warnings:

  - You are about to drop the column `max_value` on the `MealMacroGoal` table. All the data in the column will be lost.
  - You are about to drop the column `min_value` on the `MealMacroGoal` table. All the data in the column will be lost.
  - Added the required column `target_percentage` to the `MealMacroGoal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FoodMacro" DROP CONSTRAINT "FoodMacro_food_id_fkey";

-- DropForeignKey
ALTER TABLE "FoodServing" DROP CONSTRAINT "FoodServing_food_id_fkey";

-- DropForeignKey
ALTER TABLE "FoodServing" DROP CONSTRAINT "FoodServing_meal_id_fkey";

-- DropForeignKey
ALTER TABLE "ServingUnit" DROP CONSTRAINT "ServingUnit_food_id_fkey";

-- DropIndex
DROP INDEX "MealMacroGoal_user_meal_preference_id_idx";

-- DropIndex
DROP INDEX "UserMealPreference_user_id_idx";

-- DropIndex
DROP INDEX "UserMealPreference_user_id_name_key";

-- AlterTable
ALTER TABLE "MealMacroGoal" DROP COLUMN "max_value",
DROP COLUMN "min_value",
ADD COLUMN     "target_percentage" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "UserMealPreference" ADD COLUMN     "distribution_percentage" DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "FoodMacro" ADD CONSTRAINT "FoodMacro_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodServing" ADD CONSTRAINT "FoodServing_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodServing" ADD CONSTRAINT "FoodServing_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServingUnit" ADD CONSTRAINT "ServingUnit_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
