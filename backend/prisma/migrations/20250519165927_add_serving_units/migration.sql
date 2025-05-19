/*
  Warnings:

  - You are about to drop the column `unit` on the `FoodServing` table. All the data in the column will be lost.
  - Added the required column `unit_id` to the `FoodServing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodServing" DROP COLUMN "unit",
ADD COLUMN     "unit_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "FoodServing" ADD CONSTRAINT "FoodServing_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "ServingUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
