/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `RoleModel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RoleModel_value_key" ON "RoleModel"("value");
