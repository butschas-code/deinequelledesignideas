"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/data/site";

type NavChild = { href: string; label: string };

type NavItem =
  | { href: string; label: string }
  | { label: string; children: readonly NavChild[] };

const nav: NavItem[] = [
  {
    label: "Angebote",
    children: [
      { href: "/leistungen/kinesiologie", label: "Kinesiologie" },
      { href: "/leistungen/sport-kinesiologie", label: "Sport-Kinesiologie" },
      { href: "/leistungen/yoga", label: "Hatha Yoga" },
    ],
  },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/bewertungen", label: "Bewertungen" },
  { href: "/kontakt", label: "Kontakt" },
];

function isGroup(item: NavItem): item is { label: string; children: readonly NavChild[] } {
  return "children" in item;
}

export function SiteHeader() {
  const leistungenMenuId = useId();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useLayoutEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header>
      {/* ── Big logo section — collapses on scroll ── */}
      <AnimatePresence initial={false}>
        {!scrolled && (
          <motion.div
            key="logo-top"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden border-b border-black/[0.06] bg-[var(--paper)]/95 backdrop-blur-xl"
          >
            <div className="page-gutter mx-auto flex w-full max-w-[var(--layout-max)] justify-center py-5 sm:py-6">
              <Link
                href="/"
                className="group focus-visible:outline-offset-4"
                aria-label={site.name}
              >
                <Image
                  src={site.logo.src}
                  alt={site.name}
                  width={site.logo.width}
                  height={site.logo.height}
                  priority
                  className="h-16 w-auto object-contain sm:h-20 md:h-24"
                  sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, 260px"
                />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sticky nav bar — always visible ── */}
      <div className="sticky top-0 z-[60] border-b border-black/[0.08] bg-[var(--paper)]/95 backdrop-blur-xl">
        <div className="page-gutter mx-auto flex w-full max-w-[var(--layout-max)] items-center justify-between gap-3 py-2.5 sm:gap-4">

          {/* Small logo — fades in when scrolled */}
          <AnimatePresence>
            {scrolled && (
              <motion.div
                key="logo-inline"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                className="shrink-0"
              >
                <Link href="/" aria-label={site.name} className="focus-visible:outline-offset-4">
                  <Image
                    src={site.logo.src}
                    alt={site.name}
                    width={site.logo.width}
                    height={site.logo.height}
                    className="h-7 w-auto object-contain"
                    sizes="120px"
                    priority
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop nav */}
          <nav
            className="hidden min-w-0 flex-1 items-center justify-end gap-x-5 xl:gap-x-7 2xl:gap-x-8 lg:flex"
            aria-label="Hauptnavigation"
          >
            {nav.map((item) =>
              isGroup(item) ? (
                <div key={item.label} className="group relative">
                  <button
                    type="button"
                    className="-my-1 inline-flex items-center gap-1 rounded-[4px] px-2.5 py-2 text-[15px] font-medium text-ink-muted transition-colors duration-200 hover:bg-black/[0.04] hover:text-ink"
                    aria-haspopup="menu"
                    aria-controls={leistungenMenuId}
                  >
                    {item.label}
                    <span className="sr-only">— Untermenü öffnen mit Maus oder Tab</span>
                    <svg
                      className="h-3 w-3 opacity-50 transition-transform duration-200 group-hover:translate-y-px group-focus-within:translate-y-px"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden
                    >
                      <path d="M3 4.5 6 7.5 9 4.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div
                    id={leistungenMenuId}
                    className="pointer-events-none invisible absolute left-1/2 top-full z-[70] -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility] duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100"
                    role="menu"
                    aria-label={`${item.label} — Unterseiten`}
                  >
                    <ul className="min-w-[220px] rounded-[4px] border border-black/[0.08] bg-white py-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)]">
                      {item.children.map((sub) => (
                        <li key={sub.href} role="none">
                          <Link
                            href={sub.href}
                            role="menuitem"
                            className="block px-4 py-3 text-[15px] font-medium text-ink-muted transition-colors hover:bg-brand-soft hover:text-ink"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="-my-1 whitespace-nowrap rounded-[4px] px-2.5 py-2 text-[15px] font-medium text-ink-muted transition-colors duration-200 hover:bg-black/[0.04] hover:text-ink"
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-[4px] bg-brand px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm transition duration-200 hover:bg-brand-hover"
            >
              Termin buchen
            </Link>
          </nav>

          {/* Mobile controls */}
          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <Link
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[4px] bg-brand px-3.5 text-xs font-semibold text-white sm:min-w-0 sm:px-4"
            >
              Termin
            </Link>
            <button
              type="button"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[4px] border border-black/10 px-3 text-[15px] font-medium text-ink transition hover:bg-black/[0.03] sm:min-w-0 sm:px-4"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? "Schliessen" : "Menü"}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden border-t border-black/[0.06] bg-white/95 backdrop-blur-xl lg:hidden"
            >
              <nav className="page-gutter flex flex-col py-4" aria-label="Mobile Navigation">
                {nav.map((item, i) =>
                  isGroup(item) ? (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <p className="px-3 pb-1 pt-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-brand-complimentary">
                        {item.label}
                      </p>
                      {item.children.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="flex min-h-[48px] items-center rounded-[4px] py-2 pl-8 pr-3 text-[17px] text-ink-muted transition hover:bg-paper hover:text-ink"
                          onClick={() => setOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        href={item.href}
                        className="flex min-h-[48px] items-center rounded-[4px] px-3 py-2.5 text-[17px] text-ink-muted transition hover:bg-paper hover:text-ink"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ),
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
