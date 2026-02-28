import { Home } from "@/containers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ImpactBridge | ONG engagée pour un changement durable",
  description:
    "ImpactBridge est une ONG engagée dans le développement communautaire, l’éducation et l’autonomisation. Découvrez nos actions, projets et initiatives.",
  keywords: [
    "ONG",
    "ImpactBridge",
    "développement communautaire",
    "éducation",
    "solidarité",
    "projets humanitaires",
  ],
  authors: [{ name: "ImpactBridge" }],
  alternates: {
    canonical: "https://impactbridge.org",
  },
  openGraph: {
    title: "ImpactBridge | Construisons un avenir meilleur",
    description:
      "Découvrez les actions et projets de ImpactBridge pour un impact social durable.",
    url: "https://impactbridge.org",
    siteName: "ImpactBridge",
    locale: "fr_FR",
    type: "website",
  },
};

export default function Page() {
  return <Home />;
}