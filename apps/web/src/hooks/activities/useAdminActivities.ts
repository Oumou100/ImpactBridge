"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAdminActivities } from "@/services/activities";

export type AdminActivityStatusFilter = "all" | "published" | "draft";

type UseAdminActivitiesParams = {
  page: number;
  limit?: number;
  search: string;
  status: AdminActivityStatusFilter;
};

const toPublishedParam = (status: AdminActivityStatusFilter) => {
  if (status === "published") {
    return true;
  }

  if (status === "draft") {
    return false;
  }

  return undefined;
};

export const useAdminActivities = (params: UseAdminActivitiesParams) => {
  return useQuery({
    queryKey: ["activities", "admin", params],
    queryFn: () =>
      fetchAdminActivities({
        page: params.page,
        limit: params.limit ?? 10,
        search: params.search.trim() || undefined,
        published: toPublishedParam(params.status),
      }),
    staleTime: 30 * 1000,
  });
};
