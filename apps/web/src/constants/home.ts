import type { NavigationItem, ServiceItem, StatItem } from "@/types";

export const navItems: NavigationItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Activites", href: "/activites" },
  { label: "Contact", href: "/contact" },
];

export const impactStats: StatItem[] = [
  { value: "12 000+", label: "Beneficiaires accompagnes" },
  { value: "45", label: "Projets actifs" },
  { value: "300+", label: "Benevoles engages" },
  { value: "8", label: "Pays d intervention" },
];

export const ngoServices: ServiceItem[] = [
  {
    title: "Aide humanitaire",
    description:
      "Distribution de nourriture, eau et fournitures essentielles aux communautes vulnerables.",
    icon: "aid",
  },
  {
    title: "Education et formation",
    description:
      "Programmes de formation et accompagnement des jeunes vers l autonomie.",
    icon: "education",
  },
  {
    title: "Developpement communautaire",
    description:
      "Projets durables pour renforcer les capacites locales et creer de l emploi.",
    icon: "community",
  },
];

export const missionImage =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=1400&fit=crop";

export const heroImage =
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=2200&h=1400&fit=crop";
