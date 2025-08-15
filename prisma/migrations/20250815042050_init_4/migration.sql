-- CreateTable
CREATE TABLE "public"."PrivateMessage" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL,
    "recieverId" INTEGER NOT NULL,

    CONSTRAINT "PrivateMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."PrivateMessage" ADD CONSTRAINT "PrivateMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PrivateMessage" ADD CONSTRAINT "PrivateMessage_recieverId_fkey" FOREIGN KEY ("recieverId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
