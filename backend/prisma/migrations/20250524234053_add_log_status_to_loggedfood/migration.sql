/*
  Warnings:

  - You are about to drop the `NutritionalMetric` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "LogStatus" AS ENUM ('PLANNED', 'LOGGED');

-- DropForeignKey
ALTER TABLE "FoodMacro" DROP CONSTRAINT "FoodMacro_metric_id_fkey";

-- DropForeignKey
ALTER TABLE "MealMacroGoal" DROP CONSTRAINT "MealMacroGoal_metric_id_fkey";

-- DropForeignKey
ALTER TABLE "UserPreference" DROP CONSTRAINT "UserPreference_metric_id_fkey";

-- DropTable
DROP TABLE "NutritionalMetric";

-- CreateTable
CREATE TABLE "nutritional_metrics" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "nutritional_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoggedFood" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "meal_name" TEXT NOT NULL,
    "food_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand_name" TEXT,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit_id" TEXT NOT NULL,
    "unit_name" TEXT NOT NULL,
    "unit_grams" DOUBLE PRECISION NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "carbohydrates" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "logged_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "LogStatus" NOT NULL DEFAULT 'LOGGED',

    CONSTRAINT "LoggedFood_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nutritional_metrics_name_key" ON "nutritional_metrics"("name");

-- CreateIndex
CREATE INDEX "LoggedFood_user_id_logged_at_idx" ON "LoggedFood"("user_id", "logged_at");

-- AddForeignKey
ALTER TABLE "FoodMacro" ADD CONSTRAINT "FoodMacro_metric_id_fkey" FOREIGN KEY ("metric_id") REFERENCES "nutritional_metrics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_metric_id_fkey" FOREIGN KEY ("metric_id") REFERENCES "nutritional_metrics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealMacroGoal" ADD CONSTRAINT "MealMacroGoal_metric_id_fkey" FOREIGN KEY ("metric_id") REFERENCES "nutritional_metrics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoggedFood" ADD CONSTRAINT "LoggedFood_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
