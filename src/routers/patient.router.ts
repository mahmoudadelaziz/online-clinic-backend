import { Router } from "express";
import {
  deletePatientById,
  patientLogin,
  patientSignup,
  updatePatientById,
} from "../controllers/patient.controller";
import {
  patientSignupValidators,
  patientLoginValidator,
  patientUpdateValidator,
} from "../validators/patient";

const patientRouter = Router();

patientRouter.post("/signup", ...patientSignupValidators, patientSignup);
patientRouter.post("/login", ...patientLoginValidator, patientLogin);
patientRouter.put("/:id", ...patientUpdateValidator, updatePatientById);
patientRouter.delete("/:id", deletePatientById);

export { patientRouter };
