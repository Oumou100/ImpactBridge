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
  globalRateLimit,
} from "@/app/middlewares/rate-limit";
import { healthRouter } from "@/modules/health/health.route";


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

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
