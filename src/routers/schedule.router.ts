import { Router } from "express";
import { ScheduleController } from "../controllers/schedule.controller";
const scheduleRouter = Router();

scheduleRouter.post("/", ScheduleController.create);
scheduleRouter.get("/", ScheduleController.findAll);
scheduleRouter.delete("/:id", ScheduleController.deleteById);
export { scheduleRouter };
