import { body } from "express-validator";

export const patientLoginValidator = [
  body(["username"])
    .isString()
    .trim()
    .toLowerCase()
    .escape()
    .isLength({ min: 3 })
    .withMessage("Must be atleast 3 characters long")
    .isLength({ max: 12 })
    .withMessage("Must be no more than 12 characters long."),
  body("password").isString().isLength({ max: 16, min: 4 }),
];
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
export const patientUpdateValidator = [
  body(["firstName", "lastName", "username"])
    .isString()
    .trim()
    .toLowerCase()
    .escape()
    .isLength({ min: 3 })
    .withMessage("Must be atleast 3 characters long")
    .isLength({ max: 12 })
    .withMessage("Must be no more than 12 characters long.")
    .optional(),
  body("email").isEmail().normalizeEmail().optional(),
  body("password").isString().isLength({ max: 16, min: 4 }).optional(),
  body("phoneNumber").isMobilePhone("ar-EG").optional(),
];
