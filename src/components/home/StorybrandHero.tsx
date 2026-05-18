"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { site } from "@/data/site";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.88, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function StorybrandHero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32"
      style={{ background: "#1e1a16" }}
      aria-label="Hero"
    >
      {/* ── Parallax portrait — warm dark, not cold forest ── */}
      <motion.div
        style={{ y: reduced ? undefined : photoY }}
        className="absolute inset-0 z-0 origin-top scale-[1.18]"
        aria-hidden
      >
        <Image
          src="/images/legacy/photos/claudia-portrait-036.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[32%_top]"
          sizes="100vw"
          quality={90}
        />
      </motion.div>

      {/* Warm curtain — flipped: transparent left (photo), dark right (text) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: [
            "linear-gradient(254deg,",
            "  rgba(30,26,22,0.94) 0%,",
            "  rgba(30,26,22,0.78) 30%,",
            "  rgba(30,26,22,0.44) 54%,",
            "  rgba(30,26,22,0.08) 100%",
            ")",
          ].join(""),
        }}
        aria-hidden
      />
      {/* Bottom anchor — softer than before */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32"
        style={{ background: "linear-gradient(to top, rgba(30,26,22,0.65), transparent)" }}
        aria-hidden
      />

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      {/* ── Content ── */}
      <div className="page-gutter relative z-[2] mx-auto w-full max-w-[var(--layout-max)]">
        <motion.div
          variants={reduced ? undefined : stagger}
          initial="hidden"
          animate="show"
          className="ml-auto flex max-w-[48ch] flex-col items-end text-right"
        >
          {/* Eyebrow */}
          <motion.div variants={reduced ? undefined : fadeUp}>
            <span
              className="inline-flex items-center gap-2 rounded-full"
              style={{
                padding: "5px 14px 5px 12px",
                background: "rgba(212,160,122,0.12)",
                border: "1px solid rgba(212,160,122,0.26)",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase" as const,
                color: "#d4a07a",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "currentColor",
                  opacity: 0.75,
                  flexShrink: 0,
                }}
                aria-hidden
              />
              Komplementärtherapie&nbsp;·&nbsp;Adligenswil
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={reduced ? undefined : fadeUp}
            className="mt-7 text-white"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontWeight: 300,
              fontSize: "clamp(3.6rem, 8.5vw + 0.5rem, 6.75rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.015em",
            }}
          >
            Finde deine{" "}
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.65)" }}>
              innere
            </em>
            <br />
            Balance.
          </motion.h1>

          {/* Rule */}
          <motion.div
            variants={reduced ? undefined : fadeUp}
            className="mt-8 h-px w-12"
            style={{ background: "rgba(212,160,122,0.45)" }}
            aria-hidden
          />

          {/* Body */}
          <motion.p
            variants={reduced ? undefined : fadeUp}
            style={{
              marginTop: "1.25rem",
              fontSize: "17px",
              lineHeight: 1.76,
              color: "rgba(255,255,255,0.75)",
              maxWidth: "38ch",
            }}
          >
            Ganzheitliche Kinesiologie und Begleitung für mehr Klarheit,
            Kraft und Wohlbefinden — in meiner Praxis in Adligenswil
            bei Luzern.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={reduced ? undefined : fadeUp}
            className="mt-10 flex flex-wrap items-center justify-end gap-4"
          >
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-[50px] items-center gap-3 rounded-[4px] text-ink transition-all duration-300 active:scale-[0.97]"
              style={{
                padding: "0 1.75rem",
                background: "rgba(253,250,245,0.95)",
                boxShadow: "0 4px 32px rgba(0,0,0,0.35)",
                fontSize: "12.5px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
              }}
            >
              Termin buchen
              <span
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
                style={{ background: "rgba(0,0,0,0.07)" }}
                aria-hidden
              >
                →
              </span>
            </a>
            <Link
              href="/ueber-mich"
              className="inline-flex h-[50px] items-center gap-1 px-2 text-[15px] font-medium transition-opacity duration-200 hover:opacity-80"
              style={{ color: "rgba(255,255,255,0.42)" }}
            >
              Mehr erfahren
              <span aria-hidden className="ml-0.5 opacity-55">→</span>
            </Link>
          </motion.div>

          {/* Credential chip */}
          <motion.div
            variants={
              reduced
                ? undefined
                : {
                    hidden: { opacity: 0, y: 12 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        delay: 1.0,
                        ease: [0.16, 1, 0.3, 1] as const,
                      },
                    },
                  }
            }
            className="mt-12 inline-flex items-center gap-4 self-end rounded-[4px]"
            style={{
              padding: "13px 20px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "9.5px",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase" as const,
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                Anerkannt &amp; zertifiziert
              </p>
              <p
                style={{
                  marginTop: "3px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.68)",
                }}
              >
                EMR&nbsp;·&nbsp;KineSuisse&nbsp;·&nbsp;AKT
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
