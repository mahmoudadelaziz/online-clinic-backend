import { Router } from "express";
import {
  deleteUserById,
  userLogin,
  userSignup,
  updateUserById,
} from "../controllers/user.controller";
import { userSignupValidators } from "../validators/userSignup.validator";
import { userLoginValidator } from "../validators/userLogin.validator";
import { userUpdateValidator } from "../validators/userUpdate.validator";
const userRouter = Router();

userRouter.post("/signup", ...userSignupValidators, userSignup);
userRouter.post("/login", ...userLoginValidator, userLogin);
userRouter.put("/:id", ...userUpdateValidator, updateUserById);
userRouter.delete("/:id", deleteUserById);

export { userRouter };
