/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Students` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "cpf" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Students_cpf_key" ON "Students"("cpf");
