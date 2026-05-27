import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from "framer-motion";
import { nav } from "./data";

export function Grain() {
  return <div className="grain" aria-hidden />;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary-glow to-primary z-[55]"
    />
  );
}

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 30, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 30, mass: 0.3 });
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const m = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const enter = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest?.("a,button,[data-cursor='hover']")) setHover(true);
    };
    const leave = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest?.("a,button,[data-cursor='hover']")) setHover(false);
    };
    window.addEventListener("mousemove", m);
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);
    return () => {
      window.removeEventListener("mousemove", m);
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
    };
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-[70] hidden lg:block"
    >
      <motion.div
        animate={{ scale: hover ? 2.5 : 1, opacity: hover ? 0.5 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="-translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary mix-blend-difference"
      />
    </motion.div>
  );
}

export function Preloader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1500);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background grid place-items-center"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.0, ease: [0.85, 0, 0.15, 1] }}
        >
          <div className="text-center">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-6xl sm:text-8xl font-bold"
              >
                BROS<span className="text-primary">.</span>
              </motion.div>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="mt-6 h-px w-40 mx-auto bg-primary origin-left"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-3 text-xs uppercase tracking-[0.4em] text-muted-foreground"
            >
              Anschnallen · seit 2018
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f();
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        f();
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={"fixed top-0 left-0 right-0 z-50 transition-all " + (scrolled ? "py-3" : "py-5")}>
      <div className="mx-auto max-w-7xl px-4">
        <div className={"glass rounded-full flex items-center justify-between px-5 py-3 transition-all " + (scrolled ? "shadow-2xl" : "")}>
          <Link to="/" className="flex items-center gap-2">
            <span className="grid place-items-center h-9 w-9 rounded-full bg-primary text-primary-foreground font-extrabold">B</span>
            <span className="font-display font-bold tracking-tight text-lg hidden sm:inline">BROS<span className="text-primary">.</span></span>
          </Link>
          <nav className="hidden lg:flex items-center gap-7 text-sm text-muted-foreground">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end
                className={({ isActive }) =>
                  "hover:text-foreground transition-colors relative group " +
                  (isActive ? "text-foreground" : "")
                }
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/kontakt" className="hidden md:inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold hover:brightness-110 transition">
              Jetzt starten →
            </Link>
            <button aria-label="Menü" onClick={() => setOpen((v) => !v)} className="lg:hidden h-10 w-10 grid place-items-center rounded-full border border-border">
              <div className="space-y-1.5">
                <span className={"block h-0.5 w-5 bg-foreground transition " + (open ? "translate-y-2 rotate-45" : "")} />
                <span className={"block h-0.5 w-5 bg-foreground transition " + (open ? "opacity-0" : "")} />
                <span className={"block h-0.5 w-5 bg-foreground transition " + (open ? "-translate-y-2 -rotate-45" : "")} />
              </div>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-3 glass rounded-3xl p-5 grid gap-1"
            >
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end
                  className={({ isActive }) =>
                    "py-3 border-b border-border/60 last:border-0 flex items-center justify-between " +
                    (isActive ? "text-primary" : "text-foreground/90")
                  }
                >
                  <span>{n.label}</span>
                  <span className="text-muted-foreground">→</span>
                </NavLink>
              ))}
              <Link to="/kontakt" className="mt-3 rounded-full bg-primary text-primary-foreground text-center py-3 font-semibold">
                Jetzt starten
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-border pt-20 pb-12 bg-surface/40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <div className="font-display font-bold leading-none text-[18vw] sm:text-[14vw] tracking-tighter text-gradient pointer-events-none select-none">
          BROS.
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-8 items-start">
          <div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Modern. Locker. Erfolgreich. Deine Fahrschule in Marl – für Auto und Motorrad.
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            <div className="text-foreground font-semibold mb-3 uppercase text-xs tracking-[0.3em]">Menü</div>
            <div className="grid grid-cols-2 gap-y-2">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} className="hover:text-primary transition-colors">{n.label}</Link>
              ))}
            </div>
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed">
            <div className="text-foreground font-semibold mb-3 uppercase text-xs tracking-[0.3em]">Kontakt</div>
            Carl-Duisberg-Straße 57<br />
            45772 Marl<br />
            02365 / 2999194<br />
            info@bros-fahrschule.de
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-wrap justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} BROS Fahrschule · Wir sind doch nur ’ne Fahrschule. Oder?</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-primary">Impressum</a>
            <a href="#" className="hover:text-primary">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/4923652999194"
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.8, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-primary text-primary-foreground grid place-items-center glow shadow-2xl"
    >
      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 relative">
        <path d="M20.52 3.48A11.93 11.93 0 0012.04 0C5.48 0 .15 5.34.15 11.91c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.66a11.86 11.86 0 005.73 1.46h.01c6.56 0 11.9-5.34 11.9-11.91 0-3.18-1.24-6.17-3.42-8.41zM12.05 21.6h-.01a9.7 9.7 0 01-4.95-1.36l-.36-.21-3.74.98 1-3.65-.23-.37a9.7 9.7 0 01-1.5-5.18c0-5.36 4.37-9.72 9.74-9.72 2.6 0 5.04 1.01 6.88 2.85a9.65 9.65 0 012.85 6.88c0 5.36-4.37 9.72-9.69 9.72zm5.6-7.28c-.31-.16-1.82-.9-2.1-1-.28-.1-.49-.16-.7.16-.2.31-.8 1-.97 1.2-.18.21-.36.23-.67.08-.31-.15-1.3-.48-2.48-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.14-.63.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.7-1.69-.96-2.32-.25-.61-.51-.53-.7-.54l-.6-.01c-.21 0-.55.08-.83.39-.28.31-1.09 1.07-1.09 2.6 0 1.54 1.12 3.02 1.27 3.23.16.21 2.2 3.36 5.34 4.71.75.32 1.33.51 1.79.66.75.24 1.43.21 1.97.13.6-.09 1.82-.74 2.07-1.46.26-.72.26-1.34.18-1.47-.08-.13-.28-.21-.59-.36z" />
      </svg>
    </motion.a>
  );
}