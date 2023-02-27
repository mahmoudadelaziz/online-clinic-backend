import { body } from "express-validator";
import { Patient } from "@prisma/client";

export const patientSignupValidators = [
  body(["name", "username"])
    .isString()
    .trim()
    .toLowerCase()
    .escape()
    .isLength({ min: 3 })
    .withMessage("Must be atleast 3 characters long")
    .isLength({ max: 12 })
    .withMessage("Must be no more than 12 characters long."),
  body("email").isEmail().normalizeEmail(),
  body("password").isString().isLength({ max: 16, min: 4 }),
  body("phoneNumber").isMobilePhone("ar-EG"),
];
