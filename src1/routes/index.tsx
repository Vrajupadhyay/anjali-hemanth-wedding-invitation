import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { wedding } from "@/config/wedding";
import { Envelope } from "@/components/wedding/Envelope";
import { Music, type MusicHandle } from "@/components/wedding/Music";
import { Timeline } from "@/components/wedding/Timeline";
import { Heart, Ornament, Petals, Reveal, useParallax } from "@/components/wedding/parts";
import peacock from "@/assets/peacock.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${wedding.bride.first} & ${wedding.groom.first} — Wedding Invitation` },
      { name: "description", content: `You are warmly invited to celebrate the wedding of ${wedding.bride.first} & ${wedding.groom.first} on ${wedding.dateLabel} at ${wedding.venue.name}.` },
      { property: "og:title", content: `${wedding.bride.first} & ${wedding.groom.first} are getting married` },
      { property: "og:description", content: `${wedding.dateLabel} · ${wedding.venue.name}, Gujarat` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [opened, setOpened] = useState(false);
  const [dark, setDark] = useState(false);
  const music = useRef<MusicHandle>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
  }, [opened]);

  return (
    <main className="relative overflow-x-hidden">
      {!opened && <Envelope onOpen={() => { music.current?.play(); setTimeout(() => setOpened(true), 1800); }} />}
      {opened && <Petals />}

      <div className="fixed right-4 top-4 z-40 flex gap-2">
        <button
          type="button"
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle day and night"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gold bg-ivory/80 text-gold backdrop-blur"
        >
          {dark ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
          )}
        </button>
        <Music ref={music} visible={opened} />
      </div>

      <Hero dark={dark} />
      <Countdown />
      <Welcome />
      <Celebrations />
      <Venue />
      <CoupleFrame />
      <DressCode />
      <Closing />
    </main>
  );
}

function Hero({ dark }: { dark: boolean }) {
  const px = useParallax(-0.25);
  return (
    <section className="relative flex h-[100svh] min-h-[600px] items-center justify-center overflow-hidden text-center">
      <div ref={px} className="absolute inset-0">
        <img src={wedding.images.heroNight} alt="" className={`absolute inset-0 h-full w-full object-cover blur-[2px] transition-opacity duration-1000 ${dark ? "opacity-100" : "opacity-0"}`} />
        <img src={wedding.images.heroDay} alt="" className={`absolute inset-0 h-full w-full object-cover blur-[2px] transition-opacity duration-1000 ${dark ? "opacity-0" : "opacity-100"}`} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background" />
      <div className="relative z-10 px-6">
        <Reveal><p className="font-caps text-[0.65rem] text-gold">Together with their families</p></Reveal>
        <Reveal delay={200}>
          <h1 className="font-script mt-6 text-7xl leading-[0.9] text-ink sm:text-9xl">
            {wedding.bride.first}
            <span className="block py-2 font-serif text-3xl italic text-gold sm:text-4xl">&amp;</span>
            {wedding.groom.first}
          </h1>
        </Reveal>
        <Reveal delay={450}>
          <p className="font-caps mt-8 text-xs text-ink sm:text-sm">Are getting married</p>
          <Ornament className="my-5" />
          <p className="text-xl italic text-brown sm:text-2xl">{wedding.dateLabel}</p>
        </Reveal>
      </div>
      <a href="#countdown" className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center text-gold">
        <span className="font-caps block text-[0.6rem]">Scroll</span>
        <svg className="scroll-nudge mx-auto mt-2" width="14" height="22" viewBox="0 0 14 22" fill="none" stroke="currentColor"><path d="M7 1v19M1 14l6 6 6-6" /></svg>
      </a>
    </section>
  );
}

function useCountdown(target: string) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = now === null ? 0 : Math.max(0, new Date(target).getTime() - now);
  return [
    { v: Math.floor(diff / 864e5), l: "Days" },
    { v: Math.floor(diff / 36e5) % 24, l: "Hours" },
    { v: Math.floor(diff / 6e4) % 60, l: "Minutes" },
    { v: Math.floor(diff / 1e3) % 60, l: "Seconds" },
  ];
}

