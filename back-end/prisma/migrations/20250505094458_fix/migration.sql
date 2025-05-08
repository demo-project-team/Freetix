/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "PCStatus" ADD VALUE 'DELETED';

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "status" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
ALTER COLUMN "paidAt" DROP NOT NULL;

-- DropTable
DROP TABLE "Session";
