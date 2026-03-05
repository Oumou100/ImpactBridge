"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPublicActivityBySlug } from "@/services/activities";

export const usePublicActivityDetail = (slug: string) => {
  return useQuery({
    queryKey: ["activities", "public", "detail", slug],
    queryFn: () => fetchPublicActivityBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 60 * 1000,
  });
};
