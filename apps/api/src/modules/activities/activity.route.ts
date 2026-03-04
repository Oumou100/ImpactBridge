import { Router } from "express";
import { z } from "zod";
import { validateBody } from "@/app/middlewares/validate";
import { AppError } from "@/app/middlewares/error-handler";
import { created, noContent, ok } from "@/app/http/response";
import {
  activityCreateSchema,
  activitiesQuerySchema,
  activityUpdateSchema,
} from "./activity.schema";
import {
  createActivity,
  deleteActivity,
  getActivityById,
  getPublicActivityBySlug,
  listPublicActivities,
  listActivities,
  updateActivity,
} from "./activity.service";

export const activitiesPublicRouter = Router();
export const activitiesAdminRouter = Router();

activitiesPublicRouter.get("/activities", async (req, res, next) => {
  try {
    const parsed = activitiesQuerySchema.parse(req.query);
    const result = await listPublicActivities(parsed);
    return ok(res, "Activites publiees recuperees", result.data, result.meta);
  } catch (error) {
    next(error);
  }
});

activitiesPublicRouter.get("/activities/:slug", async (req, res, next) => {
  try {
    const slug = z.string().min(1).parse(req.params.slug);
    const activity = await getPublicActivityBySlug(slug);
    return ok(res, "Activite recuperee", activity);
  } catch (error) {
    next(error);
  }
});

activitiesAdminRouter.get("/activities/:id", async (req, res, next) => {
  try {
    const id = z.string().uuid().parse(req.params.id);
    const activity = await getActivityById(id);
    return ok(res, "Activite recuperee", activity);
  } catch (error) {
    next(error);
  }
});

activitiesAdminRouter.get("/activities", async (req, res, next) => {
  try {
    const parsed = activitiesQuerySchema.parse(req.query);
    const result = await listActivities(parsed);
    return ok(res, "Liste des activites recuperee", result.data, result.meta);
  } catch (error) {
    next(error);
  }
});

activitiesAdminRouter.post(
  "/activities",
  validateBody(activityCreateSchema),
  async (req, res, next) => {
    try {
      const adminId = (req as { admin?: { id: string } }).admin?.id;
      if (!adminId) {
        throw new AppError("Non autorise", 401);
      }

      const activity = await createActivity(req.body, adminId);
      return created(res, "Activite creee avec succes", activity);
    } catch (error) {
      next(error);
    }
  },
);

activitiesAdminRouter.patch(
  "/activities/:id",
  validateBody(activityUpdateSchema),
  async (req, res, next) => {
    try {
      const id = z.string().uuid().parse(req.params.id);
      const activity = await updateActivity(id, req.body);
      return ok(res, "Activite mise a jour avec succes", activity);
    } catch (error) {
      next(error);
    }
  },
);

activitiesAdminRouter.delete("/activities/:id", async (req, res, next) => {
  try {
    const id = z.string().uuid().parse(req.params.id);
    await deleteActivity(id);
    return noContent(res);
  } catch (error) {
    next(error);
  }
});
