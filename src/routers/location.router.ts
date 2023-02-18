import { Router } from "express";
import {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocationById,
  deleteLocationById,
} from "../controllers/location.controller";
const locationRouter = Router();

locationRouter.get("/", getAllLocations);
locationRouter.get("/:id", getLocationById);
locationRouter.post("/add-location", createLocation);
locationRouter.put("/:id", updateLocationById);
locationRouter.delete("/", deleteLocationById);

export { locationRouter };
