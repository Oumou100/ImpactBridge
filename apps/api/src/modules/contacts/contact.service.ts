import { prisma } from "@/core/db/prisma";
import { sendContactNotification } from "@/core/mail/mailer";
import { AppError } from "@/app/middlewares/error-handler";

export const submitContact = async (payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
}) => {
  if (payload.website) {
    return { message: "Message recu" };
  }

  const saved = await prisma.contactMessage.create({
    data: {
      name: payload.name,
      email: payload.email,
      subject: payload.subject,
      message: payload.message,
    },
  });

  try {
    await sendContactNotification(payload);
  } catch {
    // Non-blocking for MVP.
  }

  return {
    message: "Votre message a ete envoye avec succes.",
    id: saved.id,
  };
};

export const listContacts = async (input: {
  page: number;
  limit: number;
  status?: "NEW" | "READ" | "ARCHIVED";
}) => {
  const skip = (input.page - 1) * input.limit;
  const where = input.status ? { status: input.status } : {};

  const [data, total] = await Promise.all([
    prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: input.limit,
    }),
    prisma.contactMessage.count({ where }),
  ]);

  return {
    data,
    meta: {
      page: input.page,
      limit: input.limit,
      total,
      totalPages: Math.ceil(total / input.limit),
    },
  };
};

export const updateContactStatus = async (
  id: string,
  status: "NEW" | "READ" | "ARCHIVED",
) => {
  const exists = await prisma.contactMessage.findUnique({ where: { id } });

  if (!exists) {
    throw new AppError("Message de contact introuvable", 404);
  }

  return prisma.contactMessage.update({
    where: { id },
    data: { status },
  });
};
