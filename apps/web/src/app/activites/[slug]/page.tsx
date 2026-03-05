import type { Metadata } from "next";
import { ActivityDetail } from "@/containers";

type ActivityDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const metadata: Metadata = {
  title: "Details activite | ImpactBridge",
  description: "Consultez les details d une activite terrain ImpactBridge.",
};

export default async function ActivityDetailPage({ params }: ActivityDetailPageProps) {
  const { slug } = await params;
  return <ActivityDetail slug={slug} />;
}
