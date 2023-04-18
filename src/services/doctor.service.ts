import { PrismaClient, Doctor } from "@prisma/client";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcryptjs";

const prisma = new PrismaClient();

type DoctorLogin = Pick<Doctor, "username" | "password">;
export namespace DoctorService {
  export const create = async (
    doctor: Omit<Doctor, "id" | "createdAt" | "updatedAt">
  ) => {
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

  export const login = async (doctorData: DoctorLogin) => {
    try {
      const doctor = await prisma.doctor.findFirst({
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

  export const deleteById = async (id: string) => {
    try {
      await prisma.doctor.delete({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      throw new Error("UserId is not valid");
    }
  };
  export const updateById = async (id: string, data: Partial<Doctor>) => {
    try {
      const updatedDoctor = await prisma.doctor.update({
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
  export const findBySpecialization = async (spec: string) => {
    try {
      const doctors = await prisma.doctor.findMany({
        where: { specialization: spec },
      });
      return doctors;
    } catch (error: any) {
      throw new Error(error);
    }
  };
  export const findByLocationId = async (locationId: number) => {
    try {
      const doctors = await prisma.doctor.findMany({
        where: { locationId },
      });
      return doctors;
    } catch (error: any) {
      throw new Error(error);
    }
  };
  export const findByName = async (name: string) => {
    try {
      const doctors = await prisma.doctor.findMany({
        where: {
          name: { contains: name },
        },
      });
      return doctors;
    } catch (error: any) {
      throw new Error(error);
    }
  };
  export const findAll = async () => {
    try {
      const doctors = await prisma.doctor.findMany();
      return doctors;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  interface GetCardInfoOptions {
    page: number;
    pageSize: number;
  }
  export const getCardInfo = async ({
    page,
    pageSize = 10,
  }: GetCardInfoOptions) => {
    try {
      const doctors = await prisma.doctor.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        select: {
          id: true,
          name: true,
          specialization: true,
          subSpecialization: true,
        },
      });

      const totalCount = await prisma.doctor.count();
      const doctorsWithReviews = await Promise.all(
        // get reviews for each doctor
        doctors.map(async (doctor) => {
          const reviews = await prisma.patientReview.findMany({
            where: { doctorId: doctor.id },
            select: {
              rating: true,
            },
          });
          const totalRating = reviews.length
            ? reviews.reduce((acc, curr) => acc + curr.rating, 0)
            : 0;
          const avgRating = totalRating / reviews.length;
          const numberOfReviews = reviews.length;
          return {
            ...doctor,
            avgRating,
            numberOfReviews,
          };
        })
      );
      return {
        numberOfPages: Math.ceil(totalCount / pageSize),
        data: doctorsWithReviews,
      };
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
