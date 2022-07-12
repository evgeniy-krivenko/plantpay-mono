-- CreateTable
CREATE TABLE "AddressModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AddressModel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AddressModel" ADD CONSTRAINT "AddressModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
