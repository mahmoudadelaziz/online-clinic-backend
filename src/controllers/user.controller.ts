import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";
import { createUser, loginUser } from "../services/user.service";

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Bad Request");
    error.name = "Validation Error";
    next(error);
  }
  try {
    const { firstName, lastName, email, password, phoneNumber, username } =
      req.body;
    const result = await createUser({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      username,
    });
    res.json({
      message: "User Signed Up Successfully",
      user: { username: result.username, token: result.token },
    });
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Bad Request");
    error.name = "Validation Error";
    next(error);
  }
  try {
    const { username, password } = req.body;
    const token = await loginUser({ username, password });
    res.json({
      message: "User Logged In Successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};
