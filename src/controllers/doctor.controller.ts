import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";
import { DoctorService } from "../services/doctor.service";

export const doctorSignup = async (
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
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      username,
      specialization,
      locationId,
    } = req.body;
    const result = await DoctorService.createDoctor({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      username,
      specialization,
      locationId,
    });
    if (result) {
      return res.json({
        message: "User Signed Up Successfully",
        user: { username: result.username, token: result.token },
      });
    }
  } catch (error) {
    next(error);
  }
};
export const doctorLogin = async (
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
    const token = await DoctorService.loginDoctor({ username, password });
    return res.json({
      message: "User Logged In Successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};
export const updateDoctorById = async (
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
    const updatedUser = await DoctorService.updateDoctorById(id, updateData);
    return res.json({
      message: "User data is updated successfully",
      data: { username: updatedUser.username, email: updatedUser.email },
    });
  } catch (error) {
    next(error);
  }
};
export const deleteDoctorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  if (!id) {
    return next(new Error("User id must be provided"));
  }
  try {
    await DoctorService.deleteDoctorById(id);
    return res.json({ message: "User is deleted successfully" });
  } catch (error) {
    next(error);
  }
};
