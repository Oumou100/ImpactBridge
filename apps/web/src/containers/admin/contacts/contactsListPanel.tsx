"use client";

import type { ContactMessage } from "@impact-bridge/shared";
import { StatusBadge } from "@/components";
import { ClockIcon } from "./contactIcons";

type ContactsListPanelProps = {
  messages: ContactMessage[];
  selectedId: string | null;
  onSelect: (id: string, status: ContactMessage["status"]) => void;
};

export const ContactsListPanel = ({ messages, selectedId, onSelect }: ContactsListPanelProps) => {
  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card lg:col-span-2">
      {messages.length > 0 ? (
        <div className="max-h-[620px] divide-y divide-border overflow-y-auto">
          {messages.map((message) => (
            <button
              key={message.id}
              type="button"
              onClick={() => onSelect(message.id, message.status)}
              className={`w-full p-4 text-left transition hover:bg-muted/50 ${
                selectedId === message.id ? "border-l-2 border-l-primary bg-primary/5" : ""
              }`}
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className={`text-sm ${message.status === "NEW" ? "font-bold" : "font-medium"}`}>
                  {message.name}
                </span>
                <StatusBadge status={message.status} />
              </div>
              <p className="truncate text-xs font-medium text-foreground">{message.subject}</p>
              <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{message.message}</p>
              <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground/60">
                <ClockIcon />
                {new Date(message.createdAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div className="px-6 py-12 text-center text-sm text-muted-foreground">
          Aucun message ne correspond a vos filtres.
        </div>
      )}
    </section>
  );
};
