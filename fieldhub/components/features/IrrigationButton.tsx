"use client";

import { ChevronRight } from "lucide-react";

type Props = {
  irrigating: boolean;
  onClick: () => void;
};

export default function IrrigationButton({ irrigating, onClick }: Props) {
  return (
    <div className="px-[22px] pt-5">
      <button
        onClick={onClick}
        className={`w-full px-[22px] py-5 rounded-[18px] cursor-pointer text-left flex items-center gap-4 transition-all duration-200 ${
          irrigating
            ? "border-0 text-bg shadow-[0_8px_30px_rgba(34,197,94,0.25)]"
            : "border border-white/[0.06] text-fg shadow-none bg-surface"
        }`}
        style={irrigating ? { background: "linear-gradient(180deg,#22c55e 0%,#16a34a 100%)" } : undefined}
      >
        <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${irrigating ? "bg-black/[0.18]" : "bg-accent/[0.12]"}`}>
          <PowerIcon on={irrigating} />
        </div>
        <div className="flex-1">
          <div className="text-[17px] font-semibold tracking-[-0.3px]">
            {irrigating ? "Parar irrigação" : "Ligar irrigador"}
          </div>
          <div className="text-[13px] opacity-70 mt-0.5">
            {irrigating ? "Toque para encerrar agora" : "Acionar manualmente · 15 min"}
          </div>
        </div>
        <ChevronRight size={16} color={irrigating ? "#0a0a0a" : "#737373"} />
      </button>
    </div>
  );
}

function PowerIcon({ on }: { on: boolean }) {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill={on ? "#0a0a0a" : "#22c55e"}>
      <path d="M12 3a1 1 0 0 1 1 1v8a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Zm-5.4 3.5a1 1 0 0 1 0 1.4A6 6 0 1 0 18 12a6 6 0 0 0-1.6-4.1 1 1 0 1 1 1.5-1.3A8 8 0 1 1 5.2 6.5a1 1 0 0 1 1.4 0Z" />
    </svg>
  );
}
