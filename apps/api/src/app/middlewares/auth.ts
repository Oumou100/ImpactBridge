import { NextFunction, Request, Response } from "express";
import type { AdminRole } from "@impact-bridge/shared";
import { AppError } from "@/app/middlewares/error-handler";
import { verifyAccessToken } from "@/core/security/jwt";

export type AuthenticatedRequest = Request & {
  admin?: {
    id: string;
    role: AdminRole;
  };
};

const ADMIN_ROLE: AdminRole = "ADMIN";

export const requireAdmin = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : null;

  if (!token) {
    return next(new AppError("Unauthorized", 401));
  }

  try {
    const payload = verifyAccessToken(token);

    if (payload.typ !== "access" || payload.role !== ADMIN_ROLE || !payload.sub) {
      return next(new AppError("Unauthorized", 401));
    }

    req.admin = {
      id: payload.sub,
      role: ADMIN_ROLE,
    };

    return next();
  } catch {
    return next(new AppError("Unauthorized", 401));
  }
};
