import swaggerJsdoc from "swagger-jsdoc";
import { env } from "@/core/config/env";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ImpactBridge API- by oumouDev",
      version: "1.0.0",
      description: "Authentication endpoints documentation for ImpactBridge API",
    },
    servers: [{ url: `http://localhost:${env.PORT}${env.API_PREFIX}` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        ApiSuccess: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string" },
            data: { type: "object" },
            meta: { type: "object" },
          },
        },
        ApiError: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Unauthorized" },
            errors: { type: "object", nullable: true },
          },
        },
        LoginBody: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email", example: "admin@impactbridge.org" },
            password: { type: "string", minLength: 8, example: "ChangeMe123!" },
          },
        },
        RefreshBody: {
          type: "object",
          required: ["refreshToken"],
          properties: {
            refreshToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
          },
        },
        AuthTokens: {
          type: "object",
          properties: {
            accessToken: { type: "string" },
            refreshToken: { type: "string" },
          },
          required: ["accessToken", "refreshToken"],
        },
        AdminProfile: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            email: { type: "string", format: "email" },
            role: { type: "string", enum: ["ADMIN"] },
            isActive: { type: "boolean" },
            lastLoginAt: { type: "string", format: "date-time", nullable: true },
          },
          required: ["id", "email", "role", "isActive"],
        },
        LoginSuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Admin authenticated successfully" },
            data: {
              type: "object",
              properties: {
                accessToken: { type: "string" },
                refreshToken: { type: "string" },
                admin: {
                  type: "object",
                  properties: {
                    id: { type: "string", format: "uuid" },
                    email: { type: "string", format: "email" },
                    role: { type: "string", enum: ["ADMIN"] },
                  },
                  required: ["id", "email", "role"],
                },
              },
              required: ["accessToken", "refreshToken", "admin"],
            },
          },
        },
        RefreshSuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Tokens refreshed successfully" },
            data: { $ref: "#/components/schemas/AuthTokens" },
          },
        },
        MeSuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Admin profile fetched" },
            data: { $ref: "#/components/schemas/AdminProfile" },
          },
        },
      },
    },
    paths: {
      "/admin/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Admin login",
          description: "Authenticates an admin and returns access/refresh JWT tokens.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginBody" },
              },
            },
          },
          responses: {
            "200": {
              description: "Authenticated successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/LoginSuccessResponse" },
                },
              },
            },
            "401": {
              description: "Invalid credentials",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiError" },
                },
              },
            },
            "422": {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiError" },
                },
              },
            },
          },
        },
      },
      "/admin/auth/refresh": {
        post: {
          tags: ["Auth"],
          summary: "Refresh token pair",
          description: "Exchanges a valid refresh token for a new access/refresh token pair.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RefreshBody" },
              },
            },
          },
          responses: {
            "200": {
              description: "Tokens refreshed",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/RefreshSuccessResponse" },
                },
              },
            },
            "401": {
              description: "Invalid refresh token",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiError" },
                },
              },
            },
            "422": {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiError" },
                },
              },
            },
          },
        },
      },
      "/admin/auth/logout": {
        post: {
          tags: ["Auth"],
          summary: "Logout admin",
          description: "Revokes a refresh token.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RefreshBody" },
              },
            },
          },
          responses: {
            "204": { description: "Logged out" },
            "422": {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiError" },
                },
              },
            },
          },
        },
      },
      "/admin/me": {
        get: {
          tags: ["Auth"],
          summary: "Get authenticated admin profile",
          security: [{ bearerAuth: [] }],
          responses: {
            "200": {
              description: "Admin profile fetched",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/MeSuccessResponse" },
                },
              },
            },
            "401": {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiError" },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
});