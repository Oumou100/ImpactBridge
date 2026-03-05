import type { Metadata } from "next";
import { AdminLogin } from "@/containers";

export const metadata: Metadata = {
  title: "Connexion Admin | ImpactBridge",
  description: "Connectez-vous a l espace d administration ImpactBridge.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return <AdminLogin />;
}
