import type { Activity, ApiResponse } from "@impact-bridge/shared";
import { apiClient } from "@/api";

type ActivitiesListApiResponse = ApiResponse<Activity[]>;
type ActivityDetailApiResponse = ApiResponse<Activity>;

export type PublicActivitiesQuery = {
  page?: number;
  limit?: number;
  search?: string;
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
    limit: toNumber(meta?.limit, 0),
    total: toNumber(meta?.total, 0),
    totalPages: toNumber(meta?.totalPages, 1),
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

export const fetchPublicActivityBySlug = async (slug: string): Promise<Activity> => {
  const response = await apiClient.get<ActivityDetailApiResponse>(`/activities/${slug}`);

  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.message || "Activite introuvable.");
  }

  return response.data.data;
};
