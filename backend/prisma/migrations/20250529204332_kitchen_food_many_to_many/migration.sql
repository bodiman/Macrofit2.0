/*
  Warnings:

  - You are about to drop the `_KitchenToFood` table. If the table is not empty, all the data it contains will be lost.

*/

-- CreateTable
CREATE TABLE "KitchenFood" (
    "id" TEXT NOT NULL,
    "kitchen_id" TEXT NOT NULL,
    "food_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "KitchenFood_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KitchenFood_kitchen_id_food_id_key" ON "KitchenFood"("kitchen_id", "food_id");

-- Migrate existing relationships if the old table exists
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = '_FoodToKitchen') THEN
        INSERT INTO "KitchenFood" ("id", "kitchen_id", "food_id", "active")
        SELECT 
            gen_random_uuid()::text,
            "B",
            "A",
            false
        FROM "_FoodToKitchen";
    END IF;
END $$;

-- AddForeignKey
ALTER TABLE "KitchenFood" ADD CONSTRAINT "KitchenFood_kitchen_id_fkey" FOREIGN KEY ("kitchen_id") REFERENCES "Kitchen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KitchenFood" ADD CONSTRAINT "KitchenFood_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Drop the old implicit join table if it exists
DROP TABLE IF EXISTS "_FoodToKitchen";
