import { Request, Response, NextFunction } from "express";
import { LocationService } from "../services";
import { validationResult } from "express-validator";

export const getAllLocations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const locations = await LocationService.getAllLocations();
    return res.json({ locations });
  } catch (error) {
    next(error);
  }
};
export const getLocationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const location = await LocationService.getLocationById(id);
    return res.json({ location });
  } catch (error) {
    next(error);
  }
};

export const createLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error();
      error.name = "Validation Error";
      error.message = "Cannot create location, the provided data is invalid";
      throw error;
    }
    const { street, city, province, lat, lng } = req.body;
    const locationData = {
      street,
      city,
      province,
      lat: Number(lat),
      lng: Number(lng),
    };
    const newLocation = await LocationService.createLocation(locationData);
    return res.json({ newLocation });
  } catch (error) {
    next(error);
  }
};

export const updateLocationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error();
      error.name = "Validation Error";
      error.message = "Cannot update location, the provided data is invalid";
      throw error;
    }
    const id = req.params.id;
    const updateData = req.body;
    if ("lat" in updateData) updateData.lat = Number(updateData.lat);
    if ("lng" in updateData) updateData.lng = Number(updateData.lng);
    const updatedLocation = await LocationService.updateLocationById(
      id,
      updateData
    );
    return res.json({ updatedLocation });
  } catch (error) {
    next(error);
  }
};

export const deleteLocationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const deletedLocation = await LocationService.deleteLocationById(id);
    return res.status(202).json({ deletedLocation });
  } catch (error) {
    next(error);
  }
};
