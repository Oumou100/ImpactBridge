import { Response } from "express";

type ApiResponseShape<T> = {
  success: boolean;
  message: string;
  data?: T;
  meta?: Record<string, unknown>;
  errors?: unknown;
};

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
