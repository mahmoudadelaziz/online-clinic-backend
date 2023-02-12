import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

type userData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  username: string;
};
export const createUser = async (user: userData) => {
  // check if user already exists
  const userExists = !!(await prisma.patient.findFirst({
    where: {
      email: user.email,
    },
  }));
  if (userExists) {
    return Promise.reject(new Error("A user with this email already exists"));
  }
  const newUser = await prisma.patient.create({
    data: user,
  });
  const token = jwt.sign(user, process.env.JWT_SECRET as jwt.Secret);
  return { token, username: newUser.username };
};
