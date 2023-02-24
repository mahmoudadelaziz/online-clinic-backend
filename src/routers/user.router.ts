import { Router } from "express";
import { patientController } from "../controllers/patient.controller";
import { DoctorController } from "../controllers/doctor.controller";

import {
  patientSignupValidators,
  patientLoginValidator,
  patientUpdateValidator,
} from "../validators/patient";

import {
  doctorSignupValidator,
  doctorUpdateValidator,
  doctorLoginValidator,
} from "../validators/doctor";

const userRouter = Router();

userRouter.post(
  "/patient/signup",
  ...patientSignupValidators,
  patientController.signup
);
userRouter.post(
  "/patient/login",
  ...patientLoginValidator,
  patientController.login
);
userRouter.put(
  "/patient/:id",
  ...patientUpdateValidator,
  patientController.updateById
);
userRouter.delete("/patient/:id", patientController.deleteById);

userRouter.post(
  "/doctor/signup",
  ...doctorSignupValidator,
  DoctorController.signup
);
userRouter.post(
  "/doctor/login",
  ...doctorLoginValidator,
  DoctorController.login
);
userRouter.put(
  "/doctor/:id",
  ...doctorUpdateValidator,
  DoctorController.updateById
);
userRouter.delete("/doctor/:id", DoctorController.deleteById);

export { userRouter };
