"use client";

import { useState } from "react";
import { usePublicActivities } from "@/hooks";
import {
  ActivityEmptyState,
  ActivityFilters,
  ActivityListCard,
  ActivityPaginationControls,
  ActivitySearchBar,
} from "@/components";
import { ActivityListSkeleton } from "@/components/common";
import { PublicActivitiesHeroSection } from "./sections/publicActivitiesHeroSection";

const ITEMS_PER_PAGE = 6;

export const Activities = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");
  const [page, setPage] = useState(1);

  const { filteredItems, isLoading, isError } = usePublicActivities({ search, filter });

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <>
      <PublicActivitiesHeroSection />

      <section className="py-12 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <ActivityFilters
              activeFilter={filter}
              onChange={(nextFilter) => {
                setFilter(nextFilter);
                setPage(1);
              }}
            />
            <div className="w-full md:max-w-xs">
              <ActivitySearchBar
                value={search}
                onChange={(nextSearch) => {
                  setSearch(nextSearch);
                  setPage(1);
                }}
              />
            </div>
          </div>

          {isLoading ? (
            <ActivityListSkeleton />
          ) : null}

          {isError ? (
            <ActivityEmptyState
              title="Impossible de charger les activites"
              description="Une erreur est survenue lors de la recuperation des donnees. Veuillez reessayer."
            />
          ) : null}

          {!isLoading && !isError && paginatedItems.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedItems.map((activity) => (
                  <ActivityListCard key={activity.id} activity={activity} />
                ))}
              </div>
              <ActivityPaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          ) : null}

          {!isLoading && !isError && paginatedItems.length === 0 ? (
            <ActivityEmptyState
              title="Aucune activite trouvee"
              description="Essayez de modifier vos criteres de recherche ou vos filtres."
              actionLabel="Reinitialiser"
              onAction={() => {
                setSearch("");
                setFilter("all");
                setPage(1);
              }}
            />
          ) : null}
        </div>
      </section>
    </>
  );
};
