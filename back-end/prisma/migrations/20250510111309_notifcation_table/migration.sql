-- CreateTable
CREATE TABLE "Notifcation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notifcation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notifcation" ADD CONSTRAINT "Notifcation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
