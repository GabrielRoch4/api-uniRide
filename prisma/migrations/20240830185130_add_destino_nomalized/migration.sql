/*
  Warnings:

  - Added the required column `DestinoNormalized` to the `rides` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rides" ADD COLUMN     "DestinoNormalized" TEXT NOT NULL;
