import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";
import { ReviewService } from "../services/review.service";

export namespace ReviewController {
  export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("Bad Request");
        error.name = "Validation Error";
        next(error);
      }
      const { review, rating, doctorId, patientId } = req.body;
      await ReviewService.create({ review, rating, doctorId, patientId });
    } catch (error) {}
  };
}
