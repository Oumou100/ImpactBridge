"use client";

import { useMemo, useState } from "react";
import { initialContactFormValues } from "@/constants";
import { sendContactMessage } from "@/services/contact";
import type {
  ContactField,
  ContactFormErrors,
  ContactFormValues,
  ContactSubmitStatus,
} from "@/types";
import {
  clearFieldError,
  sanitizeContactInput,
  validateContactPayload,
} from "@/utils/contactValidation";

export const useContactForm = () => {
  const [values, setValues] = useState<ContactFormValues>(initialContactFormValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactSubmitStatus>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasErrors = useMemo(
    () => Object.values(errors).some((value) => Boolean(value)),
    [errors],
  );

  const updateField = (field: ContactField | "website", value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    if (field !== "website") {
      setErrors((prev) => clearFieldError(field, prev));
    }
  };

  const submit = async () => {
    const sanitizedPayload = sanitizeContactInput(values);
    const validationErrors = validateContactPayload(sanitizedPayload);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      setFeedbackMessage("Veuillez corriger les champs invalides.");
      return false;
    }

    setErrors({});
    setStatus("idle");
    setFeedbackMessage("");
    setIsSubmitting(true);

    try {
      const response = await sendContactMessage(sanitizedPayload);
      setStatus("success");
      setFeedbackMessage(response.message);
      setValues(initialContactFormValues);
      return true;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Le message n a pas pu etre envoye pour le moment.";
      setStatus("error");
      setFeedbackMessage(message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    status,
    feedbackMessage,
    isSubmitting,
    hasErrors,
    updateField,
    submit,
  };
};
