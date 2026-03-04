import { z } from "zod";

export const createContactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(3).max(200),
  message: z.string().trim().min(10).max(2000),
  website: z.string().trim().max(200).optional().default(""),
});

export const updateContactStatusSchema = z.object({
  status: z.enum(["NEW", "READ", "ARCHIVED"]),
});

export const contactListQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
  status: z.enum(["NEW", "READ", "ARCHIVED"]).optional(),
});
