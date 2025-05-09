/*
  Warnings:

  - Added the required column `serving_size` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "serving_size" DOUBLE PRECISION NOT NULL;
