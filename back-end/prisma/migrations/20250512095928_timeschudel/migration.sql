/*
  Warnings:

  - You are about to drop the column `endTime` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "endTime",
DROP COLUMN "startTime";

-- CreateTable
CREATE TABLE "TimeSchedule" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "vendorId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,

    CONSTRAINT "TimeSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PCToTimeSchedule" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PCToTimeSchedule_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PCToTimeSchedule_B_index" ON "_PCToTimeSchedule"("B");

-- AddForeignKey
ALTER TABLE "TimeSchedule" ADD CONSTRAINT "TimeSchedule_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSchedule" ADD CONSTRAINT "TimeSchedule_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PCToTimeSchedule" ADD CONSTRAINT "_PCToTimeSchedule_A_fkey" FOREIGN KEY ("A") REFERENCES "PC"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PCToTimeSchedule" ADD CONSTRAINT "_PCToTimeSchedule_B_fkey" FOREIGN KEY ("B") REFERENCES "TimeSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
