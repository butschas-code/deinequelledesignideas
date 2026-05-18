import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { site } from "@/data/site";
import { googleReviews, getReviewsSorted, formatReviewDate } from "@/data/googleReviews";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { StorybrandHero } from "@/components/home/StorybrandHero";
import { ParallaxQuoteBand } from "@/components/home/ParallaxQuoteBand";

/* ─── SVG icons ─── */
function IconZap() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function IconActivity() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function IconHeart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function StarRow({ rating }: { rating: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <span className="inline-flex gap-0.5 text-[13px] leading-none" style={{ color: "#c49a58" }} aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < rating ? "★" : "☆"}</span>
      ))}
    </span>
  );
}

/* ─── Service card ─── */
function ServiceCard({
  title, body, href, linkLabel, imageSrc, imageAlt, priority = false,
}: {
  title: string; body: string; href: string; linkLabel: string;
  imageSrc: string; imageAlt: string; priority?: boolean;
}) {
  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-[4px] border transition-all duration-500 hover:-translate-y-1.5"
      style={{
        background: "#ffffff",
        borderColor: "rgba(0,0,0,0.07)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.055)",
      }}
      onMouseEnter={undefined}
    >
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 360px"
          priority={priority}
        />
        {/* Warm tint on hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "rgba(158,110,88,0.08)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 45%, rgba(14,18,12,0.3) 100%)" }}
          aria-hidden
        />
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-7 pb-8 pt-6">
        <h3
          className="text-ink"
          style={{ fontSize: "1.125rem", fontWeight: 500, letterSpacing: "-0.014em", lineHeight: 1.3 }}
        >
          {title}
        </h3>
        <p className="mt-3 flex-1 text-[15.5px] leading-[1.76] text-ink-muted">{body}</p>
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.1em] transition-all duration-200 group/link hover:gap-2.5"
          style={{ color: "var(--brand)" }}
        >
          {linkLabel.replace(/^→\s*/, "")}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}

