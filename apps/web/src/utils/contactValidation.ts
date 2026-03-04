import type {
  ContactField,
  ContactFormErrors,
  ContactFormValues,
  ContactPayload,
} from "@/types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitize = (value: string) => value.replace(/[\u0000-\u001F\u007F]/g, "").trim();

export const sanitizeContactInput = (values: ContactFormValues): ContactPayload => {
  return {
    name: sanitize(values.name),
    email: sanitize(values.email).toLowerCase(),
    subject: sanitize(values.subject),
    message: sanitize(values.message),
    website: sanitize(values.website),
  };
};

export const validateContactPayload = (payload: ContactPayload): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  if (payload.name.length < 2 || payload.name.length > 100) {
    errors.name = "Le nom doit contenir entre 2 et 100 caracteres.";
  }

  if (!EMAIL_REGEX.test(payload.email) || payload.email.length > 255) {
    errors.email = "Veuillez entrer une adresse email valide.";
  }

  if (payload.subject.length < 3 || payload.subject.length > 200) {
    errors.subject = "Le sujet doit contenir entre 3 et 200 caracteres.";
  }

  if (payload.message.length < 10 || payload.message.length > 2000) {
    errors.message = "Le message doit contenir entre 10 et 2000 caracteres.";
  }

  return errors;
};

export const clearFieldError = (
  field: ContactField,
  currentErrors: ContactFormErrors,
): ContactFormErrors => {
  if (!currentErrors[field]) {
    return currentErrors;
  }

  return { ...currentErrors, [field]: "" };
};
