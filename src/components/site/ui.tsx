import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue, useInView } from "framer-motion";
import { Link } from "react-router-dom";

export function SplitText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pr-[0.25em]">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Reveal({ children, delay = 0, y = 30 }: { children: React.ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function MaskReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.1, ease: [0.85, 0, 0.15, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref}>{val.toLocaleString("de-DE")}{suffix}</span>;
}

type AnyTo = string;

export function MagneticBtn({ children, to, href, variant = "primary" }: { children: React.ReactNode; to?: AnyTo; href?: string; variant?: "primary" | "ghost" }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });
  const className =
    "inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors " +
    (variant === "primary"
      ? "bg-primary text-primary-foreground glow hover:brightness-110"
      : "border border-border text-foreground hover:bg-secondary");
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  if (to) {
    return (
      <motion.span style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
        <Link to={to} ref={ref as never} className={className}>{children}</Link>
      </motion.span>
    );
  }
  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export function Orbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
      <div className="absolute top-[20%] -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" style={{ animation: "float-orb 14s ease-in-out infinite" }} />
      <div className="absolute bottom-[10%] -right-40 h-[28rem] w-[28rem] rounded-full bg-primary-glow/15 blur-3xl" style={{ animation: "float-orb 18s ease-in-out infinite reverse" }} />
    </div>
  );
}

/**
 * Premium placeholder frame. Used wherever real photo/video content
 * will be added later. Intentionally cinematic, never feels "empty".
 */
export function PlaceholderFrame({
  label = "Real content folgt",
  hint,
  className = "",
  tone = "default",
  ratio = "aspect-[4/5]",
}: {
  label?: string;
  hint?: string;
  className?: string;
  tone?: "default" | "warm" | "deep";
  ratio?: string;
}) {
  const grad =
    tone === "warm"
      ? "linear-gradient(135deg, oklch(0.2 0.05 50 / 0.9), oklch(0.13 0.02 270))"
      : tone === "deep"
      ? "linear-gradient(135deg, oklch(0.18 0.04 270 / 0.9), oklch(0.1 0.02 270))"
      : "linear-gradient(135deg, oklch(0.2 0.03 270 / 0.9), oklch(0.12 0.02 270))";
  return (
    <div className={`relative ${ratio} rounded-3xl overflow-hidden glass ${className}`}>
      <div className="absolute inset-0" style={{ background: grad }} />
      <div
        className="absolute inset-0 opacity-50"
        style={{ background: "radial-gradient(60% 60% at 30% 20%, oklch(0.72 0.2 45 / 0.25), transparent 70%)" }}
      />
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent 0 12px, oklch(1 0 0 / 0.02) 12px 13px)",
        }}
      />
      <div className="absolute inset-3 rounded-2xl border border-border/60" />
      <div className="absolute inset-0 grid place-items-center p-6 text-center">
        <div>
          <div className="mx-auto mb-4 h-10 w-10 rounded-full bg-primary/15 grid place-items-center text-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-primary mb-2">Coming soon</div>
          <div className="font-display text-base sm:text-lg font-semibold">{label}</div>
          {hint && <div className="mt-2 text-xs text-muted-foreground max-w-[22ch] mx-auto leading-relaxed">{hint}</div>}
        </div>
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span>BROS · Marl</span>
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
          </span>
          Live bald
        </span>
      </div>
    </div>
  );
}

/** Cinematic page hero used on every sub-page. */
export function PageHero({
  eyebrow,
  title,
  italic,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  subtitle?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <section ref={ref} className="relative pt-40 pb-24 overflow-hidden">
      <Orbs />
      <motion.div style={{ y, opacity }} className="mx-auto max-w-7xl px-4 relative">
        <Reveal>
          <div className="inline-flex items-center gap-3 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            {eyebrow}
          </div>
        </Reveal>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-[7rem] leading-[0.95] font-bold tracking-tight">
          <SplitText text={title} />
          {italic && (
            <>
              <br />
              <span className="font-serif-display text-gradient italic">
                <SplitText text={italic} delay={0.2} />
              </span>
            </>
          )}
        </h1>
        {subtitle && (
          <Reveal delay={0.6}>
            <p className="mt-8 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          </Reveal>
        )}
      </motion.div>
    </section>
  );
}

export { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue, useInView };