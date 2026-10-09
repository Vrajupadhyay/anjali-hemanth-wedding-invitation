import { useEffect, useRef } from "react";
import { wedding } from "@/config/wedding";
import { Heart, Reveal } from "./parts";

// Gently wandering vertical line, in a 100 x 1000 coordinate space
const PATH = "M50 0 C 58 80, 42 160, 50 250 S 60 420, 48 500 S 40 680, 52 760 S 56 920, 50 1000";

export function Timeline() {
  const wrap = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const heart = useRef<HTMLDivElement>(null);
  const markers = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const w = wrap.current, p = path.current, h = heart.current;
      if (!w || !p || !h) return;
      const r = w.getBoundingClientRect();
      const total = p.getTotalLength();
      markers.current.forEach((m) => {
        if (!m) return;
        const li = m.parentElement;
        if (!li) return;
        const fy = ((li.offsetTop + li.offsetHeight / 2) / w.offsetHeight) * 1000;
        let lo = 0, hi = total;
        for (let k = 0; k < 20; k++) { const mid = (lo + hi) / 2; if (p.getPointAtLength(mid).y < fy) lo = mid; else hi = mid; }
        m.style.left = `${p.getPointAtLength(lo).x}%`;
      });
      const t = Math.min(1, Math.max(0, (window.innerHeight * 0.55 - r.top) / r.height));
      const len = p.getTotalLength();
      const pt = p.getPointAtLength(len * t);
      h.style.left = `${pt.x}%`;
      h.style.top = `${pt.y / 10}%`;
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  return (
    <div ref={wrap} className="relative mx-auto max-w-3xl">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden>
        <path ref={path} d={PATH} fill="none" stroke="var(--sage-deep)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <div ref={heart} className="absolute z-10 -translate-x-1/2 -translate-y-1/2 text-sage-deep drop-shadow-sm transition-[top,left] duration-200 ease-out">
        <Heart size={22} />
      </div>

      <ol className="relative">
        {wedding.events.map((e, i) => {
          const left = i % 2 === 0;
          return (
            <li key={i} className="relative grid grid-cols-[minmax(0,1fr)_20%_minmax(0,1fr)] py-9 sm:py-12">
              <span ref={(el) => { markers.current[i] = el; }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sage-deep/70">
                <Heart size={10} />
              </span>
              <Reveal className={`min-w-0 break-words ${left ? "col-start-1 pr-3 text-right sm:pr-6" : "col-start-3 pl-3 text-left sm:pl-6"}`}>
                <h3 className="text-xl leading-tight text-ink sm:text-3xl">{e.name}</h3>
                <p className="mt-2 text-base italic text-brown sm:text-lg">{e.date}</p>
                <p className="font-caps mt-1 text-[0.62rem] text-gold">{e.time}</p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
