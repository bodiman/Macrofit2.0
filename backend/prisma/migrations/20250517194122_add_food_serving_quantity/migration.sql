/*
  Warnings:

  - A unique constraint covering the columns `[user_id,date,time]` on the table `Meal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,date,name]` on the table `Meal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quantity` to the `FoodServing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodServing" ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "time" TIME NOT NULL,
ALTER COLUMN "date" SET DATA TYPE DATE;

-- CreateIndex
CREATE UNIQUE INDEX "Meal_user_id_date_time_key" ON "Meal"("user_id", "date", "time");

-- CreateIndex
CREATE UNIQUE INDEX "Meal_user_id_date_name_key" ON "Meal"("user_id", "date", "name");
