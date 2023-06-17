-- CreateTable
CREATE TABLE "Schedule" (
    "doctorId" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("doctorId")
);
