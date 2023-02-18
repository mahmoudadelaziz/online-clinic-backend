import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcryptjs";

const prisma = new PrismaClient();

export namespace DoctorService {
  type DoctorSignUpData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    username: string;
    specialization: string;
    locationId: number;
  };
  export const createDoctor = async (doctor: DoctorSignUpData) => {
    try {
      // check if user already exists
      const userExists = !!(await prisma.doctor.findFirst({
        where: {
          email: doctor.email,
        },
      }));
      if (userExists) {
        throw new Error("A user with this email already exists");
      }
      const hasedPassword = await hash(doctor.password, 10);
      const newDoctor = await prisma.doctor.create({
        data: { ...doctor, password: hasedPassword },
      });
      const token = jwt.sign(doctor, process.env.JWT_SECRET as jwt.Secret);
      return { token, username: newDoctor.username };
    } catch (error: any) {
      throw new Error(error);
    }
  };

  type DoctorLoginData = {
    username: string;
    password: string;
  };
  export const loginDoctor = async (doctorData: DoctorLoginData) => {
    try {
      const doctor = await prisma.patient.findFirst({
        where: {
          username: doctorData.username,
        },
      });
      if (!doctor) throw new Error("Either username or password are wrong.");
      //compare password
      const isCorrectPassword = await compare(
        doctorData.password,
        doctor.password
      );

      if (!isCorrectPassword)
        throw new Error("Either username or password are wrong.");

      const token = jwt.sign(doctor, process.env.JWT_SECRET as jwt.Secret);
      return token;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  export const deleteDoctorById = async (id: string) => {
    try {
      await prisma.patient.delete({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      throw new Error("UserId is not valid");
    }
  };
  export const updateDoctorById = async (
    id: string,
    data: Partial<DoctorSignUpData>
  ) => {
    try {
      const updatedDoctor = await prisma.patient.update({
        where: {
          id: Number(id),
        },
        data,
      });
      return updatedDoctor;
    } catch (error: any) {
      throw new Error("UserId is not valid");
    }
  };
}
