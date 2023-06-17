import { Router } from "express";
import { createReviewValidator } from "../validators/review.validator";
import { ReviewController } from "../controllers/review.controller";
const reviewRouter = Router();

reviewRouter.post("/", ...createReviewValidator, ReviewController.create);
reviewRouter.get("/", ReviewController.findAll);
reviewRouter.get("/:id", ReviewController.getByDoctorId);
export { reviewRouter };
