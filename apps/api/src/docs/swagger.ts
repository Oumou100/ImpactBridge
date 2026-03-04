import swaggerJsdoc from "swagger-jsdoc";
import { env } from "@/core/config/env";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ImpactBridge API",
      version: "1.0.0",
      description: "Authentication and activities endpoints documentation for ImpactBridge API",
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
        ApiError: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Non autorise" },
            errors: { type: "object", nullable: true },
          },
        },
        LoginBody: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "admin@impactbridge.org",
              description: "Obligatoire",
            },
            password: {
              type: "string",
              minLength: 8,
              example: "ChangeMe123!",
              description: "Obligatoire",
            },
          },
        },
        RefreshBody: {
          type: "object",
          required: ["refreshToken"],
          properties: {
            refreshToken: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              description: "Obligatoire",
            },
          },
        },
        LoginSuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Admin authentifie avec succes" },
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
            },
          },
        },
        RefreshSuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Tokens rafraichis avec succes" },
            data: {
              type: "object",
              properties: {
                accessToken: { type: "string" },
                refreshToken: { type: "string" },
              },
            },
          },
        },
        AdminProfileResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Profil admin recupere" },
            data: {
              type: "object",
              properties: {
                id: { type: "string", format: "uuid" },
                email: { type: "string", format: "email" },
                role: { type: "string", enum: ["ADMIN"] },
                isActive: { type: "boolean" },
                lastLoginAt: { type: "string", format: "date-time", nullable: true },
              },
            },
          },
        },
        ActivityBody: {
          type: "object",
          required: ["title", "description"],
          properties: {
            title: {
              type: "string",
              minLength: 3,
              maxLength: 150,
              example: "Distribution alimentaire",
              description: "Obligatoire",
            },
            description: {
              type: "string",
              minLength: 10,
              maxLength: 1000,
              example: "Soutien alimentaire aux familles vulnerables.",
              description: "Obligatoire",
            },
            content: { type: "string", nullable: true, description: "Optionnel" },
            location: {
              type: "string",
              nullable: true,
              example: "Casablanca",
              description: "Optionnel",
            },
            activityDate: {
              type: "string",
              format: "date-time",
              nullable: true,
              example: "2026-03-01T10:00:00.000Z",
              description: "Optionnel",
            },
            coverImageUrl: {
              type: "string",
              format: "uri",
              nullable: true,
              description: "Optionnel",
            },
            coverImagePublicId: {
              type: "string",
              nullable: true,
              description: "Optionnel",
            },
            isPublished: { type: "boolean", example: true, description: "Optionnel" },
          },
        },
        ActivityResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string" },
            data: {
              type: "object",
              properties: {
                id: { type: "string", format: "uuid" },
                title: { type: "string" },
                slug: { type: "string" },
                description: { type: "string" },
                content: { type: "string", nullable: true },
                location: { type: "string", nullable: true },
                activityDate: { type: "string", format: "date-time", nullable: true },
                coverImageUrl: { type: "string", nullable: true },
                coverImagePublicId: { type: "string", nullable: true },
                isPublished: { type: "boolean" },
                publishedAt: { type: "string", format: "date-time", nullable: true },
                createdAt: { type: "string", format: "date-time" },
                updatedAt: { type: "string", format: "date-time" },
              },
            },
          },
        },
        ActivitiesListResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string" },
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/ActivityResponse/properties/data" },
            },
            meta: {
              type: "object",
              properties: {
                page: { type: "integer" },
                limit: { type: "integer" },
                total: { type: "integer" },
                totalPages: { type: "integer" },
              },
            },
          },
        },
      },
    },
    paths: {
      "/admin/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Admin login",
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
                "application/json": { schema: { $ref: "#/components/schemas/LoginSuccessResponse" } },
              },
            },
            "401": {
              description: "Invalid credentials",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
              },
            },
            "422": {
              description: "Validation error",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
              },
            },
          },
        },
      },
      "/admin/auth/refresh": {
        post: {
          tags: ["Auth"],
          summary: "Refresh token pair",
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
                "application/json": { schema: { $ref: "#/components/schemas/RefreshSuccessResponse" } },
              },
            },
            "401": {
              description: "Invalid refresh token",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
              },
            },
          },
        },
      },
      "/admin/auth/logout": {
        post: {
          tags: ["Auth"],
          summary: "Logout admin",
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
                "application/json": { schema: { $ref: "#/components/schemas/AdminProfileResponse" } },
              },
            },
            "401": {
              description: "Unauthorized",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
              },
            },
          },
        },
      },
      "/activities": {
        get: {
          tags: ["Activities"],
          summary: "List published activities",
          parameters: [
            { in: "query", name: "page", required: false, schema: { type: "integer", minimum: 1 }, description: "Optionnel (defaut: 1)" },
            { in: "query", name: "limit", required: false, schema: { type: "integer", minimum: 1, maximum: 50 }, description: "Optionnel (defaut: 10)" },
            { in: "query", name: "search", required: false, schema: { type: "string" }, description: "Optionnel" },
          ],
          responses: {
            "200": {
              description: "Published activities list",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/ActivitiesListResponse" } },
              },
            },
          },
        },
      },
      "/activities/{slug}": {
        get: {
          tags: ["Activities"],
          summary: "Get one published activity by slug",
          parameters: [
            { in: "path", name: "slug", required: true, schema: { type: "string" } },
          ],
          responses: {
            "200": {
              description: "Activity details",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/ActivityResponse" } },
              },
            },
            "404": {
              description: "Not found",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
              },
            },
          },
        },
      },
      "/admin/activities": {
        get: {
          tags: ["Activities Admin"],
          summary: "List activities (admin)",
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: "query", name: "page", required: false, schema: { type: "integer", minimum: 1 }, description: "Optionnel (defaut: 1)" },
            { in: "query", name: "limit", required: false, schema: { type: "integer", minimum: 1, maximum: 50 }, description: "Optionnel (defaut: 10)" },
            { in: "query", name: "search", required: false, schema: { type: "string" }, description: "Optionnel" },
            { in: "query", name: "published", required: false, schema: { type: "string", enum: ["true", "false"] }, description: "Optionnel" },
          ],
          responses: {
            "200": {
              description: "Activities list",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/ActivitiesListResponse" } },
              },
            },
          },
        },
        post: {
          tags: ["Activities Admin"],
          summary: "Create activity",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ActivityBody" },
              },
            },
          },
          responses: {
            "201": {
              description: "Created",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/ActivityResponse" } },
              },
            },
            "401": {
              description: "Unauthorized",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
              },
            },
            "422": {
              description: "Validation error",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
              },
            },
          },
        },
      },
      "/admin/activities/{id}": {
        get: {
          tags: ["Activities Admin"],
          summary: "Get activity by id",
          security: [{ bearerAuth: [] }],
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string", format: "uuid" } }],
          responses: {
            "200": {
              description: "Activity details",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/ActivityResponse" } },
              },
            },
          },
        },
        patch: {
          tags: ["Activities Admin"],
          summary: "Update activity",
          security: [{ bearerAuth: [] }],
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string", format: "uuid" } }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ActivityBody" },
              },
            },
          },
          responses: {
            "200": {
              description: "Updated",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/ActivityResponse" } },
              },
            },
          },
        },
        delete: {
          tags: ["Activities Admin"],
          summary: "Delete activity",
          security: [{ bearerAuth: [] }],
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string", format: "uuid" } }],
          responses: {
            "204": { description: "Deleted" },
          },
        },
      },
    },
  },
  apis: [],
});
