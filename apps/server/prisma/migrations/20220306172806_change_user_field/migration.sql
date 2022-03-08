/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `UserModel` table. All the data in the column will be lost.
  - Added the required column `isVendor` to the `UserModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserModel" DROP COLUMN "isAdmin",
ADD COLUMN     "isVendor" BOOLEAN NOT NULL;
