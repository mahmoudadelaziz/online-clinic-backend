import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";
import { UserService } from "../services/user.service";

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
    const result = await UserService.createUser({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      username,
    });
    if (result) {
      res.json({
        message: "User Signed Up Successfully",
        user: { username: result.username, token: result.token },
      });
    }
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
    const token = await UserService.loginUser({ username, password });
    return res.json({
      message: "User Logged In Successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  if (!id) {
    return next(new Error("User id must be provided"));
  }
  try {
    await UserService.deleteUserById(id);
    return res.json({ message: "User is deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  if (!id) {
    return next(new Error("User id must be provided"));
  }
  try {
    const updateData = req.body;
    const updatedUser = await UserService.updateUserById(id, updateData);
    return res.json({
      message: "User data is updated successfully",
      data: { username: updatedUser.username, email: updatedUser.email },
    });
  } catch (error) {
    next(error);
  }
};
