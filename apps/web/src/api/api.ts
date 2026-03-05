import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "http://localhost:4000/v1";

const ACCESS_TOKEN_KEY = "ib_access_token";
const REFRESH_TOKEN_KEY = "ib_refresh_token";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let refreshingPromise: Promise<string | null> | null = null;

const persistAccessToken = (token: string) => {
  Cookies.set(ACCESS_TOKEN_KEY, token, { expires: 1, sameSite: "strict", path: "/" });
};

const clearAuthCookies = () => {
  Cookies.remove(ACCESS_TOKEN_KEY, { path: "/" });
  Cookies.remove(REFRESH_TOKEN_KEY, { path: "/" });
};

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/admin/auth/refresh`,
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    const nextToken = response.data?.data?.accessToken as string | undefined;
    const nextRefresh = response.data?.data?.refreshToken as string | undefined;

    if (!nextToken || !nextRefresh) {
      clearAuthCookies();
      return null;
    }

    persistAccessToken(nextToken);
    Cookies.set(REFRESH_TOKEN_KEY, nextRefresh, {
      expires: 7,
      sameSite: "strict",
      path: "/",
    });

    return nextToken;
  } catch {
    clearAuthCookies();
    return null;
  }
};

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get(ACCESS_TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  } else if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetriableConfig | undefined;

    if (!config || error.response?.status !== 401 || config._retry) {
      return Promise.reject(error);
    }

    if (
      typeof config.url === "string" &&
      (config.url.includes("/admin/auth/login") || config.url.includes("/admin/auth/refresh"))
    ) {
      return Promise.reject(error);
    }

    config._retry = true;

    if (!refreshingPromise) {
      refreshingPromise = refreshAccessToken().finally(() => {
        refreshingPromise = null;
      });
    }

    const nextToken = await refreshingPromise;

    if (!nextToken) {
      return Promise.reject(error);
    }

    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${nextToken}`;

    return apiClient(config);
  },
);

export const authCookieKeys = {
  access: ACCESS_TOKEN_KEY,
  refresh: REFRESH_TOKEN_KEY,
} as const;
