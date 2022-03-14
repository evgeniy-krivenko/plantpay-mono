-- CreateTable
CREATE TABLE "RoleModel" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR(15) NOT NULL,
    "description" VARCHAR(140) NOT NULL,

    CONSTRAINT "RoleModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnRoles" (
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "UsersOnRoles_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoleModel_value_key" ON "RoleModel"("value");

-- AddForeignKey
ALTER TABLE "UsersOnRoles" ADD CONSTRAINT "UsersOnRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnRoles" ADD CONSTRAINT "UsersOnRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "RoleModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
