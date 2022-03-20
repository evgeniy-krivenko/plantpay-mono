/*
  Warnings:

  - Added the required column `productId` to the `ImageModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImageModel" ADD COLUMN     "productId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ImageModel" ADD CONSTRAINT "ImageModel_productId_fkey" FOREIGN KEY ("productId") REFERENCES "ProductModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