/* ─── Wirkungsbereich card ─── */
function WirkungCard({
  icon, label, items, accentColor,
}: {
  icon: ReactNode; label: string; items: string[]; accentColor: string;
}) {
  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-[4px] border transition-all duration-400 hover:-translate-y-1"
      style={{
        background: "#ffffff",
        borderColor: "rgba(0,0,0,0.07)",
        boxShadow: "0 2px 14px rgba(0,0,0,0.06)",
      }}
    >
      {/* Accent top stripe */}
      <div style={{ height: "2px", background: accentColor, opacity: 0.65 }} aria-hidden />

      <div className="flex flex-1 flex-col p-6">
        {/* Icon square */}
        <div
          className="flex h-10 w-10 items-center justify-center rounded-[4px]"
          style={{
            background: `${accentColor}14`,
            color: accentColor,
          }}
        >
          {icon}
        </div>

        <h3
          className="mt-4 text-ink"
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
            opacity: 0.72,
          }}
        >
          {label}
        </h3>

        <ul className="mt-4 space-y-0">
          {items.map((item, i) => (
            <li
              key={item}
              className="flex items-center gap-2.5 py-2.5"
              style={{ borderTop: i > 0 ? "1px solid rgba(0,0,0,0.05)" : "none" }}
            >
              <span
                className="h-px w-3 shrink-0"
                style={{ background: accentColor, opacity: 0.45 }}
                aria-hidden
              />
              <span
                className="text-ink"
                style={{ fontSize: "14.5px", lineHeight: 1.42, opacity: 0.84 }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   PAGE
════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      {/* ── S1: HERO — dark full-bleed parallax ── */}
      <StorybrandHero />

      {/* ── S2: STAKES — subtle warm gradient, centered quote ── */}
      <section
        className="py-20 sm:py-24 md:py-32"
        style={{
          background: [
            "radial-gradient(ellipse 80% 80% at 50% -10%, rgba(215,185,148,0.38) 0%, transparent 58%),",
            "linear-gradient(180deg, #fdfaf5 0%, #f7f3ec 100%)",
          ].join(""),
        }}
      >
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-narrow)]">
          <SectionReveal>
            <p className="section-eyebrow text-center">Die Ausgangslage</p>
            <blockquote
              className="mx-auto mt-8 text-center text-ink"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(1.55rem, 3.4vw, 2.6rem)",
                lineHeight: 1.5,
                letterSpacing: "0.01em",
                maxWidth: "34ch",
              }}
            >
              «Unser Alltag ist voller Reize. Das Tempo ist hoch. Viele
              spüren, dass Körper und Geist aus dem Gleichgewicht geraten
              sind.»
            </blockquote>
            <p
              className="mx-auto mt-6 text-center text-ink-muted"
              style={{ fontSize: "16.5px", lineHeight: 1.78, maxWidth: "44ch" }}
            >
              Der erste Schritt zurück beginnt damit, sich bewusst Zeit zu
              nehmen und den Fokus wieder nach innen zu richten.
            </p>

            <div className="mt-10 flex items-center justify-center gap-4">
              <span
                className="h-px flex-1"
                style={{ background: "var(--line)", maxWidth: "72px" }}
                aria-hidden
              />
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--brand-complimentary)", opacity: 0.4 }}
                aria-hidden
              />
              <span
                className="h-px flex-1"
                style={{ background: "var(--line)", maxWidth: "72px" }}
                aria-hidden
              />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── S3: ANGEBOT — warm ivory with ambient glow bottom-left ── */}
      <section
        id="angebot"
        className="py-20 sm:py-24 md:py-32"
        style={{
          background: [
            "radial-gradient(ellipse 80% 60% at -5% 110%, rgba(200,170,135,0.32) 0%, transparent 52%),",
            "var(--paper)",
          ].join(""),
        }}
      >
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-max)]">
          <SectionReveal>
            <div className="flex items-end justify-between gap-6 sm:flex-row">
              <div>
                <p className="section-eyebrow">Das Angebot</p>
                <h2 className="section-title mt-2 max-w-[22ch]">
                  Was ich für dich bereithabe
                </h2>
              </div>
            </div>
          </SectionReveal>

          <div className="mt-12 grid gap-5 sm:mt-14 sm:gap-6 md:grid-cols-3">
            {[
              {
                title: "Hatha Yoga mit Pratyahara-Meditation",
                body: "Ein ganzheitliches System aus sanften Körperübungen, Atemtechniken und Yoga Nidra. Es hilft dabei, die Sinne von äusseren Reizen zurückzuziehen und tiefe Entspannung zu finden.",
                href: "/leistungen/yoga",
                linkLabel: "Details & Kurszeiten",
                imageSrc: "/images/legacy/photos/hatha-yoga-preview.jpg",
                imageAlt: "Hatha Yoga in Adligenswil",
              },
              {
                title: "Kinesiologie — Komplementärtherapie",
                body: "Durch gezielte Therapieeinheiten und den kinesiologischen Muskeltest werden physische, mentale und emotionale Blockaden gelöst. Ziel ist es, die Selbstregulation des Körpers zu stärken.",
                href: "/leistungen/kinesiologie",
                linkLabel: "Mehr zur Methode",
                imageSrc: "/images/legacy/photos/claudia-347.jpg",
                imageAlt: "Claudia Dimmler — Kinesiologie Adligenswil",
              },
              {
                title: "Sportkinesiologie",
                body: "Optimierung von Bewegungsabläufen und mentaler Stärke. Zur Leistungssteigerung, schnelleren Regeneration oder zur Vorbereitung auf Wettkämpfe.",
                href: "/leistungen/sport-kinesiologie",
                linkLabel: "Details für Sportler",
                imageSrc: "/images/legacy/wp/2022/10/DeinQuelle-1561-scaled.jpg",
                imageAlt: "Sportkinesiologie — Bewegung und Leistung",
              },
            ].map((card, i) => (
              <SectionReveal key={card.href} delay={i * 0.08} className="h-full">
                <ServiceCard {...card} priority={i === 0} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARALLAX QUOTE BAND — cinematic break ── */}
      <ParallaxQuoteBand />

      {/* ── S4: GUIDE (Claudia) — warm ecru, layered photos ── */}
      <section
        className="py-20 sm:py-24 md:py-32"
        style={{ background: "linear-gradient(160deg, #fdfaf5 0%, #f7f0e5 50%, #f3ebe0 100%)" }}
      >
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-max)]">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">

            {/* Layered photo composition */}
            <SectionReveal className="order-2 md:order-1">
              <div className="relative mx-auto max-w-[420px] pb-16 md:max-w-none md:pb-0">

                {/* Primary portrait */}
                <div
                  className="relative aspect-[3/4] w-[88%] overflow-hidden rounded-[4px] md:ml-auto"
                  style={{
                    boxShadow:
                      "0 28px 80px -16px rgba(58,92,61,0.28), 0 8px 24px -6px rgba(0,0,0,0.12)",
                  }}
                >
                  <Image
                    src="/images/legacy/photos/claudia-portrait-036.jpg"
                    alt="Claudia Dimmler — Komplementärtherapeutin und Yogalehrerin"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 78vw, 380px"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(14,26,16,0.18) 0%, transparent 40%)",
                    }}
                    aria-hidden
                  />
                </div>

                {/* Overlapping secondary photo */}
                <div
                  className="absolute -bottom-6 left-0 w-[52%] overflow-hidden rounded-[4px] border-[4px] border-white"
                  style={{
                    transform: "rotate(-2deg)",
                    boxShadow: "0 12px 48px rgba(58,92,61,0.22)",
                  }}
                >
                  <Image
                    src="/images/legacy/photos/claudia-149.jpg"
                    alt="Claudia Dimmler in der Praxis"
                    width={1920}
                    height={929}
                    className="h-auto w-full"
                    sizes="220px"
                  />
                </div>

                {/* Decorative glow */}
                <div
                  className="pointer-events-none absolute -right-4 top-8 h-36 w-36 rounded-full blur-3xl"
                  style={{ background: "rgba(58,92,61,0.22)" }}
                  aria-hidden
                />
              </div>
            </SectionReveal>

            {/* Text */}
            <SectionReveal className="order-1 md:order-2" delay={0.1}>
              <p className="section-eyebrow">Deine Begleitung</p>
              <h2 className="section-title mt-2">Über Claudia Dimmler</h2>

              <p
                className="mt-6 text-ink-muted"
                style={{ fontSize: "17px", lineHeight: 1.76 }}
              >
                Als diplomierte Komplementärtherapeutin und Yogalehrerin verbinde
                ich medizinisches Fachwissen mit feinstofflicher Arbeit. Ursprünglich
                als medizinische Praxisassistentin tätig, fand ich über Yoga Nidra
                und die Kinesiologie meinen eigenen Weg zu neuer Kraft und innerer Ruhe.
              </p>

              <ul className="mt-9 space-y-3.5">
                {[
                  "Dipl. Komplementärtherapeutin Kinesiologie AKT",
                  "Zertifizierte Satyananda Yoga® Lehrerin",
                  "Langjährige Erfahrung als Medizinische Praxisassistentin",
                  "Mitglied KineSuisse & EMR-anerkannt",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3"
                    style={{ fontSize: "15.5px", color: "var(--ink-muted)" }}
                  >
                    <span
                      className="h-px w-4 shrink-0"
                      style={{ background: "var(--brand)", opacity: 0.5 }}
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link
                  href="/ueber-mich"
                  className="group inline-flex h-[46px] items-center gap-3 rounded-[4px] border px-6 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-ink transition-all duration-300 hover:border-brand/30 hover:bg-brand/5"
                  style={{ borderColor: "rgba(0,0,0,0.12)" }}
                >
                  Mehr über mich
                  <span
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/5 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── S5: PLAN (3 Schritte) — paper-2 with top-right warmth ── */}
      <section
        className="py-20 sm:py-24 md:py-32"
        style={{
          background: [
            "radial-gradient(ellipse 75% 65% at 105% -5%, rgba(205,175,140,0.28) 0%, transparent 50%),",
            "var(--paper-2)",
          ].join(""),
        }}
      >
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-max)]">
          <SectionReveal>
            <p className="section-eyebrow">In 3 Schritten</p>
            <h2 className="section-title mt-2">So einfach geht es los</h2>
          </SectionReveal>

          <div className="relative mt-12 sm:mt-14">
            {/* Connector line */}
            <div
              className="pointer-events-none absolute inset-x-0 hidden md:block"
              style={{
                top: "50px",
                height: "1px",
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(58,92,61,0.18) 0px, rgba(58,92,61,0.18) 6px, transparent 6px, transparent 14px)",
              }}
              aria-hidden
            />

            <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
              {[
                {
                  num: "01",
                  title: "Termin wählen",
                  body: "Buche deine erste Sitzung oder Yogalektion unkompliziert über das Online-Tool.",
                  cta: { label: "Hier online buchen", href: site.bookingUrl, external: true },
                },
                {
                  num: "02",
                  title: "Ankommen & Analysieren",
                  body: "In der ersten Begegnung besprechen wir dein Anliegen und definieren gemeinsam den Weg.",
                  cta: null,
                },
                {
                  num: "03",
                  title: "Gleichgewicht finden",
                  body: "Durch gezielte Übungen oder Therapie lösen wir Blockaden und stärken deine Ressourcen nachhaltig.",
                  cta: null,
                },
              ].map((step, i) => (
                <SectionReveal key={step.num} delay={i * 0.1}>
                  <div
                    className="flex h-full flex-col rounded-[4px] border p-7 sm:p-8"
                    style={{
                      background: "#ffffff",
                      borderColor: "rgba(0,0,0,0.07)",
                      boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                    }}
                  >
                    <h3
                      className="text-ink"
                      style={{ fontSize: "1.125rem", fontWeight: 500, letterSpacing: "-0.012em" }}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[16px] leading-[1.76] text-ink-muted">
                      {step.body}
                    </p>
                    {step.cta && (
                      <a
                        href={step.cta.href}
                        target={step.cta.external ? "_blank" : undefined}
                        rel={step.cta.external ? "noopener noreferrer" : undefined}
                        className="mt-6 inline-flex h-[42px] items-center rounded-[4px] bg-brand px-5 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-brand-hover"
                      >
                        {step.cta.label}
                      </a>
                    )}
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── S6: WIRKUNGSBEREICHE — warm sand ── */}
      <section
        className="py-20 sm:py-24 md:py-32"
        style={{
          background:
            "linear-gradient(165deg, #f5ece0 0%, #f0e5d5 40%, #f7f0e6 80%, #f5ece0 100%)",
        }}
      >
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-max)]">
          <SectionReveal>
            <p className="section-eyebrow">Wirkungsbereiche</p>
            <h2 className="section-title mt-2">Wo Yoga & Kinesiologie helfen</h2>
            <p
              className="mt-4 text-ink-muted"
              style={{ maxWidth: "46ch", fontSize: "17px", lineHeight: 1.65 }}
            >
              Von Stressbewältigung bis Lebensübergängen — die Methoden sind
              vielseitig einsetzbar.
            </p>
          </SectionReveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 md:mt-14 md:grid-cols-4">
            {[
              {
                icon: <IconZap />,
                label: "Mental",
                items: ["Konzentration", "Motivation", "Selbstwert", "Stressbewältigung"],
                accentColor: "#3a5c3d",
              },
              {
                icon: <IconActivity />,
                label: "Körperlich",
                items: ["Schmerzen", "Verspannungen", "Schlafstörungen", "Erschöpfung"],
                accentColor: "#4e7250",
              },
              {
                icon: <IconClock />,
                label: "Lebensphasen",
                items: ["Kinderwunsch", "Schwangerschaft", "Pubertät", "Wechseljahre", "Neuorientierung"],
                accentColor: "#9e6e58",
              },
              {
                icon: <IconHeart />,
                label: "Emotionen",
                items: ["Ängste", "Stimmungsschwankungen", "Trauerverarbeitung"],
                accentColor: "#7a5c6e",
              },
            ].map((col, i) => (
              <SectionReveal key={col.label} delay={i * 0.08}>
                <WirkungCard {...col} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── S7: ERFOLG — paper with bottom-left amber warmth ── */}
      <section
        className="overflow-hidden py-20 sm:py-24 md:py-32"
        style={{
          background: [
            "radial-gradient(ellipse 85% 70% at 100% 105%, rgba(205,175,135,0.3) 0%, transparent 50%),",
            "var(--paper)",
          ].join(""),
        }}
      >
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-max)]">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">

            <SectionReveal>
              <p className="section-eyebrow">Was sich verändert</p>
              <h2 className="section-title mt-2">Dein Leben nach der Behandlung</h2>

              <ul className="mt-9 space-y-5 sm:mt-10">
                {[
                  "Du gewinnst an Klarheit und innerer Ruhe.",
                  "Dein Körper fühlt sich geschmeidiger und belastbarer an.",
                  "Du schläfst besser und startest mit mehr Energie in den Tag.",
                  "Du kennst Werkzeuge, um im Alltag gelassen zu bleiben.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span
                      className="mt-[7px] h-px w-5 shrink-0"
                      style={{ background: "var(--brand)", opacity: 0.55 }}
                      aria-hidden
                    />
                    <p style={{ fontSize: "17px", lineHeight: 1.68, color: "var(--ink)" }}>
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </SectionReveal>

            {/* Layered photos */}
            <SectionReveal delay={0.1}>
              <div className="relative mx-auto max-w-[400px] pb-16 md:max-w-none md:pb-0">
                <div
                  className="relative aspect-[4/5] overflow-hidden rounded-[4px]"
                  style={{
                    boxShadow:
                      "0 28px 80px -16px rgba(58,92,61,0.24), 0 6px 20px rgba(0,0,0,0.08)",
                  }}
                >
                  <Image
                    src="/images/legacy/photos/claudia-302.jpg"
                    alt="Claudia Dimmler — Wohlbefinden und Gleichgewicht"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 90vw, 420px"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(14,26,16,0.15), transparent 40%)",
                    }}
                    aria-hidden
                  />
                </div>

                <div
                  className="absolute -bottom-10 right-0 w-[52%] overflow-hidden rounded-[4px] border-[4px] border-white"
                  style={{
                    transform: "rotate(2deg)",
                    boxShadow: "0 12px 48px rgba(58,92,61,0.2)",
                  }}
                >
                  <Image
                    src="/images/legacy/wp/2022/10/20200419_131335101_iOS-scaled.jpg"
                    alt="Kinesiologie — Instrumente und Notizbücher"
                    width={2560}
                    height={1920}
                    className="h-auto w-full"
                    sizes="240px"
                  />
                </div>

                <div
                  className="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 rounded-full blur-3xl"
                  style={{ background: "rgba(58,92,61,0.2)" }}
                  aria-hidden
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── S8: TESTIMONIALS — warm mist ── */}
      {(() => {
        const reviewsWithText = getReviewsSorted(googleReviews).filter(
          (r) => r.reviewBody.trim().length > 5,
        );
        const featured = [...reviewsWithText].sort(
          (a, b) => b.reviewBody.length - a.reviewBody.length,
        )[0];
        const rest = reviewsWithText.filter((r) => r !== featured);

        if (!featured) return null;

        return (
          <section
            className="py-20 sm:py-24 md:py-32"
            style={{
              background:
                "linear-gradient(180deg, #fdfaf5 0%, #f8f3ea 50%, #f5efea 100%)",
            }}
          >
            <div className="page-gutter mx-auto w-full max-w-[var(--layout-max)]">
              <SectionReveal>
                <p className="section-eyebrow">Kundenstimmen</p>
                <h2 className="section-title mt-2">Was meine Klientinnen sagen</h2>
                <p
                  className="mt-4 text-ink-muted"
                  style={{ fontSize: "16.5px", lineHeight: 1.72 }}
                >
                  Echte Stimmen von Google — ungekürzt und unverändert.
                </p>
              </SectionReveal>

              <div className="mt-12 space-y-5 sm:mt-14 sm:space-y-6">
                {/* Featured review */}
                <SectionReveal>
                  <figure
                    className="relative overflow-hidden rounded-[4px] border p-8 sm:p-12 md:p-14"
                    style={{
                      background: "#ffffff",
                      borderColor: "rgba(0,0,0,0.06)",
                      boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* Oversized opening quote — atmosphere only */}
                    <div
                      className="pointer-events-none absolute right-8 top-0 select-none leading-none"
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: "11rem",
                        fontWeight: 300,
                        color: "var(--brand)",
                        opacity: 0.06,
                        lineHeight: 1,
                      }}
                      aria-hidden
                    >
                      &ldquo;
                    </div>

                    <div className="mb-5 flex items-center gap-2">
                      <StarRow rating={featured.reviewRating} />
                      <span className="sr-only">{featured.reviewRating} von 5 Sternen</span>
                    </div>

                    <blockquote>
                      <p
                        className="max-w-3xl whitespace-pre-line text-ink"
                        style={{
                          fontFamily: "var(--font-cormorant)",
                          fontWeight: 300,
                          fontStyle: "italic",
                          fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                          lineHeight: 1.66,
                          letterSpacing: "0.004em",
                        }}
                      >
                        {featured.reviewBody}
                      </p>
                    </blockquote>

                    <figcaption className="mt-8 flex items-center gap-3">
                      <div
                        className="h-px w-6"
                        style={{
                          background: "var(--brand-complimentary)",
                          opacity: 0.45,
                        }}
                        aria-hidden
                      />
                      <div>
                        <p
                          className="text-ink"
                          style={{ fontSize: "13px", fontWeight: 600 }}
                        >
                          {featured.authorName}
                        </p>
                        <p
                          className="mt-0.5 text-ink-muted"
                          style={{ fontSize: "11.5px" }}
                        >
                          <time dateTime={featured.datePublished}>
                            {formatReviewDate(featured.datePublished)}
                          </time>
                          {" · Google"}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </SectionReveal>

                {/* Secondary reviews */}
                {rest.length > 0 && (
                  <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                    {rest.map((r, i) => (
                      <SectionReveal
                        key={`${r.authorName}-${r.datePublished}`}
                        delay={(i + 1) * 0.07}
                      >
                        <figure
                          className="flex h-full flex-col rounded-[4px] border p-7 sm:p-8"
                          style={{
                            background: "#ffffff",
                            borderColor: "rgba(0,0,0,0.06)",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                          }}
                        >
                          <div className="mb-4 flex items-center gap-2">
                            <StarRow rating={r.reviewRating} />
                            <span className="sr-only">{r.reviewRating} von 5 Sternen</span>
                          </div>
                          <blockquote className="flex-1">
                            <p
                              className="whitespace-pre-line text-ink"
                              style={{
                                fontFamily: "var(--font-cormorant)",
                                fontWeight: 300,
                                fontStyle: "italic",
                                fontSize: "clamp(1.05rem, 2.2vw, 1.2rem)",
                                lineHeight: 1.65,
                              }}
                            >
                              {r.reviewBody}
                            </p>
                          </blockquote>
                          <figcaption
                            className="mt-5 border-t pt-4"
                            style={{ borderColor: "rgba(0,0,0,0.06)" }}
                          >
                            <p
                              className="text-ink"
                              style={{ fontSize: "13.5px", fontWeight: 600 }}
                            >
                              {r.authorName}
                            </p>
                            <p
                              className="mt-0.5 text-ink-muted"
                              style={{ fontSize: "12.5px" }}
                            >
                              <time dateTime={r.datePublished}>
                                {formatReviewDate(r.datePublished)}
                              </time>
                              {" · Google"}
                            </p>
                          </figcaption>
                        </figure>
                      </SectionReveal>
                    ))}
                  </div>
                )}
              </div>

              <SectionReveal delay={0.15} className="mt-10 text-center">
                <Link
                  href="/bewertungen"
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[4px] border px-6 text-[13.5px] font-semibold text-brand transition hover:border-brand/40 hover:bg-brand/5"
                  style={{ borderColor: "rgba(58,92,61,0.28)" }}
                >
                  Alle Bewertungen ansehen
                  <span aria-hidden>→</span>
                </Link>
              </SectionReveal>
            </div>
          </section>
        );
      })()}

      {/* ── S9: PRAKTISCHE INFOS — warm sand, leads into dark CTA ── */}
      <section
        className="py-20 sm:py-24 md:py-32"
        style={{
          background: "linear-gradient(180deg, #f5ece0 0%, #f2e9dc 100%)",
        }}
      >
        <div className="page-gutter mx-auto w-full max-w-[var(--layout-max)]">
          <SectionReveal>
            <p className="section-eyebrow">Praktische Infos</p>
            <h2 className="section-title mt-2">Krankenkasse & Anreise</h2>
          </SectionReveal>

          <div className="mt-12 grid gap-6 sm:mt-14 md:grid-cols-2 md:gap-8">
            <SectionReveal delay={0.05}>
              <div
                className="rounded-[4px] border p-7 sm:p-8"
                style={{
                  background: "rgba(253,250,245,0.85)",
                  backdropFilter: "blur(4px)",
                  borderColor: "rgba(0,0,0,0.07)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
              >
                <h3
                  className="text-ink"
                  style={{ fontSize: "1.0625rem", fontWeight: 500, letterSpacing: "-0.01em" }}
                >
                  Krankenkasse & Abrechnung
                </h3>
                <p
                  className="mt-4 text-ink-muted"
                  style={{ fontSize: "15.5px", lineHeight: 1.78 }}
                >
                  Die Kinesiologie ist eine anerkannte Methode der
                  Komplementärtherapie. Ich bin EMR-zertifiziert, weshalb die
                  Kosten in der Regel über die Zusatzversicherung abgerechnet
                  werden können. Bitte kläre dies vorab mit deiner Kasse.
                </p>
                <p
                  className="mt-3 text-ink-muted"
                  style={{ fontSize: "15.5px", lineHeight: 1.78 }}
                >
                  Als Partnerin von CSS Coin biete ich entsprechende Vorteile für
                  CSS-Versicherte.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-6">
                  <Image
                    src="/images/legacy/logos/emr-zertifiziert.png"
                    alt="EMR zertifiziert"
                    width={130}
                    height={40}
                    className="opacity-50"
                  />
                  <Image
                    src="/images/legacy/logos/kinesuisse.png"
                    alt="KineSuisse"
                    width={120}
                    height={38}
                    className="opacity-50"
                  />
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div
                className="rounded-[4px] border p-7 sm:p-8"
                style={{
                  background: "rgba(253,250,245,0.85)",
                  backdropFilter: "blur(4px)",
                  borderColor: "rgba(0,0,0,0.07)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
              >
                <h3
                  className="text-ink"
                  style={{ fontSize: "1.0625rem", fontWeight: 500, letterSpacing: "-0.01em" }}
                >
                  Anreise & Standort
                </h3>
                <p
                  className="mt-4 text-ink-muted"
                  style={{ fontSize: "15.5px", lineHeight: 1.78 }}
                >
                  Praxis an der{" "}
                  <strong className="font-medium text-ink">
                    Meggerstrasse 4a in Adligenswil.
                  </strong>{" "}
                  Kostenlose Parkplätze direkt vor dem Haus.
                </p>
                <p
                  className="mt-3 text-ink-muted"
                  style={{ fontSize: "15.5px", lineHeight: 1.78 }}
                >
                  Mit dem ÖV: Postauto 73 bis Haltestelle{" "}
                  <em>«Sagi»</em>.
                </p>
                <a
                  href={site.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex h-[42px] items-center gap-2 rounded-[4px] border px-5 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-ink transition hover:border-black/[0.2] hover:bg-black/[0.03]"
                  style={{ borderColor: "rgba(0,0,0,0.12)" }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  Route planen
                </a>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── S10: FINAL CTA — dark forest, echoes hero ── */}
      <section
        className="relative overflow-hidden py-28 sm:py-32 md:py-40"
        style={{
          background: "linear-gradient(160deg, #0e1a10 0%, #0b1509 100%)",
        }}
      >
        {/* Warm glows */}
        <div
          className="pointer-events-none absolute -right-36 -top-36 h-[520px] w-[520px] rounded-full blur-[130px]"
          style={{ background: "rgba(58,92,61,0.22)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-28 -left-28 h-[380px] w-[380px] rounded-full blur-[110px]"
          style={{ background: "rgba(158,110,88,0.13)" }}
          aria-hidden
        />
        {/* Grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden
        />

        <div className="page-gutter relative z-[1] mx-auto w-full max-w-[var(--layout-narrow)] text-center">
          <SectionReveal>
            {/* Claudia avatar */}
            <div className="flex justify-center">
              <div
                className="relative h-20 w-20 overflow-hidden rounded-full"
                style={{
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow: "0 4px 40px rgba(0,0,0,0.5)",
                }}
              >
                <Image
                  src="/images/legacy/wp/2022/10/claudia_dimmler_cj_2022-140_klein.jpg"
                  alt="Claudia Dimmler"
                  fill
                  className="object-cover object-top"
                  sizes="80px"
                />
              </div>
            </div>

            <p
              className="mt-8 uppercase"
              style={{
                fontSize: "9.5px",
                fontWeight: 600,
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              Nächster Schritt
            </p>

            <h2
              className="mt-5 text-balance text-white"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 300,
                fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
                lineHeight: 1.06,
                letterSpacing: "0.005em",
              }}
            >
              Bereit für deinen
              <br />
              <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.65)" }}>
                ersten Schritt?
              </em>
            </h2>

            <p
              className="mx-auto mt-7"
              style={{
                fontSize: "15.5px",
                lineHeight: 1.78,
                color: "rgba(255,255,255,0.52)",
                maxWidth: "42ch",
              }}
            >
              Egal ob du Entspannung suchst oder gezielt an einem
              gesundheitlichen Thema arbeiten möchtest — ich freue mich
              auf dich.
            </p>

            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-11 inline-flex h-[52px] items-center justify-center gap-3 rounded-[4px] bg-[var(--paper)] px-9 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-ink transition-all duration-300 hover:bg-white active:scale-[0.97]"
              style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.42)" }}
            >
              Termin online buchen
              <span
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/6 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              >
                →
              </span>
            </a>

            <p
              className="mt-9"
              style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}
            >
              <a
                href={`tel:${site.phoneTel}`}
                className="transition hover:text-white/55"
              >
                {site.phone}
              </a>
              {" · "}
              <a
                href={`mailto:${site.email}`}
                className="transition hover:text-white/55"
              >
                {site.email}
              </a>
            </p>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
