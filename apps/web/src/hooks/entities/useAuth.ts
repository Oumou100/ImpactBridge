"use client";

import { useCallback } from "react";
import Cookies from "js-cookie";
import type { AdminLoginCredentials } from "@impact-bridge/shared";
import { authCookieKeys } from "@/api";
import { fetchAdminMe, loginAdmin, logoutAdmin } from "@/services/auth";
import { useAdminAuthStore, useGlobalLoaderStore } from "@/stores";

type UseAuthReturn = {
  checkIsUserLoggedIn: () => Promise<boolean>;
  login: (credentials: AdminLoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  loadAdminProfile: () => Promise<void>;
  isAuthenticated: boolean;
};

export const useAuth = (): UseAuthReturn => {
  const {
    setSession,
    clearSession,
    setAdmin,
    hydrateTokens,
    isAuthenticated,
    refreshToken,
  } = useAdminAuthStore();
  const { startGlobalLoader, stopGlobalLoader } = useGlobalLoaderStore();

  const persistTokens = useCallback((accessToken: string, nextRefreshToken: string) => {
    Cookies.set(authCookieKeys.access, accessToken, {
      expires: 1,
      sameSite: "strict",
      path: "/",
    });
    Cookies.set(authCookieKeys.refresh, nextRefreshToken, {
      expires: 7,
      sameSite: "strict",
      path: "/",
    });
  }, []);

  const clearTokens = useCallback(() => {
    Cookies.remove(authCookieKeys.access, { path: "/" });
    Cookies.remove(authCookieKeys.refresh, { path: "/" });
  }, []);

  const checkIsUserLoggedIn = useCallback(async (): Promise<boolean> => {
    const accessToken = Cookies.get(authCookieKeys.access);
    const storedRefreshToken = Cookies.get(authCookieKeys.refresh);

    if (!accessToken || !storedRefreshToken) {
      clearSession();
      return false;
    }

    hydrateTokens({ accessToken, refreshToken: storedRefreshToken });
    return true;
  }, [clearSession, hydrateTokens]);

  const login = useCallback(
    async (credentials: AdminLoginCredentials): Promise<void> => {
      startGlobalLoader();
      try {
        const data = await loginAdmin(credentials);
        persistTokens(data.accessToken, data.refreshToken);
        setSession(data);
      } finally {
        stopGlobalLoader();
      }
    },
    [persistTokens, setSession, startGlobalLoader, stopGlobalLoader],
  );

  const loadAdminProfile = useCallback(async (): Promise<void> => {
    const admin = await fetchAdminMe();
    setAdmin(admin);
  }, [setAdmin]);

  const logout = useCallback(async (): Promise<void> => {
    startGlobalLoader();
    try {
      const activeRefresh = refreshToken ?? Cookies.get(authCookieKeys.refresh);
      if (activeRefresh) {
        await logoutAdmin(activeRefresh);
      }
    } finally {
      clearTokens();
      clearSession();
      stopGlobalLoader();
    }
  }, [clearSession, clearTokens, refreshToken, startGlobalLoader, stopGlobalLoader]);

  return {
    checkIsUserLoggedIn,
    login,
    logout,
    loadAdminProfile,
    isAuthenticated,
  };
};
