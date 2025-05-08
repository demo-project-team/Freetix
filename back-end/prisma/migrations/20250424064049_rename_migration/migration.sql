/*
  Warnings:

  - You are about to drop the column `vendorId` on the `Organization` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[OrganizationId]` on the table `Vendor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `OrganizationId` to the `Vendor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_vendorId_fkey";

-- DropIndex
DROP INDEX "Organization_vendorId_key";

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "vendorId";

-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "OrganizationId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_OrganizationId_key" ON "Vendor"("OrganizationId");

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_OrganizationId_fkey" FOREIGN KEY ("OrganizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
