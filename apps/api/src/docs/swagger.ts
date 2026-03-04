import swaggerJsdoc from "swagger-jsdoc";
import { env } from "@/core/config/env";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ImpactBridge API",
      version: "1.0.0",
      description: "Authentication, activities and contacts endpoints documentation for ImpactBridge API",
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
        CreateContactBody: {
          type: "object",
          required: ["name", "email", "subject", "message"],
          properties: {
            name: {
              type: "string",
              minLength: 2,
              maxLength: 100,
              example: "Aicha Benali",
              description: "Obligatoire",
            },
            email: {
              type: "string",
              format: "email",
              maxLength: 255,
              example: "aicha@example.com",
              description: "Obligatoire",
            },
            subject: {
              type: "string",
              minLength: 3,
              maxLength: 200,
              example: "Demande de partenariat",
              description: "Obligatoire",
            },
            message: {
              type: "string",
              minLength: 10,
              maxLength: 2000,
              example: "Bonjour, je souhaite proposer un partenariat local.",
              description: "Obligatoire",
            },
            website: {
              type: "string",
              maxLength: 200,
              example: "",
              description: "Optionnel (honeypot, laisser vide)",
            },
          },
        },
        ContactStatusUpdateBody: {
          type: "object",
          required: ["status"],
          properties: {
            status: {
              type: "string",
              enum: ["NEW", "READ", "ARCHIVED"],
              description: "Obligatoire",
            },
          },
        },
        ContactItem: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
            name: { type: "string" },
            email: { type: "string", format: "email" },
            subject: { type: "string" },
            message: { type: "string" },
            status: { type: "string", enum: ["NEW", "READ", "ARCHIVED"] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        ContactCreatedResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: {
              type: "string",
              example: "Message de contact envoye avec succes",
            },
            data: {
              type: "object",
              properties: {
                message: { type: "string", example: "Votre message a ete envoye avec succes." },
                id: { type: "string", format: "uuid" },
              },
            },
          },
        },
        ContactsListResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Messages de contact recuperes" },
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/ContactItem" },
            },
            meta: {
              type: "object",
              properties: {
                page: { type: "integer", example: 1 },
                limit: { type: "integer", example: 10 },
                total: { type: "integer", example: 57 },
                totalPages: { type: "integer", example: 6 },
              },
            },
          },
        },
        ContactStatusUpdatedResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Statut du message mis a jour" },
            data: { $ref: "#/components/schemas/ContactItem" },
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
      "/contact": {
        post: {
          tags: ["Contacts"],
          summary: "Submit a contact message",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateContactBody" },
              },
            },
          },
          responses: {
            "201": {
              description: "Contact message stored and notification sent",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/ContactCreatedResponse" } },
              },
            },
            "422": {
              description: "Validation error",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
              },
            },
            "429": {
              description: "Rate limit exceeded",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
              },
            },
          },
        },
      },
      "/admin/contacts": {
        get: {
          tags: ["Contacts Admin"],
          summary: "List contact messages (admin)",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "query",
              name: "page",
              required: false,
              schema: { type: "integer", minimum: 1 },
              description: "Optionnel (defaut: 1)",
            },
            {
              in: "query",
              name: "limit",
              required: false,
              schema: { type: "integer", minimum: 1, maximum: 50 },
              description: "Optionnel (defaut: 10)",
            },
            {
              in: "query",
              name: "status",
              required: false,
              schema: { type: "string", enum: ["NEW", "READ", "ARCHIVED"] },
              description: "Optionnel",
            },
          ],
          responses: {
            "200": {
              description: "Contact messages fetched",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/ContactsListResponse" } },
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
      "/admin/contacts/{id}/status": {
        patch: {
          tags: ["Contacts Admin"],
          summary: "Update contact status",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string", format: "uuid" },
              description: "Obligatoire",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ContactStatusUpdateBody" },
              },
            },
          },
          responses: {
            "200": {
              description: "Contact status updated",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/ContactStatusUpdatedResponse" } },
              },
            },
            "401": {
              description: "Unauthorized",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/ApiError" } },
              },
            },
            "404": {
              description: "Contact message not found",
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
    },
  },
  apis: [],
});
