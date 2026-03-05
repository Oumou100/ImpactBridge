import type { Metadata } from "next";
import { AdminActivities } from "@/containers";

export const metadata: Metadata = {
  title: "Gestion des activites | ImpactBridge Admin",
  description: "Gestion des activites de la plateforme ImpactBridge.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminActivitiesPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      <AdminActivities />
    </section>
  );
}
