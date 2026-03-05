"use client";

import Image from "next/image";
import { type ChangeEvent, type FormEvent, useMemo, useState } from "react";
import type { Activity } from "@impact-bridge/shared";
import type { AdminActivityFormInput } from "@/services/activities";
import { uploadActivityImage } from "@/services/uploads";

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
  coverImagePublicId: activity?.coverImagePublicId ?? "",
  isPublished: Boolean(activity?.isPublished),
});

const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

export const AdminActivityForm = ({
  initialValue,
  isSubmitting,
  submitLabel,
  onSubmit,
  onCancel,
}: AdminActivityFormProps) => {
  const [form, setForm] = useState<AdminActivityFormInput>(() => getInitialForm(initialValue));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    event.target.value = "";

    if (!selectedFile) {
      return;
    }

    setErrorMessage(null);
    setUploadMessage(null);

    if (!ACCEPTED_MIME_TYPES.includes(selectedFile.type)) {
      setErrorMessage("Format invalide. Utilisez JPG, PNG ou WEBP.");
      return;
    }

    if (selectedFile.size > MAX_IMAGE_SIZE_BYTES) {
      setErrorMessage("Image trop volumineuse. Taille max: 5 MB.");
      return;
    }

    setIsUploading(true);
    try {
      const uploaded = await uploadActivityImage(selectedFile);
      setForm((previous) => ({
        ...previous,
        coverImageUrl: uploaded.url,
        coverImagePublicId: uploaded.publicId,
      }));
      setUploadMessage("Image telechargee avec succes.");
    } catch (uploadError) {
      setErrorMessage(
        uploadError instanceof Error
          ? uploadError.message
          : "Echec de l upload de l image. Veuillez reessayer.",
      );
    } finally {
      setIsUploading(false);
    }
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
        <p className="text-xs text-muted-foreground">
          Vous pouvez coller une URL ou envoyer une image ci-dessous.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="activity-cover-file" className="text-sm font-semibold">
          Upload image
        </label>
        <input
          id="activity-cover-file"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleUpload}
          disabled={isUploading || isSubmitting}
          className="block w-full text-sm file:mr-3 file:rounded-md file:border file:border-border file:bg-muted file:px-3 file:py-2 file:text-sm file:font-medium file:text-foreground hover:file:bg-muted/80"
        />
        <p className="text-xs text-muted-foreground">Formats: JPG, PNG, WEBP (max 5 MB).</p>
      </div>

      {form.coverImageUrl ? (
        <div className="space-y-2 rounded-lg border border-border p-3">
          <p className="text-xs font-medium text-muted-foreground">Apercu image</p>
          <div className="relative h-44 w-full overflow-hidden rounded-md sm:h-56">
            <Image
              src={form.coverImageUrl}
              alt="Apercu image de couverture"
              fill
              sizes="(max-width: 640px) 100vw, 672px"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}

      {uploadMessage ? (
        <p className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {uploadMessage}
        </p>
      ) : null}

      {isUploading ? (
        <p className="text-sm text-muted-foreground">Upload en cours...</p>
      ) : null}

      <div className="space-y-2">
        <label htmlFor="activity-cover-public-id" className="text-sm font-semibold">
          Public ID image
        </label>
        <input
          id="activity-cover-public-id"
          type="text"
          value={form.coverImagePublicId}
          onChange={(event) => updateField("coverImagePublicId", event.target.value)}
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
          placeholder="impactbridge/activities/..."
        />
        <p className="text-xs text-muted-foreground">
          Rempli automatiquement apres upload.
        </p>
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
          disabled={isSubmitting || isUploading}
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
