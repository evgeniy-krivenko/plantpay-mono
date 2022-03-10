/*
  Warnings:

  - Changed the type of `value` on the `RoleModel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('ADMIN', 'BYIER', 'VENDOR', 'MODERATOR');

-- DropIndex
DROP INDEX "RoleModel_value_key";

-- AlterTable
ALTER TABLE "RoleModel" DROP COLUMN "value",
ADD COLUMN     "value" "RoleType" NOT NULL;
