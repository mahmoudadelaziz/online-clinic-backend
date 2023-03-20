import { PrismaClient, PatientReview } from "@prisma/client";

const prisma = new PrismaClient();
export namespace ReviewService {
  export const create = async (
    review: Omit<PatientReview, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      await prisma.patientReview.create({ data: review });
    } catch (error) {
      throw error;
    }
  };
}