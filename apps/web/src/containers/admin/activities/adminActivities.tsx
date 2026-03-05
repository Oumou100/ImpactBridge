"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useMemo, useState } from "react";
import { PublishBadge } from "@/components";
import { ROUTES } from "@/constants";
import { useAdminActivities, useAdminActivityMutations, type AdminActivityStatusFilter } from "@/hooks";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop";

const formatDate = (value?: string | null) => {
  if (!value) {
    return "-";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "-";
  }

  return parsed.toLocaleDateString("fr-FR");
};

export const AdminActivities = () => {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<AdminActivityStatusFilter>("all");
  const [page, setPage] = useState(1);
  const [feedback, setFeedback] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useAdminActivities({
    page,
    search,
    status,
  });
  const { deleteActivity, isDeleting } = useAdminActivityMutations();

  const items = data?.items ?? [];
  const meta = data?.meta;

  const canGoPrev = page > 1;
  const canGoNext = page < (meta?.totalPages ?? 1);

  const countLabel = useMemo(() => {
    const total = meta?.total ?? 0;
    return `${total} activite${total > 1 ? "s" : ""}`;
  }, [meta?.total]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleStatusChange = (nextStatus: AdminActivityStatusFilter) => {
    setStatus(nextStatus);
    setPage(1);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Confirmer la suppression de cette activite ?");
    if (!confirmed) {
      return;
    }

    setFeedback(null);
    try {
      await deleteActivity(id);
      setFeedback("Activite supprimee avec succes.");
    } catch (deleteError) {
      setFeedback(
        deleteError instanceof Error
          ? deleteError.message
          : "La suppression a echoue. Veuillez reessayer.",
      );
    }
  };

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Activites</h1>
          <p className="text-sm text-muted-foreground">{countLabel}</p>
        </div>
        <Link
          href={`${ROUTES.ADMIN_ACTIVITIES}/new`}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Nouvelle activite
        </Link>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={submitSearch} className="flex w-full max-w-sm gap-2">
          <input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Rechercher une activite..."
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
          />
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted"
          >
            Rechercher
          </button>
        </form>

        <div className="flex items-center gap-2">
          {(["all", "published", "draft"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => handleStatusChange(value)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                status === value
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {value === "all" ? "Toutes" : value === "published" ? "Publiees" : "Brouillons"}
            </button>
          ))}
        </div>
      </div>

      {feedback ? (
        <p className="rounded-lg border border-border bg-card px-3 py-2 text-sm">{feedback}</p>
      ) : null}

      {isLoading ? (
        <div className="rounded-xl border border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
          Chargement des activites...
        </div>
      ) : null}

      {isError ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-6 py-12 text-center text-sm text-destructive">
          {error instanceof Error
            ? error.message
            : "Impossible de recuperer les activites pour le moment."}
        </div>
      ) : null}

      {!isLoading && !isError && items.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Activite</th>
                  <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">
                    Lieu
                  </th>
                  <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground sm:table-cell">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Statut</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((activity) => (
                  <tr key={activity.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex min-w-[220px] items-center gap-3">
                        <div className="relative hidden h-9 w-9 overflow-hidden rounded-lg sm:block">
                          <Image
                            src={activity.coverImageUrl || DEFAULT_IMAGE}
                            alt={activity.title}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        </div>
                        <span className="line-clamp-1 font-medium text-foreground">{activity.title}</span>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                      {activity.location || "-"}
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                      {formatDate(activity.activityDate)}
                    </td>
                    <td className="px-4 py-3">
                      <PublishBadge isPublished={activity.isPublished} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`${ROUTES.ACTIVITIES}/${activity.slug}`}
                          className="inline-flex h-8 items-center justify-center rounded-md border border-border px-2 text-xs font-medium transition hover:bg-muted"
                        >
                          Voir
                        </Link>
                        <Link
                          href={`${ROUTES.ADMIN_ACTIVITIES}/${activity.id}/edit`}
                          className="inline-flex h-8 items-center justify-center rounded-md border border-border px-2 text-xs font-medium transition hover:bg-muted"
                        >
                          Editer
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(activity.id)}
                          disabled={isDeleting}
                          className="inline-flex h-8 items-center justify-center rounded-md border border-destructive/40 px-2 text-xs font-medium text-destructive transition hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
            <span>
              Page {meta?.page ?? 1} sur {meta?.totalPages ?? 1}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={!canGoPrev}
                className="inline-flex h-8 items-center justify-center rounded-md border border-border px-3 font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
              >
                Precedent
              </button>
              <button
                type="button"
                onClick={() => setPage((current) => current + 1)}
                disabled={!canGoNext}
                className="inline-flex h-8 items-center justify-center rounded-md border border-border px-3 font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {!isLoading && !isError && items.length === 0 ? (
        <div className="rounded-xl border border-border bg-card px-6 py-12 text-center">
          <h2 className="text-lg font-semibold">Aucune activite</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Creez votre premiere activite ou ajustez les filtres de recherche.
          </p>
          <div className="mt-5">
            <Link
              href={`${ROUTES.ADMIN_ACTIVITIES}/new`}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Creer une activite
            </Link>
          </div>
        </div>
      ) : null}
    </section>
  );
};
