type SectionHeadingProps = {
  label: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export const SectionHeading = ({
  label,
  title,
  description,
  align = "center",
}: SectionHeadingProps) => {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`mb-12 max-w-3xl ${alignment}`}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
        {label}
      </p>
      <h2 className="mb-4 text-3xl font-bold leading-tight text-foreground md:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
        {description}
      </p>
    </div>
  );
};
