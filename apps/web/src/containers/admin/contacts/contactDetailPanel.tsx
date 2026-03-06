"use client";

import type { ContactMessage, ContactMessageStatus } from "@impact-bridge/shared";
import { StatusBadge } from "@/components";
import { MailIcon } from "./contactIcons";

type ContactDetailPanelProps = {
  message: ContactMessage | null;
  isUpdating: boolean;
  onMarkAs: (id: string, status: ContactMessageStatus) => Promise<void>;
};

export const ContactDetailPanel = ({ message, isUpdating, onMarkAs }: ContactDetailPanelProps) => {
  if (!message) {
    return (
      <section className="rounded-xl border border-border bg-card p-6 lg:col-span-3">
        <div className="flex h-full min-h-[280px] items-center justify-center text-center">
          <div>
            <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground/50">
              <MailIcon />
            </div>
            <p className="text-sm text-muted-foreground">Selectionnez un message pour le lire</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-border bg-card p-6 lg:col-span-3">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">{message.subject}</h2>
          <p className="text-sm text-muted-foreground">
            De <span className="font-medium text-foreground">{message.name}</span> · {message.email}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {new Date(message.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <StatusBadge status={message.status} />
      </div>

      <div className="mb-8 rounded-lg bg-muted/50 p-5">
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{message.message}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {message.status !== "READ" ? (
          <button
            type="button"
            onClick={() => void onMarkAs(message.id, "READ")}
            disabled={isUpdating}
            className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-xs font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
          >
            Marquer comme lu
          </button>
        ) : null}
        {message.status !== "ARCHIVED" ? (
          <button
            type="button"
            onClick={() => void onMarkAs(message.id, "ARCHIVED")}
            disabled={isUpdating}
            className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-xs font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
          >
            Archiver
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => {
            window.location.href = `mailto:${message.email}?subject=${encodeURIComponent(
              `Re: ${message.subject}`,
            )}`;
          }}
          className="inline-flex h-9 items-center gap-1 rounded-lg border border-border px-3 text-xs font-medium transition hover:bg-muted"
        >
          <MailIcon />
          Repondre
        </button>
      </div>
    </section>
  );
};
