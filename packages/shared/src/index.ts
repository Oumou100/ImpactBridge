export type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data?: T;
  meta?: Record<string, unknown>;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: unknown;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export type AdminRole = "ADMIN";

export type AdminUser = {
  id: string;
  email: string;
  role: AdminRole;
  isActive?: boolean;
  lastLoginAt?: string | null;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AdminLoginCredentials = {
  email: string;
  password: string;
};

export type AuthLoginPayload = AuthTokens & {
  admin: AdminUser;
};

export type ContactMessageStatus = "NEW" | "READ" | "ARCHIVED";

export type Activity = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string | null;
  location?: string | null;
  activityDate?: string | null;
  coverImageUrl?: string | null;
  coverImagePublicId?: string | null;
  isPublished: boolean;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactMessageStatus;
  createdAt: string;
  updatedAt: string;
};
