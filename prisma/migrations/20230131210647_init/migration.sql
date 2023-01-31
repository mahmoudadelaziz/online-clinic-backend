-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(12) NOT NULL,
    "lastName" VARCHAR(12) NOT NULL,
    "username" VARCHAR(12) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "phoneNumber" VARCHAR(12) NOT NULL,
    "password" VARCHAR(12) NOT NULL,
    "storeName" VARCHAR(12) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);
