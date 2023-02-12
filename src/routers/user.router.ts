import { Router } from "express";
import { userLogin, userSignup } from "../controllers/user.controller";
import { userSignupValidators } from "../validators/userSignup.validator";
import { userLoginValidator } from "../validators/userLogin.validator";
const userRouter = Router();

userRouter.post("/signup", ...userSignupValidators, userSignup);
userRouter.post("/login", ...userLoginValidator, userLogin);
export { userRouter };
