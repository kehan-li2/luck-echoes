/*
  Warnings:

  - Added the required column `bday` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "bday" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "placeBorn" TEXT,
ALTER COLUMN "name" SET NOT NULL;
