import type { Activity, ApiResponse } from "@impact-bridge/shared";
import { apiClient } from "@/api";

type ActivitiesListApiResponse = ApiResponse<Activity[]>;
type ActivityDetailApiResponse = ApiResponse<Activity>;

export type PublicActivitiesQuery = {
  page?: number;
  limit?: number;
  search?: string;
};

export type AdminActivitiesQuery = PublicActivitiesQuery & {
  published?: boolean;
};

export type AdminActivityFormInput = {
  title: string;
  description: string;
  content: string;
  location: string;
  activityDate: string;
  coverImageUrl: string;
  isPublished: boolean;
};

export type ActivitiesListResult = {
  items: Activity[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

const normalizeListMeta = (meta?: Record<string, unknown>) => {
  const toNumber = (value: unknown, fallback: number) =>
    typeof value === "number" && Number.isFinite(value) ? value : fallback;

  return {
    page: toNumber(meta?.page, 1),
    limit: toNumber(meta?.limit, 10),
    total: toNumber(meta?.total, 0),
    totalPages: toNumber(meta?.totalPages, 1),
  };
};

const mapFormToApiPayload = (form: AdminActivityFormInput) => {
  const activityDateIso = form.activityDate
    ? new Date(`${form.activityDate}T00:00:00.000Z`).toISOString()
    : null;

  return {
    title: form.title.trim(),
    description: form.description.trim(),
    content: form.content.trim() || null,
    location: form.location.trim() || null,
    activityDate: activityDateIso,
    coverImageUrl: form.coverImageUrl.trim() || null,
    isPublished: form.isPublished,
  };
};

export const fetchPublicActivities = async (
  query: PublicActivitiesQuery = {},
): Promise<ActivitiesListResult> => {
  const response = await apiClient.get<ActivitiesListApiResponse>("/activities", {
    params: {
      page: query.page ?? 1,
      limit: query.limit ?? 50,
      ...(query.search ? { search: query.search } : {}),
    },
  });

  if (!response.data.success) {
    throw new Error(response.data.message || "Impossible de recuperer les activites.");
  }

  return {
    items: response.data.data ?? [],
    meta: normalizeListMeta(response.data.meta),
  };
};

export const fetchAdminActivities = async (
  query: AdminActivitiesQuery = {},
): Promise<ActivitiesListResult> => {
  const response = await apiClient.get<ActivitiesListApiResponse>("/admin/activities", {
    params: {
      page: query.page ?? 1,
      limit: query.limit ?? 10,
      ...(query.search ? { search: query.search } : {}),
      ...(query.published !== undefined ? { published: String(query.published) } : {}),
    },
  });

  if (!response.data.success) {
    throw new Error(response.data.message || "Impossible de recuperer les activites admin.");
  }

  return {
    items: response.data.data ?? [],
    meta: normalizeListMeta(response.data.meta),
  };
};

export const fetchPublicActivityBySlug = async (slug: string): Promise<Activity> => {
  const response = await apiClient.get<ActivityDetailApiResponse>(`/activities/${slug}`);

  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.message || "Activite introuvable.");
  }

  return response.data.data;
};

export const fetchAdminActivityById = async (id: string): Promise<Activity> => {
  const response = await apiClient.get<ActivityDetailApiResponse>(`/admin/activities/${id}`);

  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.message || "Activite introuvable.");
  }

  return response.data.data;
};

export const createAdminActivity = async (
  payload: AdminActivityFormInput,
): Promise<Activity> => {
  const response = await apiClient.post<ActivityDetailApiResponse>(
    "/admin/activities",
    mapFormToApiPayload(payload),
  );

  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.message || "Impossible de creer l activite.");
  }

  return response.data.data;
};

export const updateAdminActivity = async (
  id: string,
  payload: AdminActivityFormInput,
): Promise<Activity> => {
  const response = await apiClient.patch<ActivityDetailApiResponse>(
    `/admin/activities/${id}`,
    mapFormToApiPayload(payload),
  );

  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.message || "Impossible de mettre a jour l activite.");
  }

  return response.data.data;
};

export const deleteAdminActivity = async (id: string): Promise<void> => {
  await apiClient.delete(`/admin/activities/${id}`);
};
