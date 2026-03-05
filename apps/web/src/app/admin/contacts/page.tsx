import type { Metadata } from "next";

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
    <section className="mx-auto w-full max-w-5xl rounded-xl border border-border bg-card px-6 py-12 text-center">
      <h1 className="text-2xl font-bold">Messages</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Module en cours d integration. La boite de reception arrive a l etape suivante.
      </p>
    </section>
  );
}
