import slugify from "slugify";
import { prisma } from "@/core/db/prisma";
import { AppError } from "@/app/middlewares/error-handler";
import { z } from "zod";
import {
  activityCreateSchema,
  activitiesQuerySchema,
  activityUpdateSchema,
} from "./activity.schema";

const toIsoDate = (value?: string | null) => (value ? new Date(value) : null);

type CreateActivityInput = z.infer<typeof activityCreateSchema>;
type UpdateActivityInput = z.infer<typeof activityUpdateSchema>;

type ListActivitiesQuery = z.infer<typeof activitiesQuerySchema>;

const generateUniqueSlug = async (title: string, currentId?: string) => {
  const base = slugify(title, { lower: true, strict: true, trim: true }) || "activity";

  let candidate = base;
  let index = 1;

  while (true) {
    const existing = await prisma.activity.findUnique({ where: { slug: candidate } });

    if (!existing || existing.id === currentId) {
      return candidate;
    }

    candidate = `${base}-${index}`;
    index += 1;
  }
};

export const listActivities = async (query: ListActivitiesQuery) => {
  const skip = (query.page - 1) * query.limit;
  const where = {
    ...(query.search
      ? {
          OR: [
            { title: { contains: query.search, mode: "insensitive" as const } },
            { description: { contains: query.search, mode: "insensitive" as const } },
          ],
        }
      : {}),
    ...(query.published !== undefined
      ? {
          isPublished: query.published === "true",
        }
      : {}),
  };

  const [data, total] = await Promise.all([
    prisma.activity.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: query.limit,
    }),
    prisma.activity.count({ where }),
  ]);

  return {
    data,
    meta: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.ceil(total / query.limit),
    },
  };
};

export const getActivityBySlug = async (slug: string) => {
  const activity = await prisma.activity.findUnique({ where: { slug } });

  if (!activity) {
    throw new AppError("Activite introuvable", 404);
  }

  return activity;
};

export const getPublicActivityBySlug = async (slug: string) => {
  const activity = await prisma.activity.findFirst({
    where: { slug, isPublished: true },
  });

  if (!activity) {
    throw new AppError("Activite introuvable", 404);
  }

  return activity;
};

export const getActivityById = async (id: string) => {
  const activity = await prisma.activity.findUnique({ where: { id } });

  if (!activity) {
    throw new AppError("Activite introuvable", 404);
  }

  return activity;
};

export const listPublicActivities = async (query: ListActivitiesQuery) => {
  return listActivities({ ...query, published: "true" });
};

export const createActivity = async (
  input: CreateActivityInput,
  adminId?: string,
) => {
  const slug = await generateUniqueSlug(input.title);
  const isPublished = Boolean(input.isPublished);

  return prisma.activity.create({
    data: {
      title: input.title,
      slug,
      description: input.description,
      content: input.content ?? null,
      location: input.location ?? null,
      activityDate: toIsoDate(input.activityDate),
      coverImageUrl: input.coverImageUrl ?? null,
      coverImagePublicId: input.coverImagePublicId ?? null,
      isPublished,
      publishedAt: isPublished ? new Date() : null,
      createdByAdminId: adminId ?? null,
    },
  });
};

export const updateActivity = async (id: string, input: UpdateActivityInput) => {
  const existing = await getActivityById(id);

  const slug =
    input.title && input.title !== existing.title
      ? await generateUniqueSlug(input.title, existing.id)
      : existing.slug;

  const nextIsPublished =
    input.isPublished !== undefined ? input.isPublished : existing.isPublished;

  return prisma.activity.update({
    where: { id },
    data: {
      title: input.title ?? existing.title,
      slug,
      description: input.description ?? existing.description,
      content: input.content !== undefined ? input.content : existing.content,
      location: input.location !== undefined ? input.location : existing.location,
      activityDate:
        input.activityDate !== undefined
          ? toIsoDate(input.activityDate)
          : existing.activityDate,
      coverImageUrl:
        input.coverImageUrl !== undefined
          ? input.coverImageUrl
          : existing.coverImageUrl,
      coverImagePublicId:
        input.coverImagePublicId !== undefined
          ? input.coverImagePublicId
          : existing.coverImagePublicId,
      isPublished: nextIsPublished,
      publishedAt:
        nextIsPublished && !existing.publishedAt
          ? new Date()
          : !nextIsPublished
            ? null
            : existing.publishedAt,
    },
  });
};

export const deleteActivity = async (id: string) => {
  await getActivityById(id);
  await prisma.activity.delete({ where: { id } });
};
