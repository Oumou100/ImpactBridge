"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants";

const MenuIcon = () => {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
};

const CloseIcon = () => {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </svg>
  );
};

const HeartIcon = () => {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 20s-7-4.35-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 15.65 12 20 12 20Z" />
    </svg>
  );
};

export const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/80 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary transition-transform group-hover:scale-105">
            <span className="text-sm font-bold tracking-tight text-primary-foreground">IB</span>
            <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-background bg-accent" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg leading-none font-bold tracking-tight text-foreground">ImpactBridge</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Organisation humanitaire
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium transition-colors"
              >
                <span
                  className={
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }
                >
                  {item.label}
                </span>
                <span
                  className={`absolute right-2 bottom-0 left-2 h-0.5 rounded-full bg-primary transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}

          <div className="ml-4 flex items-center gap-2">
            <Link
              href="/administration"
              className="rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Admin
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold text-accent-foreground shadow-md shadow-accent/20 transition-colors hover:bg-accent/90"
            >
              <span className="mr-1.5 inline-flex"><HeartIcon /></span>
              Soutenir
            </Link>
          </div>
        </nav>

        <button
          type="button"
          className="relative z-50 p-2 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Ouvrir ou fermer le menu"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          <span
            className={`block transition-all duration-200 ${
              isOpen ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
            }`}
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </span>
        </button>
      </div>

      <nav
        id="mobile-nav"
        className={`overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-4 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/5 font-semibold text-primary"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="flex gap-2 pt-3">
            <Link
              href="/administration"
              onClick={() => setIsOpen(false)}
              className="flex-1 rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium text-foreground"
            >
              Admin
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-center text-sm font-semibold text-accent-foreground"
            >
              Soutenir
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
