import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { env } from "@/core/config/env";
import { swaggerSpec } from "@/docs/swagger";
import { notFoundHandler, errorHandler } from "@/app/middlewares/error-handler";
import {
  authRateLimit,
  contactRateLimit,
  globalRateLimit,
} from "@/app/middlewares/rate-limit";
import { requireAdmin } from "@/app/middlewares/auth";
import { healthRouter } from "@/modules/health/health.route";
import {
  activitiesAdminRouter,
  activitiesPublicRouter,
} from "@/modules/activities/activity.route";
import { authRouter } from "@/modules/auth/auth.route";
import {
  contactsAdminRouter,
  contactsPublicRouter,
} from "@/modules/contacts/contact.route";
import { uploadsRouter } from "@/modules/uploads/upload.route";

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(globalRateLimit);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use(env.API_PREFIX, healthRouter);

  app.use(`${env.API_PREFIX}/admin/auth`, authRateLimit);
  app.use(`${env.API_PREFIX}/contact`, contactRateLimit);

  app.use(`${env.API_PREFIX}/admin`, authRouter);
  app.use(env.API_PREFIX, activitiesPublicRouter);
  app.use(env.API_PREFIX, contactsPublicRouter);

  app.use(env.API_PREFIX + "/admin", requireAdmin);
  app.use(env.API_PREFIX + "/admin", activitiesAdminRouter);
  app.use(env.API_PREFIX + "/admin", contactsAdminRouter);
  app.use(env.API_PREFIX + "/admin", uploadsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
