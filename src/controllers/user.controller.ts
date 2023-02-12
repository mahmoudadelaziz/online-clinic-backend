import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service";
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
    const result = await createUser({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      username,
    });
    res.send({
      message: "User Signed Up Successfully",
      user: { username: result.username, token: result.token },
    });
  } catch (error) {
    next(error);
  }
};
