import type { Metadata } from "next";
import { AdminActivityCreate } from "@/containers";

export const metadata: Metadata = {
  title: "Nouvelle activite | ImpactBridge Admin",
  description: "Creation d une nouvelle activite ImpactBridge.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminActivitiesCreatePage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      <AdminActivityCreate />
    </section>
  );
}
