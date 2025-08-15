/*
  Warnings:

  - You are about to drop the `GroupMessages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."GroupMessages" DROP CONSTRAINT "GroupMessages_messageId_fkey";

-- DropTable
DROP TABLE "public"."GroupMessages";

-- CreateTable
CREATE TABLE "public"."GroupMessage" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messageId" INTEGER NOT NULL,

    CONSTRAINT "GroupMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."GroupMessage" ADD CONSTRAINT "GroupMessage_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
