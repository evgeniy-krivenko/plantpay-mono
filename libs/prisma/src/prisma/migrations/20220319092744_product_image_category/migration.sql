-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'MODERATION', 'WAITING', 'PUBLISHED', 'ORDERED', 'SOLD', 'ARCHIVED');

-- CreateTable
CREATE TABLE "ProductModel" (
    "id" TEXT NOT NULL,
    "name" CHAR(40) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ProductStatus" NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "price" DECIMAL(9,2) NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryModel" (
    "id" SERIAL NOT NULL,
    "name" CHAR(20) NOT NULL,
    "icon" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "CategoryModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageModel" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ImageModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductModel_slug_key" ON "ProductModel"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryModel_name_key" ON "CategoryModel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryModel_slug_key" ON "CategoryModel"("slug");

-- AddForeignKey
ALTER TABLE "ProductModel" ADD CONSTRAINT "ProductModel_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductModel" ADD CONSTRAINT "ProductModel_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
