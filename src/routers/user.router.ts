import { Router } from "express";
import {
  deletePatientById,
  patientLogin,
  patientSignup,
  updatePatientById,
} from "../controllers/patient.controller";

import {
  doctorSignup,
  doctorLogin,
  updateDoctorById,
  deleteDoctorById,
} from "../controllers/doctor.controller";

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

userRouter.post("/patient/signup", ...patientSignupValidators, patientSignup);
userRouter.post("/patient/login", ...patientLoginValidator, patientLogin);
userRouter.put("/patient/:id", ...patientUpdateValidator, updatePatientById);
userRouter.delete("/patient/:id", deletePatientById);

userRouter.post("/doctor/signup", ...doctorSignupValidator, doctorSignup);
userRouter.post("/doctor/login", ...doctorLoginValidator, doctorLogin);
userRouter.put("/doctor/:id", ...doctorUpdateValidator, updateDoctorById);
userRouter.delete("/doctor/:id", deleteDoctorById);

export { userRouter };
