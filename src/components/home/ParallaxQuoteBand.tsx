"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Full-bleed cinematic break between content sections.
 * Parallax photo background, large Cormorant italic quote,
 * atmospheric dark overlay with grain.
 */
export function ParallaxQuoteBand() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Photo moves up slightly as user scrolls down — classic parallax
  const photoY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: "clamp(380px, 56vh, 680px)" }}
    >
      {/* Parallax photo */}
      <motion.div
        style={{ y: reduced ? undefined : photoY }}
        className="absolute inset-0 scale-[1.25]"
        aria-hidden
      >
        <Image
          src="/images/legacy/photos/praxis-8581.jpg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
      </motion.div>

      {/* Layered atmospheric overlays */}
      {/* Deep forest base */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "rgba(10,18,11,0.72)" }}
        aria-hidden
      />
      {/* Warm amber centre glow — makes the photo feel alive */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(158,110,88,0.12), transparent 70%)",
        }}
        aria-hidden
      />

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      {/* Quote */}
      <div className="relative z-[1] flex h-full items-center justify-center px-6">
        <motion.figure
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl text-center"
        >
          <blockquote>
            <p
              className="text-white"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(1.6rem, 3.8vw, 3rem)",
                lineHeight: 1.42,
                letterSpacing: "0.005em",
              }}
            >
              «Yoga und Kinesiologie haben mir gezeigt, wie viel Energie
              wir freisetzen können, wenn wir unsere eigene Quelle
              wiederentdecken.»
            </p>
          </blockquote>
          <figcaption className="mt-8 flex items-center justify-center gap-3">
            <span
              className="h-px w-8 shrink-0"
              style={{ background: "rgba(212,160,122,0.55)" }}
              aria-hidden
            />
            <cite
              style={{
                fontStyle: "normal",
                fontSize: "12.5px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                color: "rgba(255,255,255,0.38)",
              }}
            >
              Claudia Dimmler
            </cite>
            <span
              className="h-px w-8 shrink-0"
              style={{ background: "rgba(212,160,122,0.55)" }}
              aria-hidden
            />
          </figcaption>
        </motion.figure>
      </div>
    </div>
  );
}
