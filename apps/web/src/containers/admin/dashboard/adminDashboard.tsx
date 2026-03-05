"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ContactMessage } from "@impact-bridge/shared";
import { AdminStatCard, PublishBadge, StatusBadge } from "@/components";
import { ROUTES } from "@/constants";
import { useAuth, usePublicActivities } from "@/hooks";
import { useAdminAuthStore } from "@/stores";

const ActivityIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 6h16v12H4z" />
    <path d="M8 10h8" />
    <path d="M8 14h5" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 6h16v12H4z" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 8h18v11H3z" />
    <path d="M9 8V6h6v2" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v6l4 2" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3 5 6v6c0 5 3.5 8 7 9 3.5-1 7-4 7-9V6z" />
  </svg>
);

type RecentActivity = {
  id: string;
  title: string;
  location: string;
  coverImageUrl: string;
  isPublished: boolean;
};

const RECENT_MESSAGES: ContactMessage[] = [
  {
    id: "c-1",
    name: "Fatima Zahra",
    email: "fatima@example.com",
    subject: "Demande de partenariat local",
    message: "Nous souhaitons soutenir vos actions de terrain a Casablanca.",
    status: "NEW",
    createdAt: "2026-03-02T10:15:00.000Z",
    updatedAt: "2026-03-02T10:15:00.000Z",
  },
  {
    id: "c-2",
    name: "Yassine B.",
    email: "yassine@example.com",
    subject: "Benevolat weekend",
    message: "Je souhaite rejoindre l equipe benevole pour les actions du weekend.",
    status: "READ",
    createdAt: "2026-03-01T16:30:00.000Z",
    updatedAt: "2026-03-01T18:00:00.000Z",
  },
  {
    id: "c-3",
    name: "Association Noor",
    email: "contact@noor.ma",
    subject: "Collaboration education",
    message: "Proposition de collaboration pour un programme education numerique.",
    status: "ARCHIVED",
    createdAt: "2026-02-28T09:00:00.000Z",
    updatedAt: "2026-03-01T09:00:00.000Z",
  },
];

export const AdminDashboard = () => {
  const router = useRouter();
  const { logout, loadAdminProfile } = useAuth();
  const { admin } = useAdminAuthStore();
  const { filteredItems: adminActivities } = usePublicActivities({
    search: "",
    filter: "all",
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasHandledSessionExpiry = useRef(false);

  useEffect(() => {
    if (admin) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        await loadAdminProfile();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Impossible de charger le profil admin.";

        if (
          message.toLowerCase().includes("session expiree") &&
          !hasHandledSessionExpiry.current
        ) {
          hasHandledSessionExpiry.current = true;
          await logout();
          router.replace(ROUTES.ADMIN_LOGIN);
          return;
        }

        setErrorMessage(message);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [admin, loadAdminProfile, logout, router]);

  const recentActivities = useMemo<RecentActivity[]>(
    () =>
      adminActivities.slice(0, 4).map((activity) => ({
        id: activity.id,
        title: activity.title,
        location: activity.location ?? "Lieu non precise",
        coverImageUrl:
          activity.coverImageUrl ||
          "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=600&fit=crop",
        isPublished: activity.isPublished,
      })),
    [adminActivities],
  );

  const publishedCount = useMemo(
    () => recentActivities.filter((item) => item.isPublished).length,
    [recentActivities],
  );

  const newMessagesCount = useMemo(
    () => RECENT_MESSAGES.filter((item) => item.status === "NEW").length,
    [],
  );

  const stats = useMemo(
    () => [
      {
        label: "Activites",
        value: recentActivities.length.toString(),
        detail: `${publishedCount} publiees`,
        trend: "+3 ce mois",
        iconColorClassName: "text-primary",
        icon: <ActivityIcon />,
      },
      {
        label: "Messages",
        value: RECENT_MESSAGES.length.toString(),
        detail: `${newMessagesCount} non lus`,
        trend: "+2 cette semaine",
        iconColorClassName: "text-accent",
        icon: <MailIcon />,
      },
      {
        label: "Services",
        value: "6",
        detail: "actifs",
        trend: "stable",
        iconColorClassName: "text-secondary",
        icon: <BriefcaseIcon />,
      },
      {
        label: "Benevoles",
        value: "312",
        detail: "inscrits",
        trend: "+15 ce mois",
        iconColorClassName: "text-primary",
        icon: <UsersIcon />,
      },
    ],
    [newMessagesCount, publishedCount, recentActivities.length],
  );

  const handleLogout = async () => {
    await logout();
    router.replace(ROUTES.ADMIN_LOGIN);
  };

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8">
        <header className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold md:text-3xl">Tableau de bord</h1>
            <p className="text-sm text-muted-foreground">
              Vue d ensemble de votre organisation. Connecte en tant que {admin?.email ?? "admin"}.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              <ShieldIcon />
              {admin?.role ?? "ADMIN"}
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium transition hover:bg-muted"
            >
              Se deconnecter
            </button>
          </div>
        </header>

        {loading ? (
          <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Chargement des informations admin...
          </div>
        ) : null}

        {errorMessage ? (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-sm text-destructive">
            {errorMessage}
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <AdminStatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              detail={stat.detail}
              trend={stat.trend}
              iconColorClassName={stat.iconColorClassName}
              icon={stat.icon}
            />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <section className="rounded-xl border border-border bg-card lg:col-span-3">
            <div className="flex items-center justify-between border-b border-border p-5">
              <h2 className="font-semibold">Activites recentes</h2>
              <Link
                href={ROUTES.ADMIN_ACTIVITIES}
                className="text-xs font-medium text-primary transition hover:underline"
              >
                Voir tout
              </Link>
            </div>
            <div className="divide-y divide-border">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4">
                  <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                    <Image
                      src={activity.coverImageUrl}
                      alt={activity.title}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.location}</p>
                  </div>
                  <PublishBadge isPublished={activity.isPublished} />
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card lg:col-span-2">
            <div className="flex items-center justify-between border-b border-border p-5">
              <h2 className="font-semibold">Messages recents</h2>
              <Link
                href={ROUTES.ADMIN_CONTACTS}
                className="text-xs font-medium text-primary transition hover:underline"
              >
                Voir tout
              </Link>
            </div>
            <div className="divide-y divide-border">
              {RECENT_MESSAGES.map((message) => (
                <article key={message.id} className="p-4">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{message.name}</p>
                    <StatusBadge status={message.status} />
                  </div>
                  <p className="text-xs font-semibold text-foreground">{message.subject}</p>
                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{message.message}</p>
                  <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground/70">
                    <ClockIcon />
                    {new Date(message.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
    </section>
  );
};
