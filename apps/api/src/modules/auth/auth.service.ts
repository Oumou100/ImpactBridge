import bcrypt from "bcryptjs";
import { prisma } from "@/core/db/prisma";
import { AppError } from "@/app/middlewares/error-handler";
import {
  hashToken,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "@/core/security/jwt";

const parseRefreshExpiry = () => {
  const defaultDays = 7;
  const fromEnv = process.env.JWT_REFRESH_EXPIRES_IN || `${defaultDays}d`;
  const match = fromEnv.match(/^(\d+)([dhm])$/);

  if (!match) {
    return defaultDays * 24 * 60 * 60 * 1000;
  }

  const value = Number(match[1]);
  const unit = match[2];

  if (unit === "m") return value * 60 * 1000;
  if (unit === "h") return value * 60 * 60 * 1000;
  return value * 24 * 60 * 60 * 1000;
};

const refreshDurationMs = parseRefreshExpiry();

export const loginAdmin = async (email: string, password: string) => {
  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin || !admin.isActive) {
    throw new AppError("Identifiants invalides", 401);
  }

  const ok = await bcrypt.compare(password, admin.passwordHash);

  if (!ok) {
    throw new AppError("Identifiants invalides", 401);
  }

  const accessToken = signAccessToken(admin.id);
  const refreshToken = signRefreshToken(admin.id);

  await prisma.refreshToken.create({
    data: {
      adminId: admin.id,
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + refreshDurationMs),
    },
  });

  await prisma.admin.update({
    where: { id: admin.id },
    data: { lastLoginAt: new Date() },
  });

  return {
    accessToken,
    refreshToken,
    admin: {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    },
  };
};

export const refreshAdminToken = async (token: string) => {
  const payload = verifyRefreshToken(token);

  if (payload.typ !== "refresh" || !payload.sub) {
    throw new AppError("Refresh token invalide", 401);
  }

  const tokenHash = hashToken(token);

  const stored = await prisma.refreshToken.findFirst({
    where: {
      tokenHash,
      adminId: payload.sub,
      revokedAt: null,
      expiresAt: { gt: new Date() },
    },
  });

  if (!stored) {
    throw new AppError("Refresh token invalide", 401);
  }

  await prisma.refreshToken.update({
    where: { id: stored.id },
    data: { revokedAt: new Date() },
  });

  const accessToken = signAccessToken(payload.sub);
  const refreshToken = signRefreshToken(payload.sub);

  await prisma.refreshToken.create({
    data: {
      adminId: payload.sub,
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + refreshDurationMs),
    },
  });

  return { accessToken, refreshToken };
};

export const logoutAdmin = async (token: string) => {
  const tokenHash = hashToken(token);

  await prisma.refreshToken.updateMany({
    where: {
      tokenHash,
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });
};
