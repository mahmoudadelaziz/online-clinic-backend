import { Router } from "express";
import {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocationById,
  deleteLocationById,
} from "../controllers/location.controller";
import { createValidator, updateValidator } from "../validators/location";
const locationRouter = Router();

locationRouter.get("/", getAllLocations);
locationRouter.get("/:id", getLocationById);
locationRouter.post("/", ...createValidator, createLocation);
locationRouter.put("/:id", ...updateValidator, updateLocationById);
locationRouter.delete("/:id", deleteLocationById);

export { locationRouter };
