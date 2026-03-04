export type ContactField = "name" | "email" | "subject" | "message";

export type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

export type ContactFormErrors = Partial<Record<ContactField, string>>;

export type ContactSubmitStatus = "idle" | "success" | "error";

export type ContactInfoIconKey = "map" | "phone" | "mail" | "clock";

export type ContactInfoItem = {
  label: string;
  value: string;
  icon: ContactInfoIconKey;
};

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
};

export type ContactApiResponse = {
  message: string;
};