function Countdown() {
  const parts = useCountdown(wedding.countdownTarget);
  return (
    <section id="countdown" className="relative overflow-hidden px-4 py-24 sm:py-32">
      <img src={peacock} alt="" aria-hidden className="pointer-events-none absolute -left-16 top-1/2 w-40 -translate-y-1/2 opacity-60 sm:left-0 sm:w-64 lg:left-[8%]" loading="lazy" width={768} height={1152} />
      <img src={peacock} alt="" aria-hidden className="pointer-events-none absolute -right-16 top-1/2 w-40 -translate-y-1/2 -scale-x-100 opacity-60 sm:right-0 sm:w-64 lg:right-[8%]" loading="lazy" width={768} height={1152} />
      <Reveal className="relative mx-auto max-w-xl">
        <div className="scallop px-6 py-12 text-center sm:px-12 sm:py-16">
          <p className="font-caps text-[0.65rem] text-gold">Countdown</p>
          <div className="mt-8 grid grid-cols-4 gap-2 sm:gap-6">
            {parts.map((p) => (
              <div key={p.l}>
                <div className="text-4xl tabular-nums text-ink sm:text-6xl">{String(p.v).padStart(2, "0")}</div>
                <div className="font-caps mt-2 text-[0.5rem] text-brown sm:text-[0.6rem]">{p.l}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Parent({ name, father, mother, rel }: { name: string; father: string; mother: string; rel: string }) {
  return (
    <div>
      <h2 className="font-script text-6xl leading-tight text-ink sm:text-7xl">{name}</h2>
      <p className="mt-3 text-lg italic text-brown">{rel} {father}</p>
      <p className="font-caps my-1 text-[0.55rem] text-gold">and</p>
      <p className="text-lg italic text-brown">{mother}</p>
    </div>
  );
}

function Welcome() {
  return (
    <section className="bg-sage px-6 py-24 text-center sm:py-32">
      <Reveal>
        <p className="mx-auto max-w-md text-2xl italic leading-relaxed text-ink sm:text-3xl">
          {wedding.welcome.map((l) => <span key={l} className="block">{l}</span>)}
        </p>
      </Reveal>
      <Ornament className="my-14" />
      <Reveal>
        <Parent name={wedding.bride.full} father={wedding.bride.father} mother={wedding.bride.mother} rel="D/o" />
      </Reveal>
      <Reveal className="my-10 flex items-center justify-center gap-3 text-gold">
        <span className="gold-rule w-12" /><Heart size={12} /><span className="font-caps text-[0.6rem]">with</span><Heart size={12} /><span className="gold-rule w-12" />
      </Reveal>
      <Reveal>
        <Parent name={wedding.groom.full} father={wedding.groom.father} mother={wedding.groom.mother} rel="S/o" />
      </Reveal>
    </section>
  );
}

function Celebrations() {
  return (
    <section className="px-4 py-24 sm:py-32">
      <Reveal className="mb-16 text-center">
        <p className="font-caps text-[0.6rem] text-gold">Wedding dates</p>
        <h2 className="font-script mt-4 text-6xl text-ink sm:text-7xl">The Celebrations</h2>
        <Ornament className="mt-6" />
      </Reveal>
      <Timeline />
    </section>
  );
}

function Venue() {
  return (
    <section className="bg-sage px-6 py-24 text-center sm:py-32">
      <Reveal className="mb-12">
        <p className="font-caps text-[0.6rem] text-gold">The venue</p>
        <h2 className="font-script mt-4 text-6xl text-ink sm:text-7xl">Where it all unfolds</h2>
      </Reveal>
      <Reveal className="mx-auto max-w-5xl">
        <div className="gold-frame mx-auto max-w-4xl overflow-hidden rounded-[2rem] p-3">
          <img src={wedding.images.resort} alt={wedding.venue.name} className="aspect-[16/10] w-full rounded-[1.5rem] object-cover object-center" loading="lazy" />
        </div>
      </Reveal>
      <Reveal className="mx-auto mt-12 max-w-md rounded-[2rem] border border-gold/60 bg-ivory/55 px-6 py-8 backdrop-blur-sm">
        <h3 className="font-caps text-sm text-ink sm:text-base">{wedding.venue.name}</h3>
        <p className="mt-4 text-lg italic leading-relaxed text-brown">{wedding.venue.address}</p>
        <a href={wedding.venue.mapsUrl} target="_blank" rel="noreferrer" className="pill-outline mt-8">View location</a>
      </Reveal>
    </section>
  );
}

function CoupleFrame() {
  const px = useParallax(0.12);
  return (
    <section className="relative overflow-hidden pb-4">
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative h-[74svh] min-h-[460px] overflow-hidden rounded-[2.2rem] border border-gold/70 bg-ivory/10 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]">
          <div ref={px} className="absolute inset-0">
            <img src={wedding.images.couple} alt={`${wedding.bride.first} and ${wedding.groom.first}`} className="h-full w-full object-cover object-center" loading="lazy" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/15 to-transparent" />
        </div>
      </div>
      <Reveal className="relative -mt-16 px-6 pb-20">
        <div className="mx-auto max-w-sm rounded-[2rem] border border-gold bg-ivory/90 px-8 pb-10 pt-12 text-center outline outline-1 outline-offset-[6px] outline-gold backdrop-blur">
          <h2 className="font-script text-6xl leading-[0.95] text-ink">
            {wedding.bride.first}
            <span className="block font-serif text-2xl italic text-gold">&amp;</span>
            {wedding.groom.first}
          </h2>
          <Ornament className="my-5" />
          <p className="font-caps text-[0.6rem] text-brown">{wedding.framedDateLabel}</p>
        </div>
      </Reveal>
    </section>
  );
}

function DressCode() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <Reveal className="mb-14 text-center">
        <p className="font-caps text-[0.6rem] text-gold">A few gentle reminders</p>
        <h2 className="font-script mt-4 text-6xl text-ink sm:text-7xl">Dress Code</h2>
        <Ornament className="mt-6" />
      </Reveal>
      <div className="mx-auto max-w-3xl divide-y divide-gold/40 border-y border-gold/40">
        {wedding.dressCode.map((d) => (
          <Reveal key={d.fn} className="grid gap-3 py-9 text-center sm:grid-cols-[1fr_1.2fr] sm:items-center sm:gap-10 sm:text-left">
            <div>
              <p className="font-caps text-[0.58rem] text-gold">{d.icon} {d.fn}</p>
              <h3 className="mt-2 text-3xl italic text-ink">{d.theme}</h3>
            </div>
            <div>
              <div className="flex justify-center gap-2 sm:justify-start">
                {d.swatches.map((c) => (
                  <span key={c} className="h-6 w-6 rounded-full border border-gold/60" style={{ background: c }} />
                ))}
              </div>
              <p className="mt-3 text-base italic text-brown">{d.colors.join(" · ")}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Closing() {
  const c = wedding.closing;
  const px = useParallax(0.1);
  return (
    <section className="relative overflow-hidden px-6 py-28 text-center sm:py-36">
      <div ref={px} className="absolute inset-0">
        <img src={wedding.images.couple} alt="" aria-hidden className="h-full w-full object-cover opacity-20 blur-sm" loading="lazy" />
      </div>
      <div className="absolute inset-0 bg-sage/80" />
      <div className="relative mx-auto max-w-xl">
        <Reveal>
          <h2 className="font-script text-5xl leading-tight text-ink sm:text-6xl">{c.title}</h2>
          <Ornament className="my-8" />
          <p className="text-xl italic leading-relaxed text-brown sm:text-2xl">
            {c.quote.map((l) => <span key={l} className="block">{l}</span>)}
          </p>
        </Reveal>
        <div className="mt-16 space-y-8">
          {c.family.map((f, i) => (
            <Reveal key={f.names} delay={i * 120}>
              <p className="text-2xl text-ink">{f.names}</p>
              <p className="font-caps mt-1 text-[0.55rem] text-gold">{f.relation}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-20">
          <p className="font-script text-5xl text-ink sm:text-6xl">{c.signature}</p>
          <p className="mt-5 text-lg italic text-brown">{c.signoff.map((l) => <span key={l} className="block">{l}</span>)}</p>
          <Ornament className="mt-10" />
          <p className="font-caps mt-6 text-[0.55rem] text-gold">{wedding.hashtag}</p>
        </Reveal>
      </div>
    </section>
  );
}
