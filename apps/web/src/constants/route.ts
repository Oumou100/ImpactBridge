export const ROUTES = {
  HOME: "/",
  ACTIVITIES: "/activites",
  SERVICES: "/services",
  CONTACT: "/contact",
  ADMIN_DASHBOARD: "/admin",
  ADMIN_LOGIN: "/admin/login",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
