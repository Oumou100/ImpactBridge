import type { Metadata } from "next";
import { Contact } from "@/containers";

export const metadata: Metadata = {
  title: "Contact | ImpactBridge",
  description:
    "Contactez ImpactBridge pour un partenariat, une question ou une proposition de collaboration.",
  alternates: {
    canonical: "https://impactbridge.org/contact",
  },
  openGraph: {
    title: "Contactez-nous | ImpactBridge",
    description:
      "Notre equipe est disponible pour repondre a vos questions et demandes de collaboration.",
    url: "https://impactbridge.org/contact",
    siteName: "ImpactBridge",
    locale: "fr_FR",
    type: "website",
  },
};

export default function ContactPage() {
  return <Contact />;
}
