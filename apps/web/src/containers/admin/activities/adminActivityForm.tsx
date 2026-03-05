"use client";

import { type FormEvent, useMemo, useState } from "react";
import type { Activity } from "@impact-bridge/shared";
import type { AdminActivityFormInput } from "@/services/activities";

type AdminActivityFormProps = {
  initialValue?: Activity;
  isSubmitting: boolean;
  submitLabel: string;
  onSubmit: (payload: AdminActivityFormInput) => Promise<void>;
  onCancel: () => void;
};

const toDateInputValue = (value?: string | null) => {
  if (!value) {
    return "";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return parsed.toISOString().slice(0, 10);
};

const getInitialForm = (activity?: Activity): AdminActivityFormInput => ({
  title: activity?.title ?? "",
  description: activity?.description ?? "",
  content: activity?.content ?? "",
  location: activity?.location ?? "",
  activityDate: toDateInputValue(activity?.activityDate),
  coverImageUrl: activity?.coverImageUrl ?? "",
  isPublished: Boolean(activity?.isPublished),
});

export const AdminActivityForm = ({
  initialValue,
  isSubmitting,
  submitLabel,
  onSubmit,
  onCancel,
}: AdminActivityFormProps) => {
  const [form, setForm] = useState<AdminActivityFormInput>(() => getInitialForm(initialValue));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const titleCount = useMemo(() => form.title.trim().length, [form.title]);
  const descriptionCount = useMemo(() => form.description.trim().length, [form.description]);

  const updateField = <K extends keyof AdminActivityFormInput>(
    key: K,
    value: AdminActivityFormInput[K],
  ) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!form.title.trim() || !form.description.trim()) {
      setErrorMessage("Le titre et la description sont obligatoires.");
      return;
    }

    if (form.title.trim().length < 3) {
      setErrorMessage("Le titre doit contenir au moins 3 caracteres.");
      return;
    }

    if (form.description.trim().length < 10) {
      setErrorMessage("La description doit contenir au moins 10 caracteres.");
      return;
    }

    await onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-3xl space-y-6 rounded-xl border border-border bg-card p-6"
      noValidate
    >
      <div className="space-y-2">
        <label htmlFor="activity-title" className="text-sm font-semibold">
          Titre
        </label>
        <input
          id="activity-title"
          type="text"
          value={form.title}
          onChange={(event) => updateField("title", event.target.value)}
          maxLength={150}
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
          placeholder="Ex: Plantation communautaire a Niamey"
        />
        <p className="text-xs text-muted-foreground">{titleCount}/150</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="activity-description" className="text-sm font-semibold">
          Description
        </label>
        <textarea
          id="activity-description"
          rows={3}
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          maxLength={1000}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/30 transition focus:ring-2"
          placeholder="Resume court de l activite..."
        />
        <p className="text-xs text-muted-foreground">{descriptionCount}/1000</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="activity-content" className="text-sm font-semibold">
          Contenu detaille
        </label>
        <textarea
          id="activity-content"
          rows={8}
          value={form.content}
          onChange={(event) => updateField("content", event.target.value)}
          maxLength={10000}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/30 transition focus:ring-2"
          placeholder="Description complete..."
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="activity-location" className="text-sm font-semibold">
            Lieu
          </label>
          <input
            id="activity-location"
            type="text"
            value={form.location}
            onChange={(event) => updateField("location", event.target.value)}
            maxLength={255}
            className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
            placeholder="Casablanca, Maroc"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="activity-date" className="text-sm font-semibold">
            Date de l activite
          </label>
          <input
            id="activity-date"
            type="date"
            value={form.activityDate}
            onChange={(event) => updateField("activityDate", event.target.value)}
            className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="activity-cover" className="text-sm font-semibold">
          URL image de couverture
        </label>
        <input
          id="activity-cover"
          type="url"
          value={form.coverImageUrl}
          onChange={(event) => updateField("coverImageUrl", event.target.value)}
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
          placeholder="https://..."
        />
      </div>

      <label className="flex items-center gap-3 rounded-lg border border-border p-4">
        <input
          type="checkbox"
          checked={form.isPublished}
          onChange={(event) => updateField("isPublished", event.target.checked)}
          className="h-4 w-4 rounded border-border"
        />
        <span className="text-sm font-medium">
          Publier immediatement
          <span className="block text-xs font-normal text-muted-foreground">
            L activite sera visible sur le site public.
          </span>
        </span>
      </label>

      {errorMessage ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {errorMessage}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Enregistrement..." : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-semibold transition hover:bg-muted"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};
