/*
  Warnings:

  - Made the column `receiverId` on table `PrivateMessage` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."PrivateMessage" DROP CONSTRAINT "PrivateMessage_receiverId_fkey";

-- AlterTable
ALTER TABLE "public"."PrivateMessage" ALTER COLUMN "receiverId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."PrivateMessage" ADD CONSTRAINT "PrivateMessage_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
