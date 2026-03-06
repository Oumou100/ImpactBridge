"use client";

import { useEffect, useMemo, useState } from "react";
import type { ContactMessageStatus } from "@impact-bridge/shared";
import { useAdminContacts, useAdminContactStatus } from "@/hooks";
import { ContactDetailPanel } from "./contactDetailPanel";
import { ContactsListPanel } from "./contactsListPanel";

const statusFilters: { value: "all" | ContactMessageStatus; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "NEW", label: "Nouveaux" },
  { value: "READ", label: "Lus" },
  { value: "ARCHIVED", label: "Archives" },
];

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
          <ContactsListPanel
            messages={filteredMessages}
            selectedId={selectedId}
            onSelect={(id, currentStatus) => void handleSelect(id, currentStatus)}
          />
          <ContactDetailPanel message={selectedMessage} isUpdating={isUpdating} onMarkAs={markAs} />
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
