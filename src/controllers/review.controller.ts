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
      const newReview = await ReviewService.create({
        review,
        rating,
        doctorId,
        patientId,
      });
      return res.json({ newReview });
    } catch (error) {
      next(error);
    }
  };
  export const findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const reviews = await ReviewService.findAll();
      return res.json({ reviews });
    } catch (error) {
      next(error);
    }
  };
  export const getByName = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const name = req.params.name;
      const reviews = await ReviewService.getByName(name);
      return res.json({ reviews });
    } catch (error) {
      next(error);
    }
  };
}
