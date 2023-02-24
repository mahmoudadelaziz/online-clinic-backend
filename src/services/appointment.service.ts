import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Appointment = {
  doctorId: number;
  type: string;
};
export namespace AppointmentService {
  export const create = async (appointment: Appointment) => {
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
