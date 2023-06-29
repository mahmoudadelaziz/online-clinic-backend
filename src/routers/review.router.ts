import { Router } from "express";
import { AppointmentController } from "../controllers/appointment.controller";
import { ReviewController } from "../controllers/review.controller";
import { createReviewValidator } from "../validators/review.validator";
const reviewRouter = Router();

reviewRouter.post(
  "/",
  ...createReviewValidator,
  AppointmentController.find,
  ReviewController.create
);
reviewRouter.get("/", ReviewController.findAll);
reviewRouter.get("/:id", ReviewController.getByDoctorId);
export { reviewRouter };
