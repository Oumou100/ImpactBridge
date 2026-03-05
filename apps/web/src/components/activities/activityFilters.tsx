import type { ActivityFilterValue } from "@/hooks/activities";

type ActivityFiltersProps = {
  activeFilter: ActivityFilterValue;
  onChange: (next: ActivityFilterValue) => void;
};

const FILTERS: { value: ActivityFilterValue; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "upcoming", label: "A venir" },
  { value: "past", label: "Passees" },
];

export const ActivityFilters = ({ activeFilter, onChange }: ActivityFiltersProps) => {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-card p-1">
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter.value;
        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};
