"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ROUTES } from "@/constants";
import { useAdminActivity, useAdminActivityMutations } from "@/hooks";
import type { AdminActivityFormInput } from "@/services/activities";
import { AdminActivityForm } from "./adminActivityForm";

type AdminActivityUpsertProps =
  | {
      mode: "create";
    }
  | {
      mode: "edit";
      id: string;
    };

export const AdminActivityUpsert = (props: AdminActivityUpsertProps) => {
  const router = useRouter();
  const isEditMode = props.mode === "edit";
  const [feedback, setFeedback] = useState<string | null>(null);
  const { createActivity, updateActivity, isCreating, isUpdating } = useAdminActivityMutations();

  const editQuery = useAdminActivity(isEditMode ? props.id : "");
  const activity = isEditMode ? editQuery.data : undefined;

  const pageTitle = useMemo(
    () => (isEditMode ? "Modifier l activite" : "Nouvelle activite"),
    [isEditMode],
  );
  const pageDescription = useMemo(
    () =>
      isEditMode
        ? activity?.title ?? "Mettez a jour les informations de cette activite."
        : "Renseignez les informations pour publier une nouvelle activite.",
    [activity?.title, isEditMode],
  );

  const handleSubmit = async (payload: AdminActivityFormInput) => {
    setFeedback(null);

    try {
      if (isEditMode) {
        await updateActivity({ id: props.id, payload });
      } else {
        await createActivity(payload);
      }
      router.replace(ROUTES.ADMIN_ACTIVITIES);
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Impossible d enregistrer l activite. Veuillez reessayer.",
      );
    }
  };

  if (isEditMode && editQuery.isLoading) {
    return (
      <div className="rounded-xl border border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
        Chargement de l activite...
      </div>
    );
  }

  if (isEditMode && (editQuery.isError || !activity)) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-6 py-12 text-center text-sm text-destructive">
        {editQuery.error instanceof Error
          ? editQuery.error.message
          : "Activite introuvable ou inaccessible."}
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">{pageTitle}</h1>
        <p className="text-sm text-muted-foreground">{pageDescription}</p>
      </header>

      {feedback ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {feedback}
        </p>
      ) : null}

      <AdminActivityForm
        initialValue={activity}
        isSubmitting={isEditMode ? isUpdating : isCreating}
        submitLabel={isEditMode ? "Mettre a jour" : "Creer l activite"}
        onSubmit={handleSubmit}
        onCancel={() => router.push(ROUTES.ADMIN_ACTIVITIES)}
      />
    </section>
  );
};
