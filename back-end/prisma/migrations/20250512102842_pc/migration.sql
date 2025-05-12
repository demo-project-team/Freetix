/*
  Warnings:

  - You are about to drop the `_PCToTimeSchedule` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pcId` to the `TimeSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PCToTimeSchedule" DROP CONSTRAINT "_PCToTimeSchedule_A_fkey";

-- DropForeignKey
ALTER TABLE "_PCToTimeSchedule" DROP CONSTRAINT "_PCToTimeSchedule_B_fkey";

-- AlterTable
ALTER TABLE "TimeSchedule" ADD COLUMN     "pcId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_PCToTimeSchedule";

-- AddForeignKey
ALTER TABLE "TimeSchedule" ADD CONSTRAINT "TimeSchedule_pcId_fkey" FOREIGN KEY ("pcId") REFERENCES "PC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
