import { Router } from "express";
import { createReviewValidator } from "../validators/review.validator";
import { ReviewService } from "../services/review.service";
const reviewRouter = Router();

reviewRouter.post("/", ...createReviewValidator, ReviewService.create);

export { reviewRouter };
