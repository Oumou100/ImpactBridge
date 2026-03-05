"use client";

import { useEffect, useMemo, useState } from "react";
import type { ContactMessageStatus } from "@impact-bridge/shared";
import { StatusBadge } from "@/components";
import { useAdminContacts, useAdminContactStatus } from "@/hooks";

const statusFilters: { value: "all" | ContactMessageStatus; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "NEW", label: "Nouveaux" },
  { value: "READ", label: "Lus" },
  { value: "ARCHIVED", label: "Archives" },
];

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 6h16v12H4z" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v6l4 2" />
  </svg>
);

export const AdminContacts = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | ContactMessageStatus>("all");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useAdminContacts({
    page,
    status: status === "all" ? undefined : status,
    limit: 20,
  });
  const { updateStatus, isUpdating } = useAdminContactStatus();

  const messages = data?.items ?? [];
  const filteredMessages = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) {
      return messages;
    }

    return messages.filter((message) => {
      return (
        message.name.toLowerCase().includes(normalizedSearch) ||
        message.email.toLowerCase().includes(normalizedSearch) ||
        message.subject.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [messages, search]);

  const selectedMessage = useMemo(
    () => filteredMessages.find((message) => message.id === selectedId) ?? null,
    [filteredMessages, selectedId],
  );

  useEffect(() => {
    if (filteredMessages.length === 0) {
      setSelectedId(null);
      return;
    }

    if (!selectedId || !filteredMessages.some((message) => message.id === selectedId)) {
      setSelectedId(filteredMessages[0]?.id ?? null);
    }
  }, [filteredMessages, selectedId]);

  const markAs = async (id: string, nextStatus: ContactMessageStatus) => {
    setFeedback(null);
    try {
      await updateStatus({ id, status: nextStatus });
      setFeedback(nextStatus === "READ" ? "Message marque comme lu." : "Message archive.");
    } catch (statusError) {
      setFeedback(
        statusError instanceof Error
          ? statusError.message
          : "Impossible de mettre a jour le statut du message.",
      );
    }
  };

  const handleSelect = async (id: string, currentStatus: ContactMessageStatus) => {
    setSelectedId(id);
    if (currentStatus === "NEW") {
      await markAs(id, "READ");
    }
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-sm text-muted-foreground">
          {filteredMessages.length} message{filteredMessages.length > 1 ? "s" : ""}
        </p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Rechercher un message..."
          className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none ring-primary/30 transition focus:ring-2 sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => {
                setStatus(filter.value);
                setPage(1);
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                status === filter.value
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {feedback ? (
        <p className="rounded-lg border border-border bg-card px-3 py-2 text-sm">{feedback}</p>
      ) : null}

      {isLoading ? (
        <div className="rounded-xl border border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
          Chargement des messages...
        </div>
      ) : null}

      {isError ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-6 py-12 text-center text-sm text-destructive">
          {error instanceof Error ? error.message : "Impossible de charger les messages."}
        </div>
      ) : null}

      {!isLoading && !isError ? (
        <div className="grid gap-6 lg:grid-cols-5">
          <section className="overflow-hidden rounded-xl border border-border bg-card lg:col-span-2">
            {filteredMessages.length > 0 ? (
              <div className="max-h-[620px] divide-y divide-border overflow-y-auto">
                {filteredMessages.map((message) => (
                  <button
                    key={message.id}
                    type="button"
                    onClick={() => void handleSelect(message.id, message.status)}
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

          <section className="rounded-xl border border-border bg-card p-6 lg:col-span-3">
            {selectedMessage ? (
              <div>
                <div className="mb-6 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold">{selectedMessage.subject}</h2>
                    <p className="text-sm text-muted-foreground">
                      De <span className="font-medium text-foreground">{selectedMessage.name}</span>
                      {" · "}
                      {selectedMessage.email}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(selectedMessage.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <StatusBadge status={selectedMessage.status} />
                </div>

                <div className="mb-8 rounded-lg bg-muted/50 p-5">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedMessage.status !== "READ" ? (
                    <button
                      type="button"
                      onClick={() => void markAs(selectedMessage.id, "READ")}
                      disabled={isUpdating}
                      className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-xs font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Marquer comme lu
                    </button>
                  ) : null}
                  {selectedMessage.status !== "ARCHIVED" ? (
                    <button
                      type="button"
                      onClick={() => void markAs(selectedMessage.id, "ARCHIVED")}
                      disabled={isUpdating}
                      className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-xs font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Archiver
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = `mailto:${selectedMessage.email}?subject=${encodeURIComponent(
                        `Re: ${selectedMessage.subject}`,
                      )}`;
                    }}
                    className="inline-flex h-9 items-center gap-1 rounded-lg border border-border px-3 text-xs font-medium transition hover:bg-muted"
                  >
                    <MailIcon />
                    Repondre
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[280px] items-center justify-center text-center">
                <div>
                  <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground/50">
                    <MailIcon />
                  </div>
                  <p className="text-sm text-muted-foreground">Selectionnez un message pour le lire</p>
                </div>
              </div>
            )}
          </section>
        </div>
      ) : null}

      {!isLoading && !isError ? (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Page {data?.meta.page ?? 1} sur {data?.meta.totalPages ?? 1}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={(data?.meta.page ?? 1) <= 1}
              className="inline-flex h-8 items-center justify-center rounded-md border border-border px-3 font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
            >
              Precedent
            </button>
            <button
              type="button"
              onClick={() => setPage((current) => current + 1)}
              disabled={(data?.meta.page ?? 1) >= (data?.meta.totalPages ?? 1)}
              className="inline-flex h-8 items-center justify-center rounded-md border border-border px-3 font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
            >
              Suivant
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
};
