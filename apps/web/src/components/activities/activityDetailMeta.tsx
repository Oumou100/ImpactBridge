type ActivityDetailMetaProps = {
  activityDate?: string | null;
  location?: string | null;
};

const formatDate = (value?: string | null) => {
  if (!value) return null;
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const ActivityDetailMeta = ({ activityDate, location }: ActivityDetailMetaProps) => {
  const formattedDate = formatDate(activityDate);

  return (
    <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
      {formattedDate ? <span>{formattedDate}</span> : null}
      {location ? <span>{location}</span> : null}
    </div>
  );
};
