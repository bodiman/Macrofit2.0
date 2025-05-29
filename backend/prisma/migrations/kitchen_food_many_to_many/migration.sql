-- CreateTable
CREATE TABLE "_KitchenToFood" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_KitchenToFood_AB_unique" ON "_KitchenToFood"("A", "B");

-- CreateIndex
CREATE INDEX "_KitchenToFood_B_index" ON "_KitchenToFood"("B");

-- First, create the many-to-many relationships based on existing kitchen_id
INSERT INTO "_KitchenToFood" ("A", "B")
SELECT DISTINCT "kitchen_id", "id"
FROM "Food"
WHERE "kitchen_id" IS NOT NULL;

-- AddForeignKey
ALTER TABLE "_KitchenToFood" ADD CONSTRAINT "_KitchenToFood_A_fkey" FOREIGN KEY ("A") REFERENCES "Kitchen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KitchenToFood" ADD CONSTRAINT "_KitchenToFood_B_fkey" FOREIGN KEY ("B") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Now we can safely remove the kitchen_id column
ALTER TABLE "Food" DROP COLUMN "kitchen_id"; 