export const ROUTES = {
  HOME: "/",
  ACTIVITIES: "/activites",
  SERVICES: "/services",
  CONTACT: "/contact",
  ADMIN: "/administration",
  LOGIN: "/connexion",
  REGISTER: "/inscription",
  FORGOT_PASSWORD: "/mot-de-passe-oublie",
  VERIFICATION: "/verification",
  RESET_PASSWORD: "/reinitialiser-mot-de-passe",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
