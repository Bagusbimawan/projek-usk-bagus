/*
  Warnings:

  - Changed the type of `Nis` on the `absensi` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "absensi" DROP COLUMN "Nis",
ADD COLUMN     "Nis" INTEGER NOT NULL;
