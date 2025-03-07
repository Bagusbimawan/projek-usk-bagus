/*
  Warnings:

  - Added the required column `Nis` to the `absensi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "absensi" ADD COLUMN     "Nis" TEXT NOT NULL;
