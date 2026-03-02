import type {
  ServiceImpactNumber,
  ServicePillar,
  ServiceProcessStep,
} from "@/types";

export const servicesHeroImage =
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1400&h=600&fit=crop";

export const servicePillars: ServicePillar[] = [
  {
    title: "Aide humanitaire",
    description:
      "Distribution de nourriture, eau et fournitures essentielles aux communautes touchees par des crises.",
    icon: "aid",
  },
  {
    title: "Education et formation",
    description:
      "Programmes scolaires, bourses et formations professionnelles pour les jeunes defavorises.",
    icon: "education",
  },
  {
    title: "Developpement communautaire",
    description:
      "Projets durables pour renforcer les infrastructures locales et autonomiser les populations.",
    icon: "community",
  },
  {
    title: "Acces a l eau potable",
    description:
      "Construction de puits et systemes de filtration pour un acces durable a l eau propre.",
    icon: "water",
  },
  {
    title: "Sante et prevention",
    description:
      "Consultations medicales, campagnes de vaccination et sensibilisation aux bonnes pratiques d hygiene.",
    icon: "health",
  },
  {
    title: "Environnement",
    description:
      "Reforestation, agriculture durable et protection des ecosystemes locaux.",
    icon: "environment",
  },
];

export const serviceProcessSteps: ServiceProcessStep[] = [
  {
    icon: "identify",
    title: "Identification",
    description:
      "Analyse des besoins reels sur le terrain en collaboration avec les communautes locales.",
  },
  {
    icon: "design",
    title: "Conception",
    description:
      "Creation de solutions adaptees, durables et culturellement coherentes.",
  },
  {
    icon: "deploy",
    title: "Mise en oeuvre",
    description:
      "Execution des projets avec les acteurs locaux pour maximiser l impact.",
  },
  {
    icon: "impact",
    title: "Suivi et impact",
    description:
      "Evaluation continue des resultats pour garantir transparence et efficacite.",
  },
];

export const serviceImpactNumbers: ServiceImpactNumber[] = [
  {
    value: "12 000+",
    label: "Beneficiaires directs",
    description: "Des vies transformees grace a nos programmes.",
  },
  {
    value: "95%",
    label: "Taux de satisfaction",
    description: "Mesure par les communautes beneficiaires.",
  },
  {
    value: "€2.4M",
    label: "Fonds mobilises",
    description: "Investis directement dans les projets terrain.",
  },
  {
    value: "85%",
    label: "Budget terrain",
    description: "De nos ressources vont aux actions concretes.",
  },
];
