import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { errorResponse } from "@/app/http/response";

export class AppError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const notFoundHandler = (_req: Request, _res: Response, next: NextFunction) => {
  next(new AppError("Resource not found", 404));
};

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode =
    err instanceof AppError ? err.statusCode : err instanceof ZodError ? 422 : 500;
  const message =
    statusCode === 500
      ? "Internal server error"
      : statusCode === 422
        ? "Validation error"
        : err.message;
  const errors =
    err instanceof ZodError
      ? err.flatten().fieldErrors
      : undefined;

  console.error("[API ERROR]", {
    method: req.method,
    path: req.originalUrl,
    statusCode,
    message: err.message,
    stack: process.env.NODE_ENV !== "production" ? err.stack : undefined,
  });

  return errorResponse(res, message, statusCode, errors);
};
