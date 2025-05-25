/*
  Warnings:

  - You are about to drop the `LoggedFood` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LoggedFood" DROP CONSTRAINT "LoggedFood_user_id_fkey";

-- AlterTable
ALTER TABLE "FoodServing" ADD COLUMN     "status" "LogStatus" NOT NULL DEFAULT 'LOGGED';

-- DropTable
DROP TABLE "LoggedFood";
