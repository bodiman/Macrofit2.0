/*
  Warnings:

  - You are about to drop the column `status` on the `FoodServing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FoodServing" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "NutritionalMetric" ADD COLUMN     "description" TEXT;

-- DropEnum
DROP TYPE "LogStatus";
