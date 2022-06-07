/*
  Warnings:

  - Made the column `cpf` on table `Students` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Students" ALTER COLUMN "cpf" SET NOT NULL;
