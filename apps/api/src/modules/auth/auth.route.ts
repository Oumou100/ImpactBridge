import { Router } from "express";
import { validateBody } from "@/app/middlewares/validate";
import { requireAdmin } from "@/app/middlewares/auth";
import { prisma } from "@/core/db/prisma";
import { created, noContent, ok } from "@/app/http/response";
import { loginSchema, logoutSchema, refreshSchema } from "./auth.schema";
import { loginAdmin, logoutAdmin, refreshAdminToken } from "./auth.service";

export const authRouter = Router();

authRouter.post("/auth/login", validateBody(loginSchema), async (req, res, next) => {
  try {
    const result = await loginAdmin(req.body.email, req.body.password);
    return ok(res, "Admin authentifie avec succes", result);
  } catch (error) {
    next(error);
  }
});

authRouter.post(
  "/auth/refresh",
  validateBody(refreshSchema),
  async (req, res, next) => {
    try {
      const result = await refreshAdminToken(req.body.refreshToken);
      return ok(res, "Tokens rafraichis avec succes", result);
    } catch (error) {
      next(error);
    }
  },
);

authRouter.post("/auth/logout", validateBody(logoutSchema), async (req, res, next) => {
  try {
    await logoutAdmin(req.body.refreshToken);
    return noContent(res);
  } catch (error) {
    next(error);
  }
});

authRouter.get("/me", requireAdmin, async (req, res, next) => {
  try {
    const adminId = (req as { admin?: { id: string } }).admin?.id;
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: { id: true, email: true, role: true, isActive: true, lastLoginAt: true },
    });

    return ok(res, "Profil admin recupere", admin);
  } catch (error) {
    next(error);
  }
});
