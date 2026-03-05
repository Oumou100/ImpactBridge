import type { Metadata } from "next";
import { AdminActivityEdit } from "@/containers";

type AdminActivitiesEditPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Modifier activite | ImpactBridge Admin",
  description: "Edition d une activite ImpactBridge.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminActivitiesEditPage({ params }: AdminActivitiesEditPageProps) {
  const { id } = await params;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      <AdminActivityEdit id={id} />
    </section>
  );
}
