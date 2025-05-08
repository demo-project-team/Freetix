/*
  Warnings:

  - Added the required column `type` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('VIP', 'STANDART');

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "type" "RoomType" NOT NULL;
