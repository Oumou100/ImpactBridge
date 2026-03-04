import type { ContactApiResponse, ContactPayload } from "@/types";

export const sendContactMessage = async (
  payload: ContactPayload,
): Promise<ContactApiResponse> => {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
  const endpoint = base ? `${base}/contact` : "/api/contact";

  const response = await fetch(endpoint, {
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
