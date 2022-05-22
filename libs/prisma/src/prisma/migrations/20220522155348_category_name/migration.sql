-- AlterTable
ALTER TABLE "CategoryModel" ADD COLUMN     "bucket" TEXT,
ADD COLUMN     "mime" TEXT,
ALTER COLUMN "icon" DROP NOT NULL;
