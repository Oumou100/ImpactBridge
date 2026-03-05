"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Activity } from "@impact-bridge/shared";
import {
  createAdminActivity,
  deleteAdminActivity,
  type AdminActivityFormInput,
  updateAdminActivity,
} from "@/services/activities";

export const useAdminActivityMutations = () => {
  const queryClient = useQueryClient();

  const invalidateActivities = async () => {
    await queryClient.invalidateQueries({ queryKey: ["activities", "admin"] });
    await queryClient.invalidateQueries({ queryKey: ["activities", "public"] });
  };

  const createMutation = useMutation({
    mutationFn: (payload: AdminActivityFormInput) => createAdminActivity(payload),
    onSuccess: async (created) => {
      await invalidateActivities();
      queryClient.setQueryData<Activity>(["activities", "admin", "detail", created.id], created);
      queryClient.setQueryData<Activity>(
        ["activities", "public", "detail", created.slug],
        created,
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: AdminActivityFormInput }) =>
      updateAdminActivity(id, payload),
    onSuccess: async (updated) => {
      await invalidateActivities();
      queryClient.setQueryData<Activity>(["activities", "admin", "detail", updated.id], updated);
      queryClient.setQueryData<Activity>(
        ["activities", "public", "detail", updated.slug],
        updated,
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAdminActivity(id),
    onSuccess: async () => {
      await invalidateActivities();
    },
  });

  return {
    createActivity: createMutation.mutateAsync,
    updateActivity: updateMutation.mutateAsync,
    deleteActivity: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
