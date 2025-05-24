-- DropForeignKey
ALTER TABLE "FoodMacro" DROP CONSTRAINT "FoodMacro_food_id_fkey";

-- DropForeignKey
ALTER TABLE "FoodServing" DROP CONSTRAINT "FoodServing_food_id_fkey";

-- DropForeignKey
ALTER TABLE "FoodServing" DROP CONSTRAINT "FoodServing_meal_id_fkey";

-- DropForeignKey
ALTER TABLE "ServingUnit" DROP CONSTRAINT "ServingUnit_food_id_fkey";

-- AddForeignKey
ALTER TABLE "FoodMacro" ADD CONSTRAINT "FoodMacro_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodServing" ADD CONSTRAINT "FoodServing_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodServing" ADD CONSTRAINT "FoodServing_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServingUnit" ADD CONSTRAINT "ServingUnit_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;
