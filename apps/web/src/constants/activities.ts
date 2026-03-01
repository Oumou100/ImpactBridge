import type {
  ActivityItem,
  ActivityKpi,
  ActivityMilestone,
  ActivityProgram,
} from "@/types";

export const activitiesHeroImage =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&h=600&fit=crop";

export const activityKpis: ActivityKpi[] = [
  {
    label: "Missions realisees",
    value: "128",
    detail: "interventions terrain sur 12 mois",
  },
  {
    label: "Beneficiaires directs",
    value: "18 400+",
    detail: "femmes, jeunes et familles accompagnes",
  },
  {
    label: "Regions couvertes",
    value: "14",
    detail: "zones urbaines et periurbaines",
  },
];

export const activityPrograms: ActivityProgram[] = [
  {
    title: "Acces a l eau et hygiene",
    description:
      "Installation de points d eau securises et ateliers de sensibilisation aux bonnes pratiques sanitaires.",
    location: "Casablanca et Settat",
    date: "Fevrier 2026",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=900&fit=crop",
    beneficiaries: "2 300 beneficiaires",
  },
  {
    title: "Education numerique des jeunes",
    description:
      "Formation aux competences digitales et accompagnement vers l insertion professionnelle locale.",
    location: "Rabat et Sale",
    date: "Janvier 2026",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=900&fit=crop",
    beneficiaries: "540 jeunes formes",
  },
  {
    title: "Soutien alimentaire d urgence",
    description:
      "Distribution de paniers alimentaires et orientation des familles vers les dispositifs sociaux disponibles.",
    location: "Hay Salam, Casablanca",
    date: "Decembre 2025",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&h=900&fit=crop",
    beneficiaries: "1 120 foyers accompagnes",
  },
];

export const activityMilestones: ActivityMilestone[] = [
  {
    period: "T1 2026",
    title: "Programme Jeunesse Active",
    description:
      "Lancement de 6 cohortes de formation et mise en place d un parcours mentorat.",
  },
  {
    period: "T4 2025",
    title: "Extension des actions de proximite",
    description:
      "Ouverture de nouveaux points d intervention pour les quartiers sous-desservis.",
  },
  {
    period: "T3 2025",
    title: "Renforcement des partenariats locaux",
    description:
      "Co-construction de projets avec associations de quartier et acteurs institutionnels.",
  },
];

export const activityFeed: ActivityItem[] = [
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
