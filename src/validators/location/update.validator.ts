import { body } from "express-validator";

export const updateValidator = [
  body(["street", "city", "governorate"])
    .isString()
    .trim()
    .toLowerCase()
    .escape()
    .isLength({ min: 3 })
    .withMessage("Must be atleast 3 characters long")
    .isLength({ max: 12 })
    .withMessage("Must be no more than 12 characters long.")
    .optional(),
  body(["lat", "lng"]).isLatLong().optional(),
];
