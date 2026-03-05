import type { ApiResponse } from "@impact-bridge/shared";
import { apiClient } from "@/api";

type UploadImageApiPayload = {
  secure_url: string;
  public_id: string;
};

type UploadImageResponse = ApiResponse<UploadImageApiPayload>;

export type UploadedImage = {
  url: string;
  publicId: string;
};

export const uploadActivityImage = async (file: File): Promise<UploadedImage> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<UploadImageResponse>("/admin/uploads/image", formData);

  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.message || "Echec de l upload de l image.");
  }

  return {
    url: response.data.data.secure_url,
    publicId: response.data.data.public_id,
  };
};
