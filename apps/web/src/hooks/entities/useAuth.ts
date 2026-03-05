"use client";

import Cookies from "js-cookie";
import type { AdminLoginCredentials } from "@impact-bridge/shared";
import { authCookieKeys } from "@/api";
import {
  fetchAdminMe,
  loginAdmin,
  logoutAdmin,
} from "@/services/auth";
import { useAdminAuthStore } from "@/stores";

type UseAuthReturn = {
  checkIsUserLoggedIn: () => Promise<boolean>;
  login: (credentials: AdminLoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  loadAdminProfile: () => Promise<void>;
  isAuthenticated: boolean;
};

export const useAuth = (): UseAuthReturn => {
  const { setSession, clearSession, setAdmin, hydrateTokens, isAuthenticated, refreshToken } =
    useAdminAuthStore();

  const persistTokens = (accessToken: string, nextRefreshToken: string) => {
    Cookies.set(authCookieKeys.access, accessToken, { expires: 1, sameSite: "strict" });
    Cookies.set(authCookieKeys.refresh, nextRefreshToken, { expires: 7, sameSite: "strict" });
  };

  const clearTokens = () => {
    Cookies.remove(authCookieKeys.access);
    Cookies.remove(authCookieKeys.refresh);
  };

  const checkIsUserLoggedIn = async (): Promise<boolean> => {
    const accessToken = Cookies.get(authCookieKeys.access);
    const storedRefreshToken = Cookies.get(authCookieKeys.refresh);

    if (!accessToken || !storedRefreshToken) {
      clearSession();
      return false;
    }

    hydrateTokens({ accessToken, refreshToken: storedRefreshToken });
    return true;
  };

  const login = async (credentials: AdminLoginCredentials): Promise<void> => {
    const data = await loginAdmin(credentials);
    persistTokens(data.accessToken, data.refreshToken);
    setSession(data);
  };

  const loadAdminProfile = async (): Promise<void> => {
    const admin = await fetchAdminMe();
    setAdmin(admin);
  };

  const logout = async (): Promise<void> => {
    try {
      const activeRefresh = refreshToken ?? Cookies.get(authCookieKeys.refresh);

      if (activeRefresh) {
        await logoutAdmin(activeRefresh);
      }
    } finally {
      clearTokens();
      clearSession();
    }
  };

  return {
    checkIsUserLoggedIn,
    login,
    logout,
    loadAdminProfile,
    isAuthenticated,
  };
};
