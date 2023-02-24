import { Router } from "express";
import { AppointmentController } from "../controllers/appointment.controller";
import { appointmentCreateValidator } from "../validators/appointment/create.validator";
const appointmentRouter = Router();

appointmentRouter.post(
  "/",
  ...appointmentCreateValidator,
  AppointmentController.create
);
export { appointmentRouter };
