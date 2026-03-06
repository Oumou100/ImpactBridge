import Image from "next/image";
import Link from "next/link";
import { navItems, ROUTES } from "@/constants";

const engagementLinks = [
  "Faire un don",
  "Devenir benevole",
  "Nos partenaires",
  "Rapport annuel",
];

const MailIcon = () => {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
};

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      <div className="bg-primary">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
              Restez connecte a notre impact
            </h3>
            <p className="mb-8 leading-relaxed text-primary-foreground/75">
              Une question, une proposition de partenariat ou envie de nous rejoindre ? Parlons-en.
            </p>

            <div className="mx-auto max-w-md">
              <Link
                href={ROUTES.CONTACT}
                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-accent px-6 font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-colors hover:bg-accent/90"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <div className="mb-4">
                <div className="relative h-20 w-[210px]">
                  <Image
                    src="/assets/logo/impactbridge_footer.png"
                    alt="ImpactBridge"
                    fill
                    sizes="(max-width: 650px) 190px, 220px"
                    className="object-contain object-left"
                  />
                </div>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-background/45">
                  Organisation humanitaire
                </p>
              </div>
              <p className="text-sm leading-relaxed text-background/55">
                Ensemble, construisons des ponts vers un avenir meilleur pour les communautes les plus vulnerables.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-background/45">
                Navigation
              </h4>
              <div className="flex flex-col gap-2.5">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="w-fit text-sm text-background/55 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-background/45">
                S engager
              </h4>
              <div className="flex flex-col gap-2.5">
                {engagementLinks.map((item) => (
                  <span
                    key={item}
                    className="w-fit cursor-pointer text-sm text-background/55 transition-colors hover:text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-background/45">
                Contact
              </h4>
              <div className="space-y-2.5 text-sm text-background/55">
                <p className="flex items-center gap-2">
                  <span className="text-accent">
                    <MailIcon />
                  </span>
                  contact@impactbridge.org
                </p>
                <p>+212 6 50 77 06 09</p>
                <p>
                  Hay Salam
                  <br />
                  Casablanca, Maroc
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 md:flex-row">
            <p className="text-xs text-background/35">
              (c) {new Date().getFullYear()} ImpactBridge. Tous droits reserves.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-background/35">
              <span>By</span>
              <Link
                href="https://oumou100.github.io/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-accent transition-opacity hover:opacity-80"
              >
                OumouDev
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
