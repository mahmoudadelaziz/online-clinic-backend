-- CreateTable
CREATE TABLE "Moderator" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "permissions" TEXT[],

    CONSTRAINT "Moderator_pkey" PRIMARY KEY ("id")
);
