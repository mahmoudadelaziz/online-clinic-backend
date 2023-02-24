import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcryptjs";

const prisma = new PrismaClient();

export namespace ModeratorService {
  type ModeratorSignupData = {
    email: string;
    password: string;
    username: string;
    permissions: string[];
  };
  export const create = async (user: ModeratorSignupData) => {
    try {
      // check if user already exists
      const userExists = !!(await prisma.moderator.findFirst({
        where: {
          email: user.email,
        },
      }));
      if (userExists) {
        throw new Error("A user with this email already exists");
      }
      const hasedPassword = await hash(user.password, 10);
      const newUser = await prisma.moderator.create({
        data: { ...user, password: hasedPassword },
      });
      const token = jwt.sign(user, process.env.JWT_SECRET as jwt.Secret);
      return { token, username: newUser.username };
    } catch (error: any) {
      throw new Error(error);
    }
  };

  type ModeratorLoginData = {
    username: string;
    password: string;
  };
  export const login = async (userData: ModeratorLoginData) => {
    try {
      const user = await prisma.moderator.findFirst({
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

  export const deleteById = async (id: string) => {
    try {
      await prisma.moderator.delete({
        where: {
          id: Number(id),
        },
      });
    } catch (error) {
      throw new Error("UserId is not valid");
    }
  };
  export const updateById = async (
    id: string,
    data: Partial<ModeratorSignupData>
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
