"use client";

import Link from "next/link";
import { ROUTES } from "@/constants";

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 11 12 4l9 7" />
    <path d="M5 10v10h14V10" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m15 18-6-6 6-6" />
    <path d="M9 12h10" />
  </svg>
);

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <h1 className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-9xl font-bold text-transparent">
            404
          </h1>
        </div>

        <h2 className="mb-4 text-3xl font-bold text-slate-900">Page non trouvee</h2>

        <p className="mb-8 text-lg text-slate-600">
          Desole, nous ne pouvons pas trouver la page que vous cherchez. Elle a peut-etre
          ete deplacee ou n existe plus.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white shadow-lg transition hover:from-blue-700 hover:to-blue-800 hover:shadow-xl"
          >
            <HomeIcon />
            Accueil
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            <ArrowLeftIcon />
            Retour
          </button>
        </div>
      </div>
    </div>
  );
}
