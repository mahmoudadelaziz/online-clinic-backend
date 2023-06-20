import { PrismaClient, PatientReview } from "@prisma/client";

const prisma = new PrismaClient();
export namespace ReviewService {
  export const create = async (
    review: Omit<PatientReview, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      await prisma.patientReview.create({ data: review });
      return review;
    } catch (error) {
      throw error;
    }
  };
  export const findAll = async () => {
    try {
      const reviews = await prisma.patientReview.findMany();
      return reviews;
    } catch (error) {
      throw error;
    }
  };
  export const getByDoctorId = async (id: number) => {
    try {
      const reviews = await prisma.patientReview.findMany({
        where: { id },
      });
      return reviews;
    } catch (error) {
      throw error;
    }
  };
}
