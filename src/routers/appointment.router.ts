import { Router } from "express";
import { AppointmentController } from "../controllers/appointment.controller";
import { auth } from "../utils/authentication";
import { appointmentCreateValidator } from "../validators/appointment.validator";

const appointmentRouter = Router();

appointmentRouter.post(
  "/",
  ...appointmentCreateValidator,
  auth.authenticate,
  AppointmentController.create
);

appointmentRouter.get("/", AppointmentController.validate);
export { appointmentRouter };
