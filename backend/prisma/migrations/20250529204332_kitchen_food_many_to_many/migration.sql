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

-- CreateTable
CREATE TABLE "_FoodToKitchen" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FoodToKitchen_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FoodToKitchen_B_index" ON "_FoodToKitchen"("B");

-- AddForeignKey
ALTER TABLE "_FoodToKitchen" ADD CONSTRAINT "_FoodToKitchen_A_fkey" FOREIGN KEY ("A") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodToKitchen" ADD CONSTRAINT "_FoodToKitchen_B_fkey" FOREIGN KEY ("B") REFERENCES "Kitchen"("id") ON DELETE CASCADE ON UPDATE CASCADE;
