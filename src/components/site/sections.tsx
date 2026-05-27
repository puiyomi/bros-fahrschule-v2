import { useRef, useState } from "react";
import heroCar from "@/assets/hero-car.jpg";
import motoRider from "@/assets/moto-rider.jpg";
import {
  SplitText, Reveal, MaskReveal, CountUp, MagneticBtn, Orbs, PlaceholderFrame,
  motion, useScroll, useTransform, AnimatePresence,
} from "./ui";
import { reviews, why, courses, steps, team, faqs } from "./data";

/* -------------------------------- HOME HERO -------------------------------- */

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden flex items-center pt-28 pb-16">
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
        <img src={heroCar} alt="BROS Fahrschule Marl bei Nacht" className="h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, oklch(0.09 0.015 270 / 0.55) 0%, oklch(0.09 0.015 270 / 0.7) 55%, oklch(0.09 0.015 270) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(50% 60% at 70% 40%, oklch(0.72 0.2 45 / 0.35), transparent 70%)" }} />
      </motion.div>
      <motion.div style={{ opacity }} className="mx-auto max-w-7xl px-4 w-full grid lg:grid-cols-12 gap-10 items-center relative">
        <div className="lg:col-span-8">
          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              Marl · Carl-Duisberg-Straße 57 · jetzt offen
            </div>
          </Reveal>
          <h1 className="font-display text-[3.2rem] sm:text-7xl lg:text-[7rem] leading-[0.92] font-bold tracking-tight">
            <SplitText text="Wir sind doch" />
            <br />
            <SplitText text="nur ’ne" delay={0.15} />{" "}
            <span className="font-serif-display text-primary italic">
              <SplitText text="Fahrschule." delay={0.3} />
            </span>
            <span className="block mt-3 text-muted-foreground text-2xl sm:text-4xl lg:text-5xl font-medium">
              <SplitText text="Oder?" delay={0.55} />
            </span>
          </h1>
          <Reveal delay={0.9}>
            <p className="mt-8 max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed">
              Modern. Entspannt. Erfolgreich. Keine Abzocke, kein Druck — sondern echte Unterstützung bis zur Prüfung. Für Auto und Motorrad.
            </p>
          </Reveal>
          <Reveal delay={1.05}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <MagneticBtn to="/kontakt">Jetzt starten →</MagneticBtn>
              <MagneticBtn to="/fuehrerschein" variant="ghost">Führerschein entdecken</MagneticBtn>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-4 grid gap-3">
          {[
            { k: "4,9 ★", v: "100+ Google-Bewertungen" },
            { k: "100+", v: "glückliche Fahrschüler:innen" },
            { k: "Auto & Bike", v: "Alle Klassen, ein Team" },
            { k: "0 Stress", v: "Stressfrei zum Lappen" },
          ].map((c, i) => (
            <motion.div
              key={c.k}
              initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.1 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              className="glass rounded-2xl p-4 flex items-center gap-4"
            >
              <div className="text-xl sm:text-2xl font-display font-bold text-gradient whitespace-nowrap">{c.k}</div>
              <div className="text-sm text-muted-foreground">{c.v}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 pb-4 overflow-hidden mask-fade-x">
        <div className="flex gap-12 whitespace-nowrap" style={{ animation: "marquee 28s linear infinite" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 text-sm uppercase tracking-[0.3em] text-muted-foreground/60 font-display">
              <span>Stressfrei</span><span className="text-primary">●</span>
              <span>Auf Augenhöhe</span><span className="text-primary">●</span>
              <span>Modern</span><span className="text-primary">●</span>
              <span>Ehrlich</span><span className="text-primary">●</span>
              <span>Locker</span><span className="text-primary">●</span>
            </div>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </div>
    </section>
  );
}

/* -------------------------------- counters -------------------------------- */

export function Counters() {
  const items = [
    { n: 100, s: "+", label: "Fahrschüler:innen begleitet" },
    { n: 49, s: "/50", label: "Google Score" },
    { n: 7, s: " Jahre", label: "in Marl etabliert" },
    { n: 12, s: "+", label: "Führerscheinklassen" },
  ];
  return (
    <section className="border-y border-border bg-surface/40 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-16 grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-4">
        {items.map((it, i) => (
          <Reveal key={it.label} delay={i * 0.08}>
            <div className="text-center lg:text-left">
              <div className="font-display font-bold text-5xl sm:text-6xl text-gradient">
                <CountUp to={it.n} />{it.s}
              </div>
              <div className="mt-3 text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground">{it.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* --------------------------- kinetic statement ---------------------------- */

export function KineticStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-40%"]);
  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <Orbs />
      <motion.div style={{ x }} className="whitespace-nowrap font-display font-bold text-[18vw] leading-none tracking-tighter">
        Mehr als Fahrschule <span className="text-gradient font-serif-display italic">— eine Bewegung. </span>
        Mehr als Fahrschule <span className="text-gradient font-serif-display italic">— eine Bewegung.</span>
      </motion.div>
    </section>
  );
}

/* ------------------------------ social proof ------------------------------ */

export function SocialProof() {
  return (
    <section id="bewertungen" className="relative py-32">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="flex items-end justify-between gap-6 flex-wrap mb-14">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">Echte Stimmen · echte Menschen</p>
              <h2 className="font-display text-4xl sm:text-6xl font-bold leading-[1.02]">
                Über <span className="font-serif-display text-gradient">100 Fahrschüler:innen</span><br />
                empfehlen Bros weiter.
              </h2>
            </div>
            <div className="glass rounded-3xl p-5 flex items-center gap-4 glow">
              <div className="text-6xl font-display font-bold text-gradient leading-none">4,9</div>
              <div className="text-sm text-muted-foreground">★★★★★<br />Google Bewertungen</div>
            </div>
          </div>
        </Reveal>
        <div className="space-y-5 mask-fade-x">
          {[reviews, [...reviews].reverse()].map((row, idx) => (
            <div key={idx} className="flex gap-5 whitespace-nowrap" style={{ animation: `marquee ${idx === 0 ? 50 : 65}s linear infinite ${idx === 1 ? "reverse" : ""}` }}>
              {[...row, ...row].map((r, i) => (
                <div key={i} className="glass rounded-3xl p-6 w-[340px] shrink-0 whitespace-normal">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary-glow grid place-items-center font-semibold text-primary-foreground text-sm">
                      {r.name.split(" ").map((s) => s[0]).join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{r.name}</div>
                      <div className="text-[10px] text-primary tracking-widest">★★★★★ · Google</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">„{r.text}“</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- community ------------------------------- */

export function Community() {
  return (
    <section className="relative py-32 overflow-hidden">
      <Orbs />
      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">Mehr als Fahrschule</p>
            <h2 className="font-display text-5xl sm:text-6xl font-bold leading-[0.95]">
              Du lernst nicht nur fahren.<br />
              <span className="font-serif-display text-gradient">Du gehörst dazu.</span>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg max-w-md leading-relaxed">
              Eine Community, die dich wirklich unterstützt. Egal ob erste Fahrstunde, Prüfungsangst oder Wechsel von einer anderen Fahrschule — bei uns bist du nie allein im Auto.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { n: 7, s: "+", l: "Jahre Erfahrung" },
                { n: 98, s: "%", l: "Bestehensquote" },
                { n: 5, s: "★", l: "Mentoring-Vibe" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-display font-bold text-gradient"><CountUp to={s.n} suffix={s.s} /></div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-7 grid grid-cols-6 grid-rows-6 gap-3 aspect-[5/4]">
          <MaskReveal className="col-span-4 row-span-4 rounded-3xl overflow-hidden relative glow">
            <PlaceholderFrame
              label="Community Snapshot"
              hint="Hier wird bald ein echtes Foto aus unserem Fahrschulalltag stehen."
              ratio="h-full w-full"
              tone="warm"
            />
          </MaskReveal>
          <MaskReveal className="col-span-2 row-span-3 rounded-3xl overflow-hidden">
            <img src={motoRider} alt="Motorrad" className="h-full w-full object-cover" loading="lazy" />
          </MaskReveal>
          <Reveal delay={0.3}>
            <div className="col-span-2 row-span-3 rounded-3xl glass p-6 flex flex-col justify-between h-full">
              <span className="text-primary text-[10px] uppercase tracking-[0.3em]">Vibe Check</span>
              <p className="font-serif-display text-2xl leading-tight">„Hier kommt man <span className="text-gradient">gerne hin.</span>“</p>
              <span className="text-xs text-muted-foreground">— Sena, Google</span>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="col-span-4 row-span-2 rounded-3xl glass p-6 flex items-center justify-between gap-4">
              <div>
                <div className="font-display text-xl sm:text-2xl font-bold">Wir sind doch nur ’ne Fahrschule.</div>
                <div className="text-muted-foreground text-sm">Spoiler: sind wir nicht.</div>
              </div>
              <MagneticBtn to="/kontakt">Komm vorbei →</MagneticBtn>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- why ---------------------------------- */

export function Why() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">Why BROS</p>
          <h2 className="font-display text-4xl sm:text-6xl font-bold max-w-3xl leading-[1.02]">
            Nicht wie andere Fahrschulen.<br />
            <span className="font-serif-display text-gradient">Versprochen.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {why.map((w, i) => (
            <Reveal key={w.t} delay={i * 0.06}>
              <motion.div whileHover={{ y: -8 }} className="group relative glass rounded-3xl p-8 h-full overflow-hidden">
                <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/25 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="text-5xl font-serif-display text-gradient mb-6">{(i + 1).toString().padStart(2, "0")}</div>
                <h3 className="text-xl font-display font-semibold mb-2">{w.t}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{w.d}</p>
                <div className="mt-6 h-px w-12 bg-primary/40 group-hover:w-24 transition-all duration-500" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- courses --------------------------------- */

export function Courses() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">Führerscheinklassen</p>
              <h2 className="font-display text-4xl sm:text-6xl font-bold max-w-3xl leading-[1.02]">
                Welche Klasse passt zu <span className="font-serif-display text-gradient">dir</span>?
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground">Auto, Motorrad, Anhänger – wir haben alles. Und falls du dir nicht sicher bist: einfach kurz beraten lassen.</p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.05}>
              <motion.div whileHover={{ y: -8 }} className="block glass rounded-3xl p-6 h-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/0 group-hover:from-primary/15 group-hover:to-primary/0 transition-colors duration-500" />
                <div className="relative">
                  <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-primary border border-primary/40 rounded-full px-2.5 py-1">{c.tag}</span>
                  <h3 className="mt-6 font-display text-2xl font-bold">{c.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed min-h-[3rem]">{c.d}</p>
                  <div className="mt-6 text-primary text-sm font-semibold flex items-center gap-2">Mehr erfahren →</div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- steps ---------------------------------- */

export function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineScale = useTransform(scrollYProgress, [0.2, 0.85], [0, 1]);
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">So läuft’s</p>
          <h2 className="font-display text-4xl sm:text-6xl font-bold max-w-3xl leading-[1.02]">
            In 4 Schritten <span className="font-serif-display text-gradient">zum Lappen.</span>
          </h2>
        </Reveal>
        <div className="mt-20 relative" ref={ref}>
          <div className="absolute hidden lg:block top-8 left-[10%] right-[10%] h-px bg-border" />
          <motion.div style={{ scaleX: lineScale, transformOrigin: "0% 50%" }} className="absolute hidden lg:block top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-primary via-primary-glow to-primary" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="relative">
                  <div className="relative h-16 w-16 rounded-full bg-surface border border-primary/40 grid place-items-center mx-auto">
                    <span className="font-display font-bold text-gradient">{s.n}</span>
                    <div className="absolute inset-0 rounded-full ring-1 ring-primary/40 animate-pulse" />
                  </div>
                  <div className="mt-8 text-center">
                    <h3 className="font-display text-xl font-semibold">{s.t}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- team ----------------------------------- */

export function Team() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">Das Team</p>
          <h2 className="font-display text-4xl sm:text-6xl font-bold max-w-3xl leading-[1.02]">
            Mentoren statt nur <span className="font-serif-display text-gradient">Fahrlehrer.</span>
          </h2>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            Echte Menschen, echte Storys. Die Portraits unseres Teams folgen bald — bis dahin: ein erster Vorgeschmack.
          </p>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {team.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <motion.div whileHover={{ y: -10 }} className="group relative rounded-3xl overflow-hidden glow">
                <PlaceholderFrame
                  label={`Portrait ${p.name}`}
                  hint="Echtes Foto folgt – wir wollen es richtig machen."
                  ratio="aspect-[3/4]"
                  tone={i === 1 ? "deep" : "warm"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
                <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
                  <span className="text-[10px] tracking-[0.3em] uppercase glass rounded-full px-3 py-1">0{i + 1}</span>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-primary">@bros</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="text-xs uppercase tracking-[0.3em] text-primary">{p.role}</div>
                  <h3 className="font-display text-4xl font-bold mt-2">{p.name}</h3>
                  <p className="mt-3 font-serif-display text-lg text-muted-foreground italic">„{p.quote}“</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- reels ---------------------------------- */

export function Reels() {
  const videos = ["/videos/reel-1.mp4", "/videos/reel-2.mp4", "/videos/reel-3.mp4", "/videos/reel-4.mp4"];
  const captions = [
    "POV: erste Fahrstunde mit Müco 😮‍💨🔥",
    "Wenn Musa „nochmal links“ sagt 💀",
    "Theorie bestanden — Energie: ungefiltert ✨",
    "Bike-Klasse hits different 🏍️",
  ];
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">@bros.fahrschule · live feed</p>
              <h2 className="font-display text-4xl sm:text-6xl font-bold max-w-3xl leading-[1.02]">
                Fahrschule trifft <span className="font-serif-display text-gradient">Social Media.</span>
              </h2>
              <p className="mt-5 text-muted-foreground max-w-xl">Echte Fahrstunden. Echte Erfolge. Echter Vibe — direkt aus unserem Feed.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="https://instagram.com/bros.fahrschule" target="_blank" rel="noreferrer" className="rounded-full border border-border px-5 py-3 text-sm hover:bg-secondary transition">Instagram ↗</a>
              <a href="https://tiktok.com/@bros.fahrschule" target="_blank" rel="noreferrer" className="rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm hover:brightness-110 transition glow">TikTok folgen ↗</a>
            </div>
          </div>
        </Reveal>
      </div>
      <div className="relative mask-fade-x">
        <div className="flex gap-5 overflow-x-auto px-4 sm:px-10 pb-8 snap-x snap-mandatory scrollbar-hide">
          {videos.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
              className="snap-center shrink-0 w-[280px] sm:w-[340px] aspect-[9/16] rounded-[2.2rem] overflow-hidden relative glass glow group"
            >
              <video src={src} autoPlay muted loop playsInline className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/10 to-background/50 pointer-events-none" />
              {/* top bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-primary via-primary-glow to-primary blur-[1px] opacity-90" />
                    <div className="relative h-9 w-9 rounded-full bg-background grid place-items-center text-primary font-bold text-xs ring-2 ring-background">B</div>
                  </div>
                  <div className="leading-tight">
                    <div className="text-xs font-semibold">bros.fahrschule</div>
                    <div className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">Marl · folge uns</div>
                  </div>
                </div>
                <button className="text-[10px] uppercase tracking-widest bg-primary text-primary-foreground rounded-full px-3 py-1 font-semibold">Folgen</button>
              </div>
              {/* right action rail (TikTok style) */}
              <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4 text-white/90">
                {[
                  { i: "♥", n: `${(i + 1) * 213}` },
                  { i: "💬", n: `${(i + 1) * 18}` },
                  { i: "↗", n: "Teilen" },
                ].map((a) => (
                  <div key={a.i} className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full glass grid place-items-center text-base">{a.i}</div>
                    <span className="text-[10px] mt-1 font-semibold">{a.n}</span>
                  </div>
                ))}
              </div>
              {/* caption */}
              <div className="absolute bottom-4 left-4 right-20">
                <div className="text-sm font-semibold leading-snug">{captions[i]}</div>
                <div className="mt-1.5 text-[11px] text-muted-foreground flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span>♪ original sound — bros.fahrschule</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- stories --------------------------------- */

export function Stories() {
  const items = [
    { label: "Bestanden", emoji: "🎉", tone: "from-primary to-primary-glow" },
    { label: "BTS Team", emoji: "🎬", tone: "from-fuchsia-500 to-primary" },
    { label: "Bikes", emoji: "🏍️", tone: "from-amber-400 to-rose-500" },
    { label: "Theorie", emoji: "📚", tone: "from-sky-400 to-violet-500" },
    { label: "Marl", emoji: "🌃", tone: "from-emerald-400 to-cyan-500" },
    { label: "Wins", emoji: "🏆", tone: "from-yellow-300 to-primary" },
    { label: "Müco", emoji: "🧿", tone: "from-rose-400 to-fuchsia-600" },
    { label: "Musa", emoji: "🔥", tone: "from-orange-400 to-red-500" },
    { label: "Emre", emoji: "⚡", tone: "from-lime-300 to-emerald-500" },
  ];
  return (
    <section className="relative py-10 border-y border-border/60 bg-surface/30">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-5">
          <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Story Highlights</div>
          <a href="https://instagram.com/bros.fahrschule" target="_blank" rel="noreferrer" className="text-[10px] uppercase tracking-[0.3em] text-primary hover:underline">@bros.fahrschule ↗</a>
        </div>
        <div className="flex gap-5 sm:gap-7 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
          {items.map((it, i) => (
            <motion.a
              key={it.label}
              href="https://instagram.com/bros.fahrschule"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-2 shrink-0"
            >
              <div className={`relative h-20 w-20 sm:h-24 sm:w-24 rounded-full p-[3px] bg-gradient-to-tr ${it.tone}`}>
                <div className="h-full w-full rounded-full bg-background grid place-items-center text-3xl ring-2 ring-background">
                  {it.emoji}
                </div>
              </div>
              <span className="text-xs font-medium tracking-wide">{it.label}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------ faq ----------------------------------- */

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-4xl px-4">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">FAQ</p>
          <h2 className="font-display text-4xl sm:text-6xl font-bold leading-[1.02]">
            Du hast Fragen?<br />
            <span className="font-serif-display text-gradient">Wir haben Antworten.</span>
          </h2>
        </Reveal>
        <div className="mt-14 space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <div className="glass rounded-2xl overflow-hidden">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-6 text-left">
                  <span className="font-display text-lg font-semibold">{f.q}</span>
                  <span className={"h-9 w-9 grid place-items-center rounded-full bg-primary/15 text-primary transition-transform shrink-0 " + (open === i ? "rotate-45" : "")}>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- final cta --------------------------------- */

export function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 100]);
  return (
    <section ref={ref} className="relative py-40 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <img src={motoRider} alt="" className="h-full w-full object-cover opacity-35" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(60% 60% at 50% 50%, oklch(0.72 0.2 45 / 0.35), transparent 70%), linear-gradient(180deg, oklch(0.09 0.015 270 / 0.85), oklch(0.06 0.01 270))" }} />
      </motion.div>
      <div className="mx-auto max-w-5xl px-4 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-6">Ready?</p>
        </Reveal>
        <h2 className="font-display text-5xl sm:text-7xl lg:text-[7rem] font-bold leading-[0.95]">
          <SplitText text="Bereit für deinen" />
          <br />
          <SplitText text="Führerschein" delay={0.15} />{" "}
          <span className="font-serif-display text-gradient">
            <SplitText text="ohne Stress?" delay={0.3} />
          </span>
        </h2>
        <Reveal delay={0.8}>
          <p className="mt-8 text-lg text-muted-foreground max-w-xl mx-auto">
            Schreib uns kurz — wir melden uns schnell zurück. Kein Verkaufsdruck, nur ehrliche Antworten.
          </p>
        </Reveal>
        <Reveal delay={0.95}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <MagneticBtn href="https://wa.me/4923652999194">WhatsApp →</MagneticBtn>
            <MagneticBtn to="/kontakt" variant="ghost">Jetzt anmelden</MagneticBtn>
            <MagneticBtn to="/fuehrerschein" variant="ghost">Alle Klassen ansehen</MagneticBtn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- contact ---------------------------------- */

export function Contact() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">Kontakt</p>
          <h2 className="font-display text-5xl sm:text-7xl font-bold leading-[0.95]">
            Sag <span className="font-serif-display text-gradient">Hi.</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">Komm vorbei, ruf an oder schreib uns. Wir sind locker – versprochen.</p>
          <div className="mt-12 grid sm:grid-cols-2 gap-4">
            <div className="glass rounded-2xl p-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">Adresse</div>
              <div className="font-semibold">BROS Fahrschule</div>
              <div className="text-sm text-muted-foreground">Carl-Duisberg-Straße 57<br />45772 Marl</div>
            </div>
            <div className="glass rounded-2xl p-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">Direkt erreichbar</div>
              <a href="tel:023652999194" className="block font-semibold hover:text-primary">02365 / 2999194</a>
              <a href="mailto:info@bros-fahrschule.de" className="block text-sm text-muted-foreground hover:text-primary mt-1">info@bros-fahrschule.de</a>
            </div>
            <div className="glass rounded-2xl p-5 sm:col-span-2">
              <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">Öffnungszeiten</div>
              <div className="grid grid-cols-2 gap-y-1.5 text-sm">
                <span className="text-muted-foreground">Mo – Di</span><span>12:00 – 19:00</span>
                <span className="text-muted-foreground">Mi – Do</span><span>12:00 – 19:00</span>
                <span className="text-muted-foreground">Freitag</span><span>11:00 – 19:00</span>
                <span className="text-muted-foreground">Sa & So</span><span>geschlossen</span>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <form onSubmit={(e) => { e.preventDefault(); alert("Danke! Wir melden uns ganz schnell bei dir."); }} className="glass rounded-3xl p-7 space-y-4 glow">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Dein Name</span>
                <input required className="mt-2 w-full bg-surface/60 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition" placeholder="Max Mustermann" />
              </label>
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Telefon / WhatsApp</span>
                <input required className="mt-2 w-full bg-surface/60 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition" placeholder="0151 …" />
              </label>
            </div>
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Welche Klasse?</span>
              <select className="mt-2 w-full bg-surface/60 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition">
                <option>Klasse B (Auto)</option>
                <option>Klasse B197 (Automatik)</option>
                <option>BF17 (mit 17)</option>
                <option>Motorrad A / A1 / A2</option>
                <option>B196 (125 ccm)</option>
                <option>Anhänger BE</option>
                <option>Intensivkurs</option>
                <option>Bin mir nicht sicher</option>
              </select>
            </label>
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Deine Nachricht</span>
              <textarea rows={4} className="mt-2 w-full bg-surface/60 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition" placeholder="Sag uns kurz, wo du stehst – wir melden uns zurück." />
            </label>
            <button type="submit" className="w-full rounded-full bg-primary text-primary-foreground py-4 font-semibold hover:brightness-110 transition glow">
              Kostenlos beraten lassen →
            </button>
            <p className="text-xs text-muted-foreground text-center">Wir melden uns meistens innerhalb weniger Stunden. Kein Spam, versprochen.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}