import type { ServicePillar, ServicePillarIconKey } from "@/types";

const iconMap: Record<ServicePillarIconKey, React.ReactNode> = {
  aid: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 20s-7-4.35-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 15.65 12 20 12 20Z" />
    </svg>
  ),
  education: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m3 9 9-4 9 4-9 4-9-4Z" />
      <path d="M7 11.5V16c0 1.7 2.2 3 5 3s5-1.3 5-3v-4.5" />
    </svg>
  ),
  community: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="8" cy="9" r="2.5" />
      <circle cx="16" cy="9" r="2.5" />
      <path d="M3.5 19c.6-2.4 2.4-3.6 4.5-3.6 2.2 0 3.9 1.2 4.5 3.6" />
      <path d="M11.5 19c.6-2.4 2.4-3.6 4.5-3.6 2.2 0 3.9 1.2 4.5 3.6" />
    </svg>
  ),
  water: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3c0 0-5 5.2-5 8.6A5 5 0 0 0 12 16.6a5 5 0 0 0 5-5C17 8.2 12 3 12 3Z" />
      <path d="M9 18c.9.7 1.9 1 3 1s2.1-.3 3-1" />
    </svg>
  ),
  health: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 4v16" />
      <path d="M4 12h16" />
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  ),
  environment: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 14c5.5 0 10-4.5 10-10 4.5 0 8 3.5 8 8 0 6.1-4.9 11-11 11-4.5 0-8-3.5-8-8 0-.3 0-.7.1-1" />
      <path d="M9 15c1.7-1.2 3-3 3.7-5.1" />
    </svg>
  ),
};

type ServicePillarCardProps = {
  item: ServicePillar;
};

export const ServicePillarCard = ({ item }: ServicePillarCardProps) => {
  return (
    <article className="group rounded-2xl border border-border bg-card p-8 card-shadow transition-all duration-500 hover:-translate-y-1 hover:card-shadow-hover">
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        {iconMap[item.icon]}
      </div>
      <h3 className="mb-3 text-xl font-bold text-foreground">{item.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
    </article>
  );
};
