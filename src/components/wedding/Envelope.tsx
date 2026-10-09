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
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-envelope-back transition-opacity duration-[1400ms] ${opening ? "pointer-events-none opacity-0 delay-[900ms]" : ""}`}
    >
      <div className="flex w-full max-w-2xl flex-col items-center px-8">
        {/* envelope card */}
        <div
          className={`relative w-full transition-all duration-[1100ms] ease-in-out ${opening ? "translate-y-10 opacity-0" : ""}`}
          style={{ perspective: "1200px" }}
        >
          <div
            className="relative aspect-[8/5] w-full overflow-hidden rounded-[4px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]"
            style={{
              background:
                "linear-gradient(160deg, color-mix(in oklab, var(--envelope-dark) 88%, black) 0%, var(--envelope-dark) 55%, color-mix(in oklab, var(--envelope-dark) 80%, black) 100%)",
            }}
          >
            {/* side fold shading */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, rgba(0,0,0,0.28) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.28) 100%)",
              }}
            />
            {/* bottom fold shading */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.22) 0%, transparent 35%)",
              }}
            />
            {/* top flap */}
            <div
              className={`absolute inset-x-0 top-0 h-[62%] origin-top transition-transform duration-[1100ms] ease-in-out ${opening ? "[transform:rotateX(160deg)]" : ""}`}
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background:
                  "linear-gradient(to bottom, color-mix(in oklab, var(--envelope) 92%, white) 0%, var(--envelope) 70%, color-mix(in oklab, var(--envelope) 82%, black) 100%)",
                boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
              }}
            />
          </div>

          {/* wax seal */}
          <button
            type="button"
            onClick={open}
            aria-label="Open the invitation"
            className={`seal-pulse absolute left-1/2 top-[62%] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold bg-envelope p-1 shadow-[0_0_0_10px_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-700 hover:scale-105 sm:h-24 sm:w-24 ${opening ? "scale-125 opacity-0" : ""}`}
          >
            <span className="absolute inset-1 rounded-full border border-gold/70" />
            <img
              src={wedding.images.monogram}
              alt="A & H monogram"
              className="h-full w-full scale-[1.6] rounded-full object-cover object-[50%_42%]"
            />
          </button>
        </div>

        <p
          className={`font-caps mt-14 text-center text-[0.7rem] tracking-[0.35em] text-gold transition-opacity duration-500 sm:text-xs ${opening ? "opacity-0" : ""}`}
        >
          Touch the center to unveil
        </p>
      </div>
    </div>
  );
}
