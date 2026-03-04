import { Router } from "express";
import { ok } from "@/app/http/response";

export const healthRouter = Router();

healthRouter.get("/health", (_req, res) => {
  return ok(res, "Service is healthy", {
    status: "ok",
    service: "impact-bridge-api",
    timestamp: new Date().toISOString(),
  });
});