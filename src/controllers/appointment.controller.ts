import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { AppointmentService } from "../services/appointment.service";

export namespace AppointmentController {
  export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const errors = validationResult(req);
      const { doctorId, type, prescriptionId, patientId, at } = req.body;
      if (!errors.isEmpty()) {
        const error = new Error("Bad Request");
        error.name = "Validation Error";
        throw error;
        // next(error); Executes the create service anyway
      }
      const newAppointment = await AppointmentService.create({
        doctorId,
        type,
        prescriptionId,
        patientId,
        at,
      });
      return res.json({ newAppointment });
    } catch (error: any) {
      next(error);
    }
  };
}
