import type { Metadata } from "next";
import { Activities } from "@/containers";

export const metadata: Metadata = {
  title: "Activites | ImpactBridge",
  description:
    "Decouvrez les activites terrain de ImpactBridge, nos programmes en cours et les resultats de nos interventions communautaires.",
  alternates: {
    canonical: "https://impactbridge.org/activites",
  },
  openGraph: {
    title: "Activites terrain | ImpactBridge",
    description:
      "Un suivi transparent des actions ImpactBridge et de leur impact social.",
    url: "https://impactbridge.org/activites",
    siteName: "ImpactBridge",
    locale: "fr_FR",
    type: "website",
  },
};

export default function ActivitiesPage() {
  return <Activities />;
}
