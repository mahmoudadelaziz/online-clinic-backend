import { Appointment, PrismaClient } from "@prisma/client";

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

  type appointmentData = Pick<Appointment, "patientId" | "doctorId">;
  export const find = async (data: appointmentData) => {
    try {
      const appointment = await prisma.appointment.findMany({
        where: {
          patientId: data.patientId,
          doctorId: data.doctorId,
          at: {
            lt: new Date(),
          },
        },
      });
      return appointment;
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
