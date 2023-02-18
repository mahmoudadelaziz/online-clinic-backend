import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";
import { PatientService } from "../services/patient.service";

export const patientSignup = async (
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
    const result = await PatientService.createPatient({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      username,
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

export const patientLogin = async (
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
    const token = await PatientService.loginPatient({ username, password });
    return res.json({
      message: "User Logged In Successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePatientById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  if (!id) {
    return next(new Error("User id must be provided"));
  }
  try {
    await PatientService.deletePatientById(id);
    return res.json({ message: "User is deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updatePatientById = async (
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
    const updatedUser = await PatientService.updatePatientById(id, updateData);
    return res.json({
      message: "User data is updated successfully",
      data: { username: updatedUser.username, email: updatedUser.email },
    });
  } catch (error) {
    next(error);
  }
};
