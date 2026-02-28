import type {
  ActivityItem,
  NavigationItem,
  ServiceItem,
  StatItem,
} from "@/types";

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

export const featuredActivities: ActivityItem[] = [
  {
    title: "Plantation communautaire a Dakar",
    description:
      "500 arbres plantes avec la communaute locale pour lutter contre la deforestation.",
    date: "15 Janvier 2026",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=800&fit=crop",
  },
  {
    title: "Distribution alimentaire a Lyon",
    description:
      "Aide directe a 200 familles dans le besoin avec des paniers alimentaires complets.",
    date: "28 Decembre 2025",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&h=800&fit=crop",
  },
  {
    title: "Formation professionnelle a Abidjan",
    description:
      "Programme de competences numeriques pour 50 jeunes entrepreneurs.",
    date: "10 Novembre 2025",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
  },
];



export const missionImage =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=1400&fit=crop";

export const heroImage =
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=2200&h=1400&fit=crop";
