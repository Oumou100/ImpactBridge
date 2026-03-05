type PublishBadgeProps = {
  isPublished: boolean;
};

export const PublishBadge = ({ isPublished }: PublishBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
        isPublished
          ? "border-secondary/30 bg-secondary/15 text-secondary"
          : "border-border bg-muted text-muted-foreground"
      }`}
    >
      {isPublished ? "Publie" : "Brouillon"}
    </span>
  );
};
