import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { wedding } from "@/config/wedding";

type YTPlayer = { playVideo: () => void; pauseVideo: () => void; setVolume: (v: number) => void };
declare global {
  interface Window { YT?: { Player: new (el: HTMLElement, o: object) => YTPlayer }; onYouTubeIframeAPIReady?: () => void }
}

export type MusicHandle = { play: () => void };

export const Music = forwardRef<MusicHandle, { visible: boolean }>(function Music({ visible }, ref) {
  const host = useRef<HTMLDivElement>(null);
  const player = useRef<YTPlayer | null>(null);
  const pending = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const create = () => {
      if (!host.current || !window.YT) return;
      player.current = new window.YT.Player(host.current, {
        videoId: wedding.musicYoutubeId,
        playerVars: { loop: 1, playlist: wedding.musicYoutubeId, controls: 0, playsinline: 1 },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            e.target.setVolume(60);
            if (pending.current) { e.target.playVideo(); setPlaying(true); }
          },
        },
      });
    };
    if (window.YT?.Player) create();
    else {
      window.onYouTubeIframeAPIReady = create;
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(s);
    }
  }, []);

  const play = () => {
    if (player.current?.playVideo) { player.current.playVideo(); setPlaying(true); }
    else pending.current = true;
  };
  useImperativeHandle(ref, () => ({ play }));

  const toggle = () => {
    if (playing) { player.current?.pauseVideo(); setPlaying(false); } else play();
  };

  return (
    <>
      <div className="pointer-events-none fixed -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
        <div ref={host} />
      </div>
      {visible && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause music" : "Play music"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gold bg-ivory/80 text-gold backdrop-blur"
        >
          {playing ? (
            <span className="flex h-3.5 items-end gap-[3px]">
              {[0, 1, 2].map((i) => (
                <span key={i} className="w-[2px] animate-pulse bg-gold" style={{ height: `${60 + i * 20}%`, animationDelay: `${i * 0.2}s` }} />
              ))}
            </span>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>
      )}
    </>
  );
});
