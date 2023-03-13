/*
  Warnings:

  - The primary key for the `Appointment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Appointment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `prescriptionId` column on the `Appointment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Doctor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Doctor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Location` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Moderator` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Moderator` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Patient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Patient` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `PatientReview` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PatientReview` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Prescription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Prescription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `doctorId` on the `Appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `patientId` on the `Appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `locationId` on the `Doctor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `doctorId` on the `PatientReview` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `patientId` on the `PatientReview` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_prescriptionId_fkey";

-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_locationId_fkey";

-- DropForeignKey
ALTER TABLE "PatientReview" DROP CONSTRAINT "PatientReview_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "PatientReview" DROP CONSTRAINT "PatientReview_patientId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "doctorId",
ADD COLUMN     "doctorId" INTEGER NOT NULL,
DROP COLUMN "patientId",
ADD COLUMN     "patientId" INTEGER NOT NULL,
DROP COLUMN "prescriptionId",
ADD COLUMN     "prescriptionId" INTEGER,
ADD CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "locationId",
ADD COLUMN     "locationId" INTEGER NOT NULL,
ADD CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Moderator" DROP CONSTRAINT "Moderator_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Moderator_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Patient_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PatientReview" DROP CONSTRAINT "PatientReview_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "doctorId",
ADD COLUMN     "doctorId" INTEGER NOT NULL,
DROP COLUMN "patientId",
ADD COLUMN     "patientId" INTEGER NOT NULL,
ADD CONSTRAINT "PatientReview_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Prescription" DROP CONSTRAINT "Prescription_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Prescription_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_prescriptionId_key" ON "Appointment"("prescriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_locationId_key" ON "Doctor"("locationId");

-- AddForeignKey
ALTER TABLE "PatientReview" ADD CONSTRAINT "PatientReview_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientReview" ADD CONSTRAINT "PatientReview_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "Prescription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
