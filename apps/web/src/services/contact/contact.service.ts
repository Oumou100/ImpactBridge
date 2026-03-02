import type { ContactApiResponse, ContactPayload } from "@/types";

export const sendContactMessage = async (
  payload: ContactPayload,
): Promise<ContactApiResponse> => {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as
    | ContactApiResponse
    | null;

  if (!response.ok) {
    throw new Error(
      data?.message ?? "Une erreur est survenue lors de l envoi du message.",
    );
  }

  return data ?? { message: "Votre message a ete envoye avec succes." };
};
