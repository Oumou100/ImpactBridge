"use client";

import { create } from "zustand";
import type { AdminUser, AuthTokens } from "@impact-bridge/shared";

type AdminAuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  admin: AdminUser | null;
  isAuthenticated: boolean;
  setSession: (session: AuthTokens & { admin: AdminUser }) => void;
  setAdmin: (admin: AdminUser) => void;
  hydrateTokens: (tokens: AuthTokens | null) => void;
  clearSession: () => void;
};

export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  admin: null,
  isAuthenticated: false,
  setSession: (session) =>
    set({
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      admin: session.admin,
      isAuthenticated: true,
    }),
  setAdmin: (admin) => set((state) => ({ ...state, admin })),
  hydrateTokens: (tokens) =>
    set({
      accessToken: tokens?.accessToken ?? null,
      refreshToken: tokens?.refreshToken ?? null,
      isAuthenticated: Boolean(tokens?.accessToken),
    }),
  clearSession: () =>
    set({
      accessToken: null,
      refreshToken: null,
      admin: null,
      isAuthenticated: false,
    }),
}));
