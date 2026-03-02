import type { ProcessStepIconKey, ServiceProcessStep } from "@/types";

const stepIconMap: Record<ProcessStepIconKey, React.ReactNode> = {
  identify: (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="7" />
      <path d="M12 9v6" />
      <path d="M9 12h6" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 18h6" />
      <path d="M10 14h4" />
      <path d="M12 3c-2.8 0-5 2.2-5 5 0 1.8.9 3.4 2.3 4.3.5.3.7.8.7 1.3V14h4v-.4c0-.5.2-1 .7-1.3C17.1 11.4 18 9.8 18 8c0-2.8-2.2-5-6-5Z" />
    </svg>
  ),
  deploy: (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 12h18" />
      <path d="m13 6 6 6-6 6" />
      <path d="M3 6h6" />
      <path d="M3 18h6" />
    </svg>
  ),
  impact: (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 7 10 17l-5-5" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
};

type ProcessStepCardProps = {
  item: ServiceProcessStep;
  index: number;
};

export const ProcessStepCard = ({ item, index }: ProcessStepCardProps) => {
  return (
    <article className="relative text-center">
      <div className="relative z-10 mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-border bg-card text-primary card-shadow">
        {stepIconMap[item.icon]}
        <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
          {index + 1}
        </span>
      </div>
      <h3 className="mb-2 text-lg font-bold text-foreground">{item.title}</h3>
      <p className="mx-auto max-w-[220px] text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
    </article>
  );
};
