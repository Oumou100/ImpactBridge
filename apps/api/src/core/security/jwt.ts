import crypto from "crypto";
import jwt from "jsonwebtoken";
import { env } from "@/core/config/env";

type JwtPayload = {
  sub: string;
  role: "ADMIN";
  typ: "access" | "refresh";
};

const toExpiresIn = (value: string): jwt.SignOptions["expiresIn"] => {
  return value as jwt.SignOptions["expiresIn"];
};

export const signAccessToken = (adminId: string) => {
  return jwt.sign({ role: "ADMIN", typ: "access" }, env.JWT_ACCESS_SECRET, {
    subject: adminId,
    expiresIn: toExpiresIn(env.JWT_ACCESS_EXPIRES_IN),
  });
};

export const signRefreshToken = (adminId: string) => {
  return jwt.sign({ role: "ADMIN", typ: "refresh" }, env.JWT_REFRESH_SECRET, {
    subject: adminId,
    expiresIn: toExpiresIn(env.JWT_REFRESH_EXPIRES_IN),
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload;
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload;
};

export const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};