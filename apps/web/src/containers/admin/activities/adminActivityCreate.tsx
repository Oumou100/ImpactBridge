"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminActivityForm } from "./adminActivityForm";
import { ROUTES } from "@/constants";
import { useAdminActivityMutations } from "@/hooks";
import type { AdminActivityFormInput } from "@/services/activities";

export const AdminActivityCreate = () => {
  const router = useRouter();
  const { createActivity, isCreating } = useAdminActivityMutations();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async (payload: AdminActivityFormInput) => {
    setFeedback(null);

    try {
      await createActivity(payload);
      router.replace(ROUTES.ADMIN_ACTIVITIES);
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Impossible de creer l activite. Veuillez reessayer.",
      );
    }
  };

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Nouvelle activite</h1>
        <p className="text-sm text-muted-foreground">
          Renseignez les informations pour publier une nouvelle activite.
        </p>
      </header>

      {feedback ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {feedback}
        </p>
      ) : null}

      <AdminActivityForm
        isSubmitting={isCreating}
        submitLabel="Creer l activite"
        onSubmit={handleSubmit}
        onCancel={() => router.push(ROUTES.ADMIN_ACTIVITIES)}
      />
    </section>
  );
};
