"use client";

import { Signal, Zap } from "lucide-react";
import { Label, LiveDot, SolarPanel } from "@/components/ui/shared";

const battery = 87;
const signal = 96;

type Props = {
  irrigating: boolean;
  onConfigure: () => void;
};

export default function DeviceCard({ irrigating, onConfigure }: Props) {
  return (
    <div className="px-[22px] pt-6">
      <div className="bg-surface border border-white/[0.06] rounded-[24px] overflow-hidden">

        <div className="p-5 pb-4 flex justify-between items-start">
          <div>
            <Label>DISPOSITIVO #FH-01</Label>
            <div className="text-xl font-semibold tracking-[-0.5px] mt-1.5 text-fg">
              Irrigador Solar
            </div>
            <div className="text-[13px] text-muted mt-0.5">Lote A · Várzea Alta</div>
          </div>
          <LiveDot />
        </div>

        <div
          className="relative h-[200px] mx-4 mt-1 rounded-[16px] overflow-hidden"
          style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(34,197,94,0.12) 0%, transparent 60%)" }}
        >
          <svg viewBox="0 0 320 200" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
            <line x1="0" y1="160" x2="320" y2="160" stroke="#22c55e" strokeOpacity="0.3" strokeDasharray="2 4" />
            <g transform="translate(160 60)">
              <SolarPanel />
            </g>
            <rect x="158" y="90" width="4" height="70" fill="#737373" />
            <ellipse cx="160" cy="162" rx="22" ry="4" fill="#1a1a1d" />
            <circle cx="60" cy="42" r="14" fill="none" stroke="#22c55e" strokeOpacity="0.5" />
            <circle cx="60" cy="42" r="6" fill="#22c55e" opacity="0.7" />
            {irrigating && Array.from({ length: 6 }).map((_, i) => (
              <circle key={i} cx={120 + i * 16 + (i % 2) * 4} cy={170 + (i % 3) * 6} r="2.4" fill="#22c55e">
                <animate attributeName="cy" values="120;180" dur={`${1 + i * 0.18}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;0" dur={`${1 + i * 0.18}s`} repeatCount="indefinite" />
              </circle>
            ))}
            <path d="M 80 50 Q 100 30 130 45" stroke="#22c55e" strokeOpacity="0.3" strokeDasharray="2 3" fill="none" />
          </svg>

          <div className="absolute top-3 left-3 right-3 flex justify-between">
            <div className="bg-black/60 backdrop-blur-md px-[10px] py-[5px] rounded-full flex gap-1.5 items-center">
              <Zap size={11} color="#22c55e" fill="#22c55e" />
              <span className="mono text-[10px] text-fg tracking-[0.4px]">{battery}%</span>
            </div>
            <div className="bg-black/60 backdrop-blur-md px-[10px] py-[5px] rounded-full flex gap-1.5 items-center">
              <Signal size={10} color="#22c55e" />
              <span className="mono text-[10px] text-fg tracking-[0.4px]">{signal}%</span>
            </div>
          </div>
        </div>

        <div className="px-5 py-3.5 flex justify-between items-center border-t border-white/[0.06]">
          <div>
            <Label>STATUS</Label>
            <div className={`text-[15px] font-semibold mt-1 ${irrigating ? "text-accent" : "text-fg"}`}>
              {irrigating ? "Irrigando · 14 m³/h" : "Pronto"}
            </div>
          </div>
          <button
            onClick={onConfigure}
            className="bg-transparent border border-white/[0.12] text-fg px-[14px] py-2 rounded-lg mono text-[10px] tracking-[0.6px] cursor-pointer"
          >
            CONFIGURAR
          </button>
        </div>
      </div>
    </div>
  );
}
