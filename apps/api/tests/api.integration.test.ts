import bcrypt from "bcryptjs";
import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock } = vi.hoisted(() => ({
  prismaMock: {
    admin: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    refreshToken: {
      create: vi.fn(),
      findFirst: vi.fn(),
      update: vi.fn(),
      updateMany: vi.fn(),
    },

  },
}));

vi.mock("@/core/db/prisma", () => ({
  prisma: prismaMock,
}));

vi.mock("@/core/mail/mailer", () => ({
  sendContactNotification: vi.fn().mockResolvedValue(undefined),
}));

import { createApp } from "@/app/app";

describe("ImpactBridge API integration essentials", () => {
  const app = createApp();

  beforeEach(() => {
    vi.clearAllMocks();

  });

  it("GET /v1/health returns 200", async () => {
    const response = await request(app).get("/v1/health");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe("ok");
  });

  it("blocks admin route without token", async () => {
    const response = await request(app).post("/v1/admin/activities").send({
      title: "Activity title",
      description: "Activity description with enough length",
    });

    expect(response.status).toBe(401);
  });


  it("auth login returns tokens", async () => {
    const hashedPassword = await bcrypt.hash("AdminPass123!", 10);

    prismaMock.admin.findUnique.mockResolvedValue({
      id: "admin-id",
      email: "admin@impactbridge.org",
      passwordHash: hashedPassword,
      isActive: true,
      role: "ADMIN",
    });

    prismaMock.refreshToken.create.mockResolvedValue({});
    prismaMock.admin.update.mockResolvedValue({});

    const response = await request(app).post("/v1/admin/auth/login").send({
      email: "admin@impactbridge.org",
      password: "AdminPass123!",
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.accessToken).toBeTypeOf("string");
    expect(response.body.data.refreshToken).toBeTypeOf("string");
  });
});
