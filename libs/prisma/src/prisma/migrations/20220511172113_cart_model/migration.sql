-- CreateTable
CREATE TABLE "CartModel" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CartModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartOnProduct" (
    "cartId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "CartOnProduct_pkey" PRIMARY KEY ("cartId","productId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CartModel_userId_key" ON "CartModel"("userId");

-- AddForeignKey
ALTER TABLE "CartModel" ADD CONSTRAINT "CartModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartOnProduct" ADD CONSTRAINT "CartOnProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "ProductModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartOnProduct" ADD CONSTRAINT "CartOnProduct_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "CartModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
