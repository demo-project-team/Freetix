/*
  Warnings:

  - You are about to drop the column `notes` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `serviceScheduleId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the `ServiceSchedule` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `endTime` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_serviceScheduleId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceSchedule" DROP CONSTRAINT "ServiceSchedule_pcId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "notes",
DROP COLUMN "paymentStatus",
DROP COLUMN "serviceScheduleId",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "paymentId" TEXT,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "ServiceSchedule";

-- CreateTable
CREATE TABLE "_BookingPC" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BookingPC_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BookingPC_B_index" ON "_BookingPC"("B");

-- AddForeignKey
ALTER TABLE "_BookingPC" ADD CONSTRAINT "_BookingPC_A_fkey" FOREIGN KEY ("A") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookingPC" ADD CONSTRAINT "_BookingPC_B_fkey" FOREIGN KEY ("B") REFERENCES "PC"("id") ON DELETE CASCADE ON UPDATE CASCADE;
