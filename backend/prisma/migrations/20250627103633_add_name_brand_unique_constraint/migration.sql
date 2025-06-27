/*
  Warnings:

  - A unique constraint covering the columns `[name,brand]` on the table `Food` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Food_name_brand_key" ON "Food"("name", "brand");
