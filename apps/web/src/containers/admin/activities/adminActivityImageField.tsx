"use client";

import Image from "next/image";
import { useState } from "react";
import { uploadActivityImage } from "@/services/uploads";

type AdminActivityImageFieldProps = {
  coverImageUrl: string;
  coverImagePublicId: string;
  disabled?: boolean;
  onChange: (value: { coverImageUrl: string; coverImagePublicId: string }) => void;
  onError: (message: string) => void;
};

const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

export const AdminActivityImageField = ({
  coverImageUrl,
  coverImagePublicId,
  disabled = false,
  onChange,
  onError,
}: AdminActivityImageFieldProps) => {
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    event.target.value = "";

    if (!selectedFile) {
      return;
    }

    setUploadMessage(null);

    if (!ACCEPTED_MIME_TYPES.includes(selectedFile.type)) {
      onError("Format invalide. Utilisez JPG, PNG ou WEBP.");
      return;
    }

    if (selectedFile.size > MAX_IMAGE_SIZE_BYTES) {
      onError("Image trop volumineuse. Taille max: 5 MB.");
      return;
    }

    setIsUploading(true);
    try {
      const uploaded = await uploadActivityImage(selectedFile);
      onChange({ coverImageUrl: uploaded.url, coverImagePublicId: uploaded.publicId });
      setUploadMessage("Image telechargee avec succes.");
    } catch (uploadError) {
      onError(
        uploadError instanceof Error
          ? uploadError.message
          : "Echec de l upload de l image. Veuillez reessayer.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="activity-cover" className="text-sm font-semibold">
          URL image de couverture
        </label>
        <input
          id="activity-cover"
          type="url"
          value={coverImageUrl}
          onChange={(event) =>
            onChange({
              coverImageUrl: event.target.value,
              coverImagePublicId,
            })
          }
          disabled={disabled || isUploading}
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
          disabled={disabled || isUploading}
          className="block w-full text-sm file:mr-3 file:rounded-md file:border file:border-border file:bg-muted file:px-3 file:py-2 file:text-sm file:font-medium file:text-foreground hover:file:bg-muted/80"
        />
        <p className="text-xs text-muted-foreground">Formats: JPG, PNG, WEBP (max 5 MB).</p>
      </div>

      {coverImageUrl ? (
        <div className="space-y-2 rounded-lg border border-border p-3">
          <p className="text-xs font-medium text-muted-foreground">Apercu image</p>
          <div className="relative h-44 w-full overflow-hidden rounded-md sm:h-56">
            <Image
              src={coverImageUrl}
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
          value={coverImagePublicId}
          onChange={(event) =>
            onChange({
              coverImageUrl,
              coverImagePublicId: event.target.value,
            })
          }
          disabled={disabled || isUploading}
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
          placeholder="impactbridge/activities/..."
        />
        <p className="text-xs text-muted-foreground">Rempli automatiquement apres upload.</p>
      </div>
    </div>
  );
};
