"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ContactMessage, ContactMessageStatus } from "@impact-bridge/shared";
import { updateAdminContactStatus } from "@/services/contact";

export const useAdminContactStatus = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContactMessageStatus }) =>
      updateAdminContactStatus(id, status),
    onSuccess: async (updated) => {
      await queryClient.invalidateQueries({ queryKey: ["contacts", "admin"] });
      queryClient.setQueryData<ContactMessage>(["contacts", "admin", "detail", updated.id], updated);
    },
  });

  return {
    updateStatus: mutation.mutateAsync,
    isUpdating: mutation.isPending,
  };
};
