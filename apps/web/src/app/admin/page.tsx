import type { Metadata } from "next";
import { AdminDashboard } from "@/containers";

export const metadata: Metadata = {
  title: "Dashboard Admin | ImpactBridge",
  description: "Tableau de bord administrateur ImpactBridge.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
