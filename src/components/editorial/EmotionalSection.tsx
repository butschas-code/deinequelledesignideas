import type { ReactNode } from "react";

type Variant = "dawn" | "meadow" | "mist" | "warmWhite" | "appleWhite" | "appleGray";

const variants: Record<
  Variant,
  { className: string; innerGlow?: string }
> = {
  /**
   * Warm sand — sits one step deeper than paper.
   * Used for high-contrast "feature" sections.
   */
  dawn: {
    className:
      "bg-[linear-gradient(165deg,#f5ece0_0%,#f0e5d5_40%,#f7f0e6_80%,#f5ece0_100%)]",
  },
  /**
   * Warm ecru — slightly lighter than dawn, gentle lift above base paper.
   */
  meadow: {
    className:
      "bg-[linear-gradient(160deg,#fdfaf5_0%,#f7f0e5_45%,#f3ebe0_100%)]",
  },
  /**
   * Soft warm mist — barely-there tint, closest to paper-2.
   */
  mist: {
    className:
      "bg-[linear-gradient(180deg,#fdfaf5_0%,#f8f3ea_50%,#f5efea_100%)]",
  },
  warmWhite: {
    className: "bg-[linear-gradient(180deg,#fdfaf5_0%,#f7f3ec_100%)]",
  },
  /** Flächig, wie apple.com Produktseiten — ohne Verlaufs-Busy */
  appleWhite: {
    className: "bg-white",
  },
  appleGray: {
    className: "bg-[#f5f5f7]",
  },
};

type Props = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  /** Zusätzlicher radialer Schimmer */
  radialAccent?: boolean;
};

/**
 * Sektion mit warmem Verlauf + optional weichem Lichtfleck.
 */
export function EmotionalSection({
  variant = "dawn",
  children,
  className = "",
  radialAccent = true,
}: Props) {
  const v = variants[variant];
  const showRadial =
    radialAccent && variant !== "appleWhite" && variant !== "appleGray";
  return (
    <section className={`relative overflow-hidden ${v.className} ${className}`}>
      {showRadial ? (
        <>
          {/* Warm honey glow — top-right */}
          <div
            className="pointer-events-none absolute -right-[15%] -top-[10%] h-[min(380px,48vh)] w-[min(460px,52vw)] rounded-full blur-[96px]"
            style={{ background: "radial-gradient(circle, rgba(198,158,110,0.09), transparent 68%)" }}
            aria-hidden
          />
          {/* Warm terracotta glow — bottom-left */}
          <div
            className="pointer-events-none absolute -left-[12%] bottom-0 h-[min(320px,42vh)] w-[min(420px,48vw)] rounded-full blur-[80px]"
            style={{ background: "radial-gradient(circle, rgba(158,110,88,0.07), transparent 66%)" }}
            aria-hidden
          />
        </>
      ) : null}
      <div className="relative z-[1]">{children}</div>
    </section>
  );
}
