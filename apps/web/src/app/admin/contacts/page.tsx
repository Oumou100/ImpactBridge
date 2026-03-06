import type { Metadata } from "next";
import { AdminContacts } from "@/containers";

export const metadata: Metadata = {
  title: "Messages | ImpactBridge Admin",
  description: "Gestion des messages de contact.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminContactsPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      <AdminContacts />
    </section>
  );
}
