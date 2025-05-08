/*
  Warnings:

  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pcId` to the `ServiceSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceSchedule" DROP CONSTRAINT "ServiceSchedule_serviceId_fkey";

-- AlterTable
ALTER TABLE "ServiceSchedule" ADD COLUMN     "pcId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Service";

-- AddForeignKey
ALTER TABLE "ServiceSchedule" ADD CONSTRAINT "ServiceSchedule_pcId_fkey" FOREIGN KEY ("pcId") REFERENCES "PC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
