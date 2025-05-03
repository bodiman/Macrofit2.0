/*
  Warnings:

  - The primary key for the `NutritionalMetric` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "UserPreference" DROP CONSTRAINT "UserPreference_metric_id_fkey";

-- AlterTable
ALTER TABLE "NutritionalMetric" DROP CONSTRAINT "NutritionalMetric_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "NutritionalMetric_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "NutritionalMetric_id_seq";

-- AlterTable
ALTER TABLE "UserPreference" ALTER COLUMN "metric_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_metric_id_fkey" FOREIGN KEY ("metric_id") REFERENCES "NutritionalMetric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
