type ActivitySearchBarProps = {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
};

export const ActivitySearchBar = ({
  value,
  onChange,
  placeholder = "Rechercher une activite...",
}: ActivitySearchBarProps) => {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type="search"
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none ring-primary/30 transition placeholder:text-muted-foreground focus:ring-2"
      />
    </div>
  );
};
