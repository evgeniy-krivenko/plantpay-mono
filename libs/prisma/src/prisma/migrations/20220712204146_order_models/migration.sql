-- CreateEnum
CREATE TYPE "UserOrderStatus" AS ENUM ('PAID', 'UNPAID', 'CANCELED');

-- CreateEnum
CREATE TYPE "VendorOrderStatus" AS ENUM ('CREATED', 'PREPARATION', 'SHIPPED', 'RECIEVED', 'RETURNED');

-- CreateTable
CREATE TABLE "UserOrderModel" (
    "id" TEXT NOT NULL,
    "status" "UserOrderStatus" NOT NULL DEFAULT E'UNPAID',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "addressId" TEXT NOT NULL,

    CONSTRAINT "UserOrderModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorOrderModel" (
    "id" TEXT NOT NULL,
    "status" "VendorOrderStatus" NOT NULL DEFAULT E'CREATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "addressId" TEXT NOT NULL,
    "userOrderId" TEXT NOT NULL,

    CONSTRAINT "VendorOrderModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItemModel" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vendorOrderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "price" DECIMAL(9,2) NOT NULL,

    CONSTRAINT "OrderItemModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserOrderModel_userId_key" ON "UserOrderModel"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VendorOrderModel_userId_key" ON "VendorOrderModel"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderItemModel_productId_key" ON "OrderItemModel"("productId");

-- AddForeignKey
ALTER TABLE "UserOrderModel" ADD CONSTRAINT "UserOrderModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrderModel" ADD CONSTRAINT "UserOrderModel_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "AddressModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorOrderModel" ADD CONSTRAINT "VendorOrderModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorOrderModel" ADD CONSTRAINT "VendorOrderModel_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "AddressModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorOrderModel" ADD CONSTRAINT "VendorOrderModel_userOrderId_fkey" FOREIGN KEY ("userOrderId") REFERENCES "UserOrderModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItemModel" ADD CONSTRAINT "OrderItemModel_productId_fkey" FOREIGN KEY ("productId") REFERENCES "ProductModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItemModel" ADD CONSTRAINT "OrderItemModel_vendorOrderId_fkey" FOREIGN KEY ("vendorOrderId") REFERENCES "VendorOrderModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
