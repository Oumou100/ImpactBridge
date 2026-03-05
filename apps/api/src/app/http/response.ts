import { Response } from "express";
import type { ApiErrorResponse, ApiSuccessResponse } from "@impact-bridge/shared";

type ApiResponseShape<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export const ok = <T>(
  res: Response,
  message: string,
  data?: T,
  meta?: Record<string, unknown>,
) => {
  const payload: ApiResponseShape<T> = {
    success: true,
    message,
    ...(data !== undefined ? { data } : {}),
    ...(meta ? { meta } : {}),
  };

  return res.status(200).json(payload);
};

export const created = <T>(res: Response, message: string, data?: T) => {
  const payload: ApiResponseShape<T> = {
    success: true,
    message,
    ...(data !== undefined ? { data } : {}),
  };

  return res.status(201).json(payload);
};

export const noContent = (res: Response) => {
  return res.status(204).send();
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode: number,
  errors?: unknown,
) => {
  const payload: ApiResponseShape<never> = {
    success: false,
    message,
    ...(errors ? { errors } : {}),
  };

  return res.status(statusCode).json(payload);
};
