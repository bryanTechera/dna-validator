import { HttpError } from "../common/httpError";
import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  const httpError = new HttpError(err);
  res.status(httpError.getStatusCode());
  res.render("error", httpError.getPayload());
}
