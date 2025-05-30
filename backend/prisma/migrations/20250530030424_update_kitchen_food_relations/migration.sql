/*
  Warnings:

  - You are about to drop the `_KitchenToFood` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_KitchenToFood" DROP CONSTRAINT "_KitchenToFood_A_fkey";

-- DropForeignKey
ALTER TABLE "_KitchenToFood" DROP CONSTRAINT "_KitchenToFood_B_fkey";

-- DropTable
DROP TABLE "_KitchenToFood";
