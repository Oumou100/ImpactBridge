"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { authCookieKeys } from "@/api";
import { AdminStatCard, PublishBadge, StatusBadge } from "@/components";
import { ROUTES } from "@/constants";
import { Skeleton } from "@/components/common";
import { useAdminActivities, useAdminContacts, useAuth } from "@/hooks";
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

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v6l4 2" />
  </svg>
);

type RecentActivity = {
  id: string;
  title: string;
  location: string;
  coverImageUrl: string;
  isPublished: boolean;
};

export const AdminDashboard = () => {
  const router = useRouter();
  const { logout, loadAdminProfile } = useAuth();
  const { admin, accessToken } = useAdminAuthStore();
  const activitiesQuery = useAdminActivities({
    page: 1,
    search: "",
    status: "all",
    limit: 4,
  });
  const publishedActivitiesQuery = useAdminActivities({
    page: 1,
    search: "",
    status: "published",
    limit: 1,
  });
  const recentContactsQuery = useAdminContacts({
    page: 1,
    limit: 3,
  });
  const newContactsQuery = useAdminContacts({
    page: 1,
    limit: 1,
    status: "NEW",
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasHandledSessionExpiry = useRef(false);

  useEffect(() => {
    const activeAccessToken = accessToken ?? Cookies.get(authCookieKeys.access);

    if (!activeAccessToken) {
      setLoading(false);
      return;
    }

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
          window.location.assign(ROUTES.ADMIN_LOGIN);
          return;
        }

        setErrorMessage(message);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [accessToken, admin, loadAdminProfile, logout, router]);

  const recentActivities = useMemo<RecentActivity[]>(
    () =>
      (activitiesQuery.data?.items ?? []).map((activity) => ({
        id: activity.id,
        title: activity.title,
        location: activity.location ?? "Lieu non precise",
        coverImageUrl:
          activity.coverImageUrl ||
          "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=600&fit=crop",
        isPublished: activity.isPublished,
      })),
    [activitiesQuery.data?.items],
  );

  const totalActivities = activitiesQuery.data?.meta.total ?? 0;
  const publishedCount = publishedActivitiesQuery.data?.meta.total ?? 0;
  const recentMessages = recentContactsQuery.data?.items ?? [];
  const totalMessages = recentContactsQuery.data?.meta.total ?? 0;
  const newMessagesCount = newContactsQuery.data?.meta.total ?? 0;

  const stats = useMemo(
    () => [
      {
        label: "Activites",
        value: totalActivities.toString(),
        detail: `${publishedCount} publiees`,
        iconColorClassName: "text-primary",
        icon: <ActivityIcon />,
      },
      {
        label: "Messages",
        value: totalMessages.toString(),
        detail: `${newMessagesCount} non lus`,
        iconColorClassName: "text-accent",
        icon: <MailIcon />,
      },
    ],
    [newMessagesCount, publishedCount, totalActivities, totalMessages],
  );

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8">
      <header className="space-y-1">
        <h1 className="font-display text-2xl font-bold md:text-3xl">Tableau de bord</h1>
        <p className="text-sm text-muted-foreground">Vue d ensemble de votre organisation</p>
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

        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map((stat) => (
            <AdminStatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              detail={stat.detail}
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
              {recentContactsQuery.isLoading ? (
                <div className="space-y-4 p-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                      <Skeleton className="h-3 w-4/5" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  ))}
                </div>
              ) : null}
              {!recentContactsQuery.isLoading && recentMessages.length === 0 ? (
                <div className="p-6 text-sm text-muted-foreground">Aucun message recent.</div>
              ) : null}
              {!recentContactsQuery.isLoading &&
                recentMessages.map((message) => (
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
