/*
  Warnings:

  - You are about to drop the column `recieverId` on the `PrivateMessage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."PrivateMessage" DROP CONSTRAINT "PrivateMessage_recieverId_fkey";

-- AlterTable
ALTER TABLE "public"."PrivateMessage" DROP COLUMN "recieverId",
ADD COLUMN     "receiverId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."PrivateMessage" ADD CONSTRAINT "PrivateMessage_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
