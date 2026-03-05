"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Activity } from "@impact-bridge/shared";
import { fetchPublicActivities } from "@/services/activities";

export type ActivityFilterValue = "all" | "upcoming" | "past";

const FETCH_LIMIT = 50;

const byDateDesc = (left: Activity, right: Activity) => {
  const leftTs = left.activityDate ? new Date(left.activityDate).getTime() : 0;
  const rightTs = right.activityDate ? new Date(right.activityDate).getTime() : 0;
  return rightTs - leftTs;
};

export const usePublicActivities = (params: {
  search: string;
  filter: ActivityFilterValue;
}) => {
  const query = useQuery({
    queryKey: ["activities", "public", { search: params.search.trim() }],
    queryFn: () =>
      fetchPublicActivities({
        page: 1,
        limit: FETCH_LIMIT,
        search: params.search.trim() || undefined,
      }),
    staleTime: 60 * 1000,
  });

  const filteredItems = useMemo(() => {
    const now = Date.now();
    const items = query.data?.items ?? [];

    return items
      .filter((item) => {
        if (params.filter === "all") {
          return true;
        }

        if (!item.activityDate) {
          return false;
        }

        const activityTs = new Date(item.activityDate).getTime();
        return params.filter === "upcoming" ? activityTs >= now : activityTs < now;
      })
      .sort(byDateDesc);
  }, [params.filter, query.data?.items]);

  return {
    ...query,
    filteredItems,
  };
};
