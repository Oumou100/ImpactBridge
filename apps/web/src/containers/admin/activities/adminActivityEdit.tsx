"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminActivityForm } from "./adminActivityForm";
import { ROUTES } from "@/constants";
import { useAdminActivity, useAdminActivityMutations } from "@/hooks";
import type { AdminActivityFormInput } from "@/services/activities";

type AdminActivityEditProps = {
  id: string;
};

export const AdminActivityEdit = ({ id }: AdminActivityEditProps) => {
  const router = useRouter();
  const { data, isLoading, isError, error } = useAdminActivity(id);
  const { updateActivity, isUpdating } = useAdminActivityMutations();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (payload: AdminActivityFormInput) => {
    setFeedback(null);
    try {
      await updateActivity({ id, payload });
      router.replace(ROUTES.ADMIN_ACTIVITIES);
    } catch (submitError) {
      setFeedback(
        submitError instanceof Error
          ? submitError.message
          : "Impossible de mettre a jour l activite. Veuillez reessayer.",
      );
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
        Chargement de l activite...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-6 py-12 text-center text-sm text-destructive">
        {error instanceof Error ? error.message : "Activite introuvable ou inaccessible."}
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Modifier l activite</h1>
        <p className="text-sm text-muted-foreground">{data.title}</p>
      </header>

      {feedback ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {feedback}
        </p>
      ) : null}

      <AdminActivityForm
        initialValue={data}
        isSubmitting={isUpdating}
        submitLabel="Mettre a jour"
        onSubmit={handleSubmit}
        onCancel={() => router.push(ROUTES.ADMIN_ACTIVITIES)}
      />
    </section>
  );
};
