-- CreateEnum
CREATE TYPE "ImageStatus" AS ENUM ('VIEW', 'BACKGROUND');

-- AlterTable
ALTER TABLE "Images" ADD COLUMN     "status" "ImageStatus" NOT NULL DEFAULT 'VIEW';

-- CreateTable
CREATE TABLE "Events" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);
