/*
  Warnings:

  - You are about to drop the `nutritional_metrics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FoodMacro" DROP CONSTRAINT "FoodMacro_metric_id_fkey";

-- DropForeignKey
ALTER TABLE "MealMacroGoal" DROP CONSTRAINT "MealMacroGoal_metric_id_fkey";

-- DropForeignKey
ALTER TABLE "UserPreference" DROP CONSTRAINT "UserPreference_metric_id_fkey";

-- DropTable
DROP TABLE "nutritional_metrics";

-- CreateTable
CREATE TABLE "NutritionalMetric" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "NutritionalMetric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NutritionalMetric_name_key" ON "NutritionalMetric"("name");

-- AddForeignKey
ALTER TABLE "FoodMacro" ADD CONSTRAINT "FoodMacro_metric_id_fkey" FOREIGN KEY ("metric_id") REFERENCES "NutritionalMetric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_metric_id_fkey" FOREIGN KEY ("metric_id") REFERENCES "NutritionalMetric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealMacroGoal" ADD CONSTRAINT "MealMacroGoal_metric_id_fkey" FOREIGN KEY ("metric_id") REFERENCES "NutritionalMetric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
