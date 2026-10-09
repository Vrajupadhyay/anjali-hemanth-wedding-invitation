import { useState } from "react";
import { wedding } from "@/config/wedding";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const open = () => {
    if (opening) return;
    setOpening(true);
    onOpen();
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-envelope transition-opacity duration-[1400ms] ${opening ? "pointer-events-none opacity-0 delay-[900ms]" : ""}`}
    >
      {/* top flap */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 origin-top bg-envelope-dark transition-transform duration-[1200ms] ease-in-out ${opening ? "-translate-y-full" : ""}`}
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 40%, 50% 100%, 0 40%)" }}
      />
      {/* bottom flap */}
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-envelope transition-transform duration-[1200ms] ease-in-out ${opening ? "translate-y-full" : ""}`}
        style={{ clipPath: "polygon(0 60%, 50% 0, 100% 60%, 100% 100%, 0 100%)", filter: "brightness(1.04)" }}
      />
      <div className="pointer-events-none absolute inset-6 rounded-sm border border-gold/50" />

      <div className={`relative z-10 flex flex-col items-center transition-all duration-700 ${opening ? "scale-110 opacity-0" : ""}`}>
        <p className="font-caps mb-8 text-[0.65rem] text-brown">You are invited</p>
        <button
          type="button"
          onClick={open}
          aria-label="Open the invitation"
          className="seal-pulse relative h-44 w-44 rounded-full border-[3px] border-gold bg-ivory p-2 transition-transform duration-500 hover:scale-105 sm:h-56 sm:w-56"
        >
          <span className="absolute inset-1 rounded-full border border-gold/60" />
          <img
            src={wedding.images.monogram}
            alt="A & H monogram"
            className="h-full w-full rounded-full object-contain object-center bg-transparent"
          />
        </button>
        <p className="font-caps mt-8 text-[0.6rem] text-brown">Tap the seal to open</p>
      </div>
    </div>
  );
}
