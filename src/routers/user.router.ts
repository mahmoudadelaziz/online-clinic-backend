import { Router } from "express";
import { PatientController } from "../controllers/patient.controller";
import { DoctorController } from "../controllers/doctor.controller";
import { ModeratorController } from "../controllers/moderator.controller";

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

import {
  moderatorLoginValidator,
  moderatorSignupValidator,
  moderatorUpdateValidator,
} from "../validators/moderator";

const userRouter = Router();

// patient routes
userRouter.post(
  "/patient/signup",
  ...patientSignupValidators,
  PatientController.signup
);
userRouter.post(
  "/patient/login",
  ...patientLoginValidator,
  PatientController.login
);
userRouter.put(
  "/patient/:id",
  ...patientUpdateValidator,
  PatientController.updateById
);
userRouter.delete("/patient/:id", PatientController.deleteById);

// doctor routes
userRouter.get("/doctor/spec", DoctorController.findBySpecialization);
userRouter.get("/doctor/name", DoctorController.findByName);
userRouter.get("/doctor/location", DoctorController.findByLocation);
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

// moderator routes
userRouter.post(
  "/moderator/signup",
  ...moderatorSignupValidator,
  ModeratorController.signup
);
userRouter.post(
  "/moderator/login",
  ...moderatorLoginValidator,
  ModeratorController.login
);
userRouter.put(
  "/moderator/:id",
  ...moderatorUpdateValidator,
  ModeratorController.updateById
);
userRouter.delete("/moderator/:id", ModeratorController.deleteById);

export { userRouter };
