import { NextResponse } from "next/server";
import type { ContactPayload } from "@/types";

const MAX_REQUESTS = 5;
const WINDOW_MS = 10 * 60 * 1000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type GlobalWithRateLimit = typeof globalThis & {
  __contactRateLimitStore__?: Map<string, RateLimitEntry>;
};

const getStore = () => {
  const globalRef = globalThis as GlobalWithRateLimit;

  if (!globalRef.__contactRateLimitStore__) {
    globalRef.__contactRateLimitStore__ = new Map<string, RateLimitEntry>();
  }

  return globalRef.__contactRateLimitStore__;
};

const sanitize = (value: string) => value.replace(/[\u0000-\u001F\u007F]/g, "").trim();

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const validatePayload = (payload: ContactPayload) => {
  if (payload.name.length < 2 || payload.name.length > 100) {
    return "Le nom est invalide.";
  }

  if (!isValidEmail(payload.email) || payload.email.length > 255) {
    return "L adresse email est invalide.";
  }

  if (payload.subject.length < 3 || payload.subject.length > 200) {
    return "Le sujet est invalide.";
  }

  if (payload.message.length < 10 || payload.message.length > 2000) {
    return "Le message est invalide.";
  }

  return null;
};

const getClientKey = (request: Request) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
};

const checkRateLimit = (clientKey: string) => {
  const now = Date.now();
  const store = getStore();
  const current = store.get(clientKey);

  if (!current || now > current.resetAt) {
    store.set(clientKey, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (current.count >= MAX_REQUESTS) {
    return false;
  }

  store.set(clientKey, { ...current, count: current.count + 1 });
  return true;
};

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { message: "Format de requete non supporte." },
      { status: 415 },
    );
  }

  let rawBody: ContactPayload;

  try {
    rawBody = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Payload invalide." }, { status: 400 });
  }

  const payload: ContactPayload = {
    name: sanitize(rawBody?.name ?? ""),
    email: sanitize(rawBody?.email ?? "").toLowerCase(),
    subject: sanitize(rawBody?.subject ?? ""),
    message: sanitize(rawBody?.message ?? ""),
    website: sanitize(rawBody?.website ?? ""),
  };

  if (payload.website) {
    return NextResponse.json(
      { message: "Votre message a ete envoye avec succes." },
      { status: 200 },
    );
  }

  if (!checkRateLimit(getClientKey(request))) {
    return NextResponse.json(
      { message: "Trop de tentatives. Veuillez reessayer plus tard." },
      { status: 429 },
    );
  }

  const validationError = validatePayload(payload);
  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 });
  }

  return NextResponse.json(
    { message: "Votre message a ete envoye avec succes." },
    { status: 200 },
  );
}
