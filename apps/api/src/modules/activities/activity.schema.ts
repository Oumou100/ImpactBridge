import { z } from "zod";

export const activityCreateSchema = z.object({
  title: z.string().trim().min(3).max(150),
  description: z.string().trim().min(10).max(1000),
  content: z.string().trim().max(10000).optional().nullable(),
  location: z.string().trim().max(255).optional().nullable(),
  activityDate: z.string().datetime().optional().nullable(),
  coverImageUrl: z.string().url().max(1000).optional().nullable(),
  coverImagePublicId: z.string().max(255).optional().nullable(),
  isPublished: z.boolean().optional(),
});

export const activityUpdateSchema = activityCreateSchema.partial();

export const activitiesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
  search: z.string().trim().max(100).optional(),
  published: z.enum(["true", "false"]).optional(),
});
