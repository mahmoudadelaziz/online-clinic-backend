import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcryptjs";

const prisma = new PrismaClient();

export namespace PatientService {
  type PatientSignUpData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    username: string;
  };
  export const createPatient = async (user: PatientSignUpData) => {
    try {
      // check if user already exists
      const userExists = !!(await prisma.patient.findFirst({
        where: {
          email: user.email,
        },
      }));
      if (userExists) {
        throw new Error("A user with this email already exists");
      }
      const hasedPassword = await hash(user.password, 10);
      const newUser = await prisma.patient.create({
        data: { ...user, password: hasedPassword },
      });
      const token = jwt.sign(user, process.env.JWT_SECRET as jwt.Secret);
      return { token, username: newUser.username };
    } catch (error: any) {
      new Error(error);
    }
  };

  type PatientLoginData = {
    username: string;
    password: string;
  };
  export const loginPatient = async (userData: PatientLoginData) => {
    try {
      const user = await prisma.patient.findFirst({
        where: {
          username: userData.username,
        },
      });
      if (!user) throw new Error("Either username or password are wrong.");
      //compare password
      const isCorrectPassword = await compare(userData.password, user.password);

      if (!isCorrectPassword)
        throw new Error("Either username or password are wrong.");

      const token = jwt.sign(user, process.env.JWT_SECRET as jwt.Secret);
      return token;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  export const deletePatientById = async (id: string) => {
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
  export const updatePatientById = async (
    id: string,
    data: Partial<PatientSignUpData>
  ) => {
    try {
      const updatedUser = await prisma.patient.update({
        where: {
          id: Number(id),
        },
        data,
      });
      return updatedUser;
    } catch (error: any) {
      throw new Error("UserId is not valid");
    }
  };
}
