import { body } from "express-validator";

export const doctorSignupValidator = [
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
  body("specialization").isString(),
  body("subSpecialization").isString(),
  body("price1").isFloat().optional(),
  body("price2").isFloat().optional(),
  body("locationId").isString().notEmpty(),
];
