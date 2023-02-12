import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcryptjs";

const prisma = new PrismaClient();

type UserSignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  username: string;
};
export const createUser = async (user: UserSignUpData) => {
  // check if user already exists
  const userExists = !!(await prisma.patient.findFirst({
    where: {
      email: user.email,
    },
  }));
  if (userExists) {
    return Promise.reject(new Error("A user with this email already exists"));
  }
  const hasedPassword = await hash(user.password, 10);
  const newUser = await prisma.patient.create({
    data: { ...user, password: hasedPassword },
  });
  const token = jwt.sign(user, process.env.JWT_SECRET as jwt.Secret);
  return { token, username: newUser.username };
};

type UserLoginData = {
  username: string;
  password: string;
};
export const loginUser = async (userData: UserLoginData) => {
  const user = await prisma.patient.findFirst({
    where: {
      username: userData.username,
    },
  });
  if (!user)
    return Promise.reject(new Error("Either username or password are wrong."));
  //compare password
  const isCorrectPassword = await compare(userData.password, user.password);
  if (!isCorrectPassword)
    return Promise.reject(new Error("Either username or password are wrong."));

  const token = jwt.sign(user, process.env.JWT_SECRET as jwt.Secret);
  return token;
};
