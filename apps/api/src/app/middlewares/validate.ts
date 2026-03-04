import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { AppError } from "@/app/middlewares/error-handler";

export const validateBody = <T>(schema: ZodSchema<T>) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      const details = parsed.error.issues.map((issue) => issue.message).join(" ");
      return next(new AppError(details || "Validation failed", 422));
    }

    req.body = parsed.data;
    return next();
  };
};
