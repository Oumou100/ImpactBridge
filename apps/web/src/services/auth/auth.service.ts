import type {
  AdminLoginCredentials,
  AdminUser,
  ApiResponse,
  AuthLoginPayload,
  AuthTokens,
} from "@impact-bridge/shared";
import axios from "axios";
import { apiClient } from "@/api";

type LoginResponse = ApiResponse<AuthLoginPayload>;
type RefreshResponse = ApiResponse<AuthTokens>;
type MeResponse = ApiResponse<AdminUser>;

export const loginAdmin = async (
  payload: AdminLoginCredentials,
): Promise<AuthLoginPayload> => {
  try {
    const response = await apiClient.post<LoginResponse>("/admin/auth/login", payload);

    if (!response.data.success) {
      throw new Error(response.data.message || "Echec de connexion.");
    }

    if (!response.data.data) {
      throw new Error("Reponse de connexion invalide.");
    }

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      const backendMessage = (error.response?.data as { message?: string } | undefined)
        ?.message;

      if (statusCode === 401) {
        throw new Error("Identifiants incorrects. Verifiez votre email et mot de passe.");
      }

      if (backendMessage) {
        throw new Error(backendMessage);
      }
    }

    throw new Error("Echec de connexion. Veuillez reessayer.");
  }
};

export const refreshAdminSession = async (
  refreshToken: string,
): Promise<AuthTokens> => {
  const response = await apiClient.post<RefreshResponse>("/admin/auth/refresh", {
    refreshToken,
  });

  if (!response.data.success) {
    throw new Error(response.data.message || "Echec de rafraichissement.");
  }

  if (!response.data.data) {
    throw new Error("Reponse de rafraichissement invalide.");
  }

  return response.data.data;
};

export const logoutAdmin = async (refreshToken: string): Promise<void> => {
  await apiClient.post("/admin/auth/logout", { refreshToken });
};

export const fetchAdminMe = async (): Promise<AdminUser> => {
  try {
    const response = await apiClient.get<MeResponse>("/admin/me");

    if (!response.data.success) {
      throw new Error(response.data.message || "Impossible de recuperer le profil admin.");
    }

    if (!response.data.data) {
      throw new Error("Profil admin introuvable.");
    }

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error("Session expiree. Veuillez vous reconnecter.");
    }

    throw error instanceof Error
      ? error
      : new Error("Impossible de recuperer le profil admin.");
  }
};
