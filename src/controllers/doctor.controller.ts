import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";
import { DoctorService } from "../services/doctor.service";

export namespace DoctorController {
  export const signup = async (
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
      const result = await DoctorService.create({
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
  export const login = async (
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
      const token = await DoctorService.login({ username, password });
      return res.json({
        message: "User Logged In Successfully",
        token,
      });
    } catch (error) {
      next(error);
    }
  };
  export const updateById = async (
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
      const updatedUser = await DoctorService.updateById(id, updateData);
      return res.json({
        message: "User data is updated successfully",
        data: { username: updatedUser.username, email: updatedUser.email },
      });
    } catch (error) {
      next(error);
    }
  };
  export const deleteById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    if (!id) {
      return next(new Error("User id must be provided"));
    }
    try {
      await DoctorService.deleteById(id);
      return res.json({ message: "User is deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}
