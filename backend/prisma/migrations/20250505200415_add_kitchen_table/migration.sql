/*
  Warnings:

  - A unique constraint covering the columns `[name,kitchen_id]` on the table `Food` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kitchen_id` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Food_name_key";

-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "kitchen_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Kitchen" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Kitchen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kitchen_name_key" ON "Kitchen"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Food_name_kitchen_id_key" ON "Food"("name", "kitchen_id");

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_kitchen_id_fkey" FOREIGN KEY ("kitchen_id") REFERENCES "Kitchen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
