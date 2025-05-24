/*
  Warnings:

  - You are about to drop the column `display_order` on the `UserMealPreference` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserMealPreference_user_id_display_order_key";

-- AlterTable
ALTER TABLE "UserMealPreference" DROP COLUMN "display_order";
