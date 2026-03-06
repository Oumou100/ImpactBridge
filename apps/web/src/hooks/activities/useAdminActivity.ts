"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAdminActivityById } from "@/services/activities";

export const useAdminActivity = (id: string) => {
  return useQuery({
    queryKey: ["activities", "admin", "detail", id],
    queryFn: () => fetchAdminActivityById(id),
    enabled: Boolean(id),
    staleTime: 30 * 1000,
  });
};
