import type { Metadata } from "next";
import { Services } from "@/containers";

export const metadata: Metadata = {
  title: "Services | ImpactBridge",
  description:
    "Decouvrez les services ImpactBridge : aide humanitaire, education, sante, eau potable, environnement et developpement communautaire.",
  alternates: {
    canonical: "https://impactbridge.org/services",
  },
  openGraph: {
    title: "Nos services | ImpactBridge",
    description:
      "Des interventions ciblees, mesurables et durables pour les communautes vulnerables.",
    url: "https://impactbridge.org/services",
    siteName: "ImpactBridge",
    locale: "fr_FR",
    type: "website",
  },
};

export default function ServicesPage() {
  return <Services />;
}
