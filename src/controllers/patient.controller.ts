import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { PatientService } from "../services/patient.service";
export namespace PatientController {
  export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        const error = new Error("Bad Request");
        error.name = "Validation Error";
        throw error;
      }
      const { name, email, password, phoneNumber, username } = req.body;
      const result = await PatientService.create({
        name,
        email,
        password,
        phoneNumber,
        username,
      });
      if (result) {
        res.cookie("jwt", result.token, {
          httpOnly: true,
          maxAge: 12 * 60 * 60 * 1000,
        });
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
      const token = await PatientService.login({ username, password });
      return res.json({
        message: "User Logged In Successfully",
        token,
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
      await PatientService.deleteById(id);
      return res.json({ message: "User is deleted successfully" });
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
      const updatedUser = await PatientService.updateById(id, updateData);
      return res.json({
        message: "User data is updated successfully",
        data: { username: updatedUser.username, email: updatedUser.email },
      });
    } catch (error) {
      next(error);
    }
  };
}
