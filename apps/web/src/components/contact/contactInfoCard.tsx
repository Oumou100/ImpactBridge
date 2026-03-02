import type { ContactInfoIconKey, ContactInfoItem } from "@/types";

const iconMap: Record<ContactInfoIconKey, React.ReactNode> = {
  map: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 21s7-4.8 7-10a7 7 0 1 0-14 0c0 5.2 7 10 7 10Z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3 5.2 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.4 2.1L9 10.5a16 16 0 0 0 4.5 4.5l1.2-1.2a2 2 0 0 1 2.1-.4c.8.3 1.6.5 2.5.6A2 2 0 0 1 22 16.9Z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
};

type ContactInfoCardProps = {
  item: ContactInfoItem;
};

export const ContactInfoCard = ({ item }: ContactInfoCardProps) => {
  return (
    <article className="flex gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        {iconMap[item.icon]}
      </div>
      <div>
        <p className="text-sm font-bold text-foreground">{item.label}</p>
        <p className="whitespace-pre-line text-sm text-muted-foreground">{item.value}</p>
      </div>
    </article>
  );
};
