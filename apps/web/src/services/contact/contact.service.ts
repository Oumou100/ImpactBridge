import type {
  ApiResponse,
  ContactMessage,
  ContactMessageStatus,
} from "@impact-bridge/shared";
import { apiClient } from "@/api";
import type { ContactApiResponse, ContactPayload } from "@/types";

type ContactListApiResponse = ApiResponse<ContactMessage[]>;
type ContactDetailApiResponse = ApiResponse<ContactMessage>;

export type AdminContactsQuery = {
  page?: number;
  limit?: number;
  status?: ContactMessageStatus;
};

export type ContactListResult = {
  items: ContactMessage[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

const normalizeListMeta = (meta?: Record<string, unknown>) => {
  const toNumber = (value: unknown, fallback: number) =>
    typeof value === "number" && Number.isFinite(value) ? value : fallback;

  return {
    page: toNumber(meta?.page, 1),
    limit: toNumber(meta?.limit, 10),
    total: toNumber(meta?.total, 0),
    totalPages: toNumber(meta?.totalPages, 1),
  };
};

export const sendContactMessage = async (
  payload: ContactPayload,
): Promise<ContactApiResponse> => {
  const response = await apiClient.post<ApiResponse<{ message: string; id?: string }>>(
    "/contact",
    payload,
  );

  if (!response.data.success) {
    throw new Error(response.data.message || "Une erreur est survenue lors de l envoi du message.");
  }

  return {
    message: response.data.data?.message || response.data.message || "Votre message a ete envoye avec succes.",
  };
};

export const fetchAdminContacts = async (
  query: AdminContactsQuery = {},
): Promise<ContactListResult> => {
  const response = await apiClient.get<ContactListApiResponse>("/admin/contacts", {
    params: {
      page: query.page ?? 1,
      limit: query.limit ?? 10,
      ...(query.status ? { status: query.status } : {}),
    },
  });

  if (!response.data.success) {
    throw new Error(response.data.message || "Impossible de recuperer les messages de contact.");
  }

  return {
    items: response.data.data ?? [],
    meta: normalizeListMeta(response.data.meta),
  };
};

export const updateAdminContactStatus = async (
  id: string,
  status: ContactMessageStatus,
): Promise<ContactMessage> => {
  const response = await apiClient.patch<ContactDetailApiResponse>(`/admin/contacts/${id}/status`, {
    status,
  });

  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.message || "Impossible de mettre a jour le statut du message.");
  }

  return response.data.data;
};
