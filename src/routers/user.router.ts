import { Router } from "express";
import { userSignup } from "../controllers/user.controller";
import { userSignupValidators } from "../utils/userSignup.validator";
const userRouter = Router();

userRouter.post("/signup", ...userSignupValidators, userSignup);

export { userRouter };
