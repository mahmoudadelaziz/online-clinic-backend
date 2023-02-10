import { Request, Response, NextFunction } from "express";
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err.status) {
    err.status = 500;
  }
  if (!err.message) {
    err.message = "Something went wrong";
  }
  res.json({ error: err });
};
