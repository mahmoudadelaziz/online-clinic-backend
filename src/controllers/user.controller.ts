import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { firstName, lastName, email, password, phoneNumber, username } =
      req.body;
    const user = await prisma.patient.create({
      data: { firstName, lastName, email, password, phoneNumber, username },
    });
    const token = jwt.sign(user, process.env.JWT_SECRET as jwt.Secret);
    res.send({
      message: "User Signed Up Successfully",
      user: { username, token },
    });
  } catch (error) {
    next(error);
  }
};
