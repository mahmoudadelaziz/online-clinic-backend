import { body } from "express-validator";

// firstName      String
// lastName       String
// username       String
// password       String
// email          String
// phoneNumber    String
// specialization String

export const doctorSignupValidator = [
  body(["firstName", "lastName", "username"])
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
];
