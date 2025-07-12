-- AlterTable
ALTER TABLE "FoodServing" ADD COLUMN     "mealPlanId" TEXT;

-- CreateTable
CREATE TABLE "MealPlan" (
    "id" TEXT NOT NULL,
    "meal_id" TEXT NOT NULL,
    "userUser_id" INTEGER,

    CONSTRAINT "MealPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FoodServing" ADD CONSTRAINT "FoodServing_mealPlanId_fkey" FOREIGN KEY ("mealPlanId") REFERENCES "MealPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPlan" ADD CONSTRAINT "MealPlan_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPlan" ADD CONSTRAINT "MealPlan_userUser_id_fkey" FOREIGN KEY ("userUser_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
