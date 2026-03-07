"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { PropsWithChildren, ReactNode } from "react";
import { ROUTES } from "@/constants";
import { useAuth } from "@/hooks";

type SidebarLink = {
  label: string;
  path: string;
  icon: ReactNode;
};

const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="8" height="8" rx="1" />
    <rect x="13" y="3" width="8" height="5" rx="1" />
    <rect x="13" y="10" width="8" height="11" rx="1" />
    <rect x="3" y="13" width="8" height="8" rx="1" />
  </svg>
);

const ActivitiesIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 6h16v12H4z" />
    <path d="M8 10h8" />
    <path d="M8 14h5" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 6h16v12H4z" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <path d="M10 17 15 12 10 7" />
    <path d="M15 12H3" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </svg>
);

const sidebarLinks: SidebarLink[] = [
  { label: "Dashboard", path: ROUTES.ADMIN_DASHBOARD, icon: <DashboardIcon /> },
  { label: "Activites", path: ROUTES.ADMIN_ACTIVITIES, icon: <ActivitiesIcon /> },
  { label: "Messages", path: ROUTES.ADMIN_CONTACTS, icon: <MailIcon /> },
];

const SIDEBAR_STORAGE_KEY = "ib_admin_sidebar_open";

const isActiveRoute = (pathname: string, route: string) =>
  pathname === route || (route !== ROUTES.ADMIN_DASHBOARD && pathname.startsWith(route));

export default function AdminLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const isLoginRoute = pathname === ROUTES.ADMIN_LOGIN;

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return true;
    }

    const stored = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);
    return stored !== "false";
  });

  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(sidebarOpen));
  }, [sidebarOpen]);

  const handleLogout = async () => {
    await logout();
    window.location.assign(ROUTES.ADMIN_LOGIN);
  };

  if (isLoginRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <aside
        className={`hidden shrink-0 border-r border-border bg-card transition-all duration-300 md:block ${
          sidebarOpen ? "w-60" : "w-20"
        }`}
      >
        <div className="flex h-full flex-col p-4">
          <div className="mb-6 flex items-center justify-between px-3">
            {sidebarOpen ? (
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                Administration
              </p>
            ) : null}
            <button
              type="button"
              onClick={() => setSidebarOpen((previous) => !previous)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground"
              title={sidebarOpen ? "Minimiser" : "Afficher"}
            >
              {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
            </button>
          </div>

          <nav className="flex-1 space-y-1">
            {sidebarLinks.map((link) => {
              const active = isActiveRoute(pathname, link.path);
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  } ${sidebarOpen ? "" : "justify-center"}`}
                  title={!sidebarOpen ? link.label : undefined}
                >
                  {link.icon}
                  {sidebarOpen ? link.label : null}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-destructive ${
              sidebarOpen ? "" : "justify-center px-1.5"
            }`}
          >
            <LogoutIcon />
            {sidebarOpen ? "Deconnexion" : null}
          </button>
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card md:hidden">
        <div className="flex items-center justify-around py-2">
          {sidebarLinks.map((link) => {
            const active = isActiveRoute(pathname, link.path);
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 text-xs ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 px-3 py-1.5 text-xs text-muted-foreground transition hover:text-destructive"
          >
            <LogoutIcon />
            Deconnexion
          </button>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto border-t border-border/60 p-4 pb-24 md:p-8 md:pb-8">
        {children}
      </main>
    </div>
  );
}
