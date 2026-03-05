import slugify from "slugify";
import { z } from "zod";
import type { Activity as PrismaActivity } from "@prisma/client";
import type { Activity as SharedActivity } from "@impact-bridge/shared";
import { prisma } from "@/core/db/prisma";
import { AppError } from "@/app/middlewares/error-handler";
import {
  activityCreateSchema,
  activitiesQuerySchema,
  activityUpdateSchema,
} from "./activity.schema";

const toIsoDate = (value?: string | null) => (value ? new Date(value) : null);

type CreateActivityInput = z.infer<typeof activityCreateSchema>;
type UpdateActivityInput = z.infer<typeof activityUpdateSchema>;
type ListActivitiesQuery = z.infer<typeof activitiesQuerySchema>;

type ListActivitiesResult = {
  data: SharedActivity[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

const mapActivityToShared = (activity: PrismaActivity): SharedActivity => ({
  id: activity.id,
  title: activity.title,
  slug: activity.slug,
  description: activity.description,
  content: activity.content,
  location: activity.location,
  activityDate: activity.activityDate ? activity.activityDate.toISOString() : null,
  coverImageUrl: activity.coverImageUrl,
  coverImagePublicId: activity.coverImagePublicId,
  isPublished: activity.isPublished,
  publishedAt: activity.publishedAt ? activity.publishedAt.toISOString() : null,
  createdAt: activity.createdAt.toISOString(),
  updatedAt: activity.updatedAt.toISOString(),
});

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

const getActivityEntityById = async (id: string): Promise<PrismaActivity> => {
  const activity = await prisma.activity.findUnique({ where: { id } });

  if (!activity) {
    throw new AppError("Activite introuvable", 404);
  }

  return activity;
};

export const listActivities = async (query: ListActivitiesQuery): Promise<ListActivitiesResult> => {
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
    data: data.map(mapActivityToShared),
    meta: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.ceil(total / query.limit),
    },
  };
};

export const getActivityBySlug = async (slug: string): Promise<SharedActivity> => {
  const activity = await prisma.activity.findUnique({ where: { slug } });

  if (!activity) {
    throw new AppError("Activite introuvable", 404);
  }

  return mapActivityToShared(activity);
};

export const getPublicActivityBySlug = async (slug: string): Promise<SharedActivity> => {
  const activity = await prisma.activity.findFirst({
    where: { slug, isPublished: true },
  });

  if (!activity) {
    throw new AppError("Activite introuvable", 404);
  }

  return mapActivityToShared(activity);
};

export const getActivityById = async (id: string): Promise<SharedActivity> => {
  const activity = await getActivityEntityById(id);
  return mapActivityToShared(activity);
};

export const listPublicActivities = async (
  query: ListActivitiesQuery,
): Promise<ListActivitiesResult> => {
  return listActivities({ ...query, published: "true" });
};

export const createActivity = async (
  input: CreateActivityInput,
  adminId?: string,
): Promise<SharedActivity> => {
  const slug = await generateUniqueSlug(input.title);
  const isPublished = Boolean(input.isPublished);

  const created = await prisma.activity.create({
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

  return mapActivityToShared(created);
};

export const updateActivity = async (
  id: string,
  input: UpdateActivityInput,
): Promise<SharedActivity> => {
  const existing = await getActivityEntityById(id);

  const slug =
    input.title && input.title !== existing.title
      ? await generateUniqueSlug(input.title, existing.id)
      : existing.slug;

  const nextIsPublished =
    input.isPublished !== undefined ? input.isPublished : existing.isPublished;

  const updated = await prisma.activity.update({
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

  return mapActivityToShared(updated);
};

export const deleteActivity = async (id: string) => {
  await getActivityEntityById(id);
  await prisma.activity.delete({ where: { id } });
};
