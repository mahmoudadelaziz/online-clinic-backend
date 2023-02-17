import { Router } from "express";
import {
  doctorSignup,
  doctorLogin,
  updateDoctorById,
  deleteDoctorById,
} from "../controllers/doctor.controller";
import {
  doctorLoginValidator,
  doctorSignupValidator,
  doctorUpdateValidator,
} from "../validators/doctor";
const doctorRouter = Router();

doctorRouter.post("/signup", ...doctorSignupValidator, doctorSignup);
doctorRouter.post("/login", ...doctorLoginValidator, doctorLogin);
doctorRouter.put("/:id", ...doctorUpdateValidator, updateDoctorById);
doctorRouter.delete("/:id", deleteDoctorById);

export { doctorRouter };
