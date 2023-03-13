import { PrismaClient, Appointment } from "@prisma/client";

const prisma = new PrismaClient();

export namespace AppointmentService {
  export const create = async (
    appointment: Omit<Appointment, "id" | "updatedAt">
  ) => {
    try {
      const newAppointment = await prisma.appointment.create({
        data: appointment,
      });
      return newAppointment;
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
