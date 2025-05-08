/*
  Warnings:

  - You are about to drop the column `OrganizationId` on the `Vendor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[OrganizationRegister]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vendorId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `vendorId` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vendor" DROP CONSTRAINT "Vendor_OrganizationId_fkey";

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "vendorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "OrganizationId";

-- CreateIndex
CREATE UNIQUE INDEX "Organization_OrganizationRegister_key" ON "Organization"("OrganizationRegister");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_vendorId_key" ON "Organization"("vendorId");

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
