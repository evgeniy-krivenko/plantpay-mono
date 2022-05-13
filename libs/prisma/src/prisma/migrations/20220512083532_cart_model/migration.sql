-- DropForeignKey
ALTER TABLE "CartModel" DROP CONSTRAINT "CartModel_userId_fkey";

-- AlterTable
ALTER TABLE "CartModel" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CartModel" ADD CONSTRAINT "CartModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
