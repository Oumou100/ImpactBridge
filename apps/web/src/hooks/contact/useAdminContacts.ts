"use client";

import type { ContactMessageStatus } from "@impact-bridge/shared";
import { useQuery } from "@tanstack/react-query";
import { fetchAdminContacts } from "@/services/contact";

type UseAdminContactsParams = {
  page: number;
  status?: ContactMessageStatus;
  limit?: number;
};

export const useAdminContacts = (params: UseAdminContactsParams) => {
  return useQuery({
    queryKey: ["contacts", "admin", params],
    queryFn: () =>
      fetchAdminContacts({
        page: params.page,
        limit: params.limit ?? 10,
        status: params.status,
      }),
    staleTime: 30 * 1000,
  });
};
