"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, ChevronRight, Power, Signal, Zap } from "lucide-react";
import { BigNum } from "@/app/shared/components/BigNum";
import { Card } from "@/app/shared/components/Card";
import { Label } from "@/app/shared/components/Label";
import { PageShell } from "@/app/shared/components/PageShell";
import { Wordmark } from "@/app/shared/components/Wordmark";
import { useIrrigation } from "@/hooks/useIrrigation";

export default function InicioPage() {
  const [irrigating, setIrrigating] = useState(false);
  const battery = 87;
  const signal = 96;
  const router = useRouter();
  const { latestReading, sendCommand } = useIrrigation();

  const humidity = Math.round(latestReading?.humidity ?? 0);
  const temperature = latestReading?.temperature?.toFixed(1) ?? "--";

  const handleIrrigating = () => {
    const next = !irrigating;
    setIrrigating(next);
    sendCommand(next ? "ON" : "OFF");
  };

  return (
    <PageShell>
      <div style={{ padding: "8px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Wordmark s={20} />
        <button
          style={{ background: "rgba(255,255,255,0.04)", border: "none", width: 36, height: 36, borderRadius: 18, display: "grid", placeItems: "center", cursor: "pointer" }}
        >
          <Bell size={16} color="#a3a3a3" />
        </button>
      </div>

      <div style={{ padding: "24px 22px 0" }}>
        <Label>BOM DIA</Label>
        <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -1, marginTop: 6, color: "#fafafa" }}>
          Sua lavoura<br />está no controle.
        </div>
      </div>

      <div style={{ padding: "24px 22px 0" }}>
        <Card radius={24} style={{ overflow: "hidden" }}>
          <div style={{ padding: "20px 20px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <Label>DISPOSITIVO #FH-01</Label>
              <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: -0.5, marginTop: 6, color: "#fafafa" }}>
                Irrigador Solar
              </div>
              <div style={{ fontSize: 13, color: "#737373", marginTop: 2 }}>Lote A · Várzea Alta</div>
            </div>
          </div>

          <div style={{ position: "relative", height: 200, margin: "4px 16px 0", borderRadius: 16, overflow: "hidden" }}>
            <svg viewBox="0 0 320 200" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
              <line x1="0" y1="160" x2="320" y2="160" stroke="#22c55e" strokeOpacity="0.3" strokeDasharray="2 4" />
              <g transform="translate(160 60)">
                <rect x="-44" y="-22" width="88" height="50" rx="2" fill="#1a1a1d" stroke="#22c55e" strokeWidth="1.2" transform="skewX(-15)" />
                <line x1="-44" y1="-6" x2="44" y2="-6" stroke="#22c55e" strokeOpacity="0.4" strokeWidth="0.5" transform="skewX(-15)" />
                <line x1="-44" y1="12" x2="44" y2="12" stroke="#22c55e" strokeOpacity="0.4" strokeWidth="0.5" transform="skewX(-15)" />
                <line x1="-15" y1="-22" x2="-15" y2="28" stroke="#22c55e" strokeOpacity="0.4" strokeWidth="0.5" transform="skewX(-15)" />
                <line x1="15" y1="-22" x2="15" y2="28" stroke="#22c55e" strokeOpacity="0.4" strokeWidth="0.5" transform="skewX(-15)" />
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
            <div style={{ position: "absolute", top: 12, left: 12, right: 12, display: "flex", justifyContent: "space-between" }}>
              <div style={{ background: "rgba(10,10,10,0.6)", backdropFilter: "blur(8px)", padding: "5px 10px", borderRadius: 999, display: "flex", gap: 6, alignItems: "center" }}>
                <Zap size={11} color="#22c55e" fill="#22c55e" />
                <span className="mono" style={{ fontSize: 10, color: "#fafafa", letterSpacing: 0.4 }}>{battery}%</span>
              </div>
              <div style={{ background: "rgba(10,10,10,0.6)", backdropFilter: "blur(8px)", padding: "5px 10px", borderRadius: 999, display: "flex", gap: 6, alignItems: "center" }}>
                <Signal size={10} color="#22c55e" />
                <span className="mono" style={{ fontSize: 10, color: "#fafafa", letterSpacing: 0.4 }}>{signal}%</span>
              </div>
            </div>
          </div>

          <div style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <Label>STATUS</Label>
              <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4, color: irrigating ? "#22c55e" : "#fafafa" }}>
                {irrigating ? "Irrigando · 14 m³/h" : "Pronto"}
              </div>
            </div>
            <button
              onClick={() => router.push("/perfil")}
              style={{ background: "none", border: "1px solid rgba(255,255,255,0.12)", color: "#fafafa", padding: "8px 14px", borderRadius: 8, fontFamily: "Geist Mono, monospace", fontSize: 10, letterSpacing: 0.6, cursor: "pointer" }}
            >
              CONFIGURAR
            </button>
          </div>
        </Card>
      </div>

      <div style={{ padding: "20px 22px 0" }}>
        <button
          onClick={handleIrrigating}
          style={{
            width: "100%",
            padding: "20px 22px",
            borderRadius: 18,
            border: irrigating ? "none" : "1px solid rgba(255,255,255,0.06)",
            cursor: "pointer",
            textAlign: "left",
            background: irrigating ? "linear-gradient(180deg,#22c55e 0%,#16a34a 100%)" : "#141413",
            color: irrigating ? "#0a0a0a" : "#fafafa",
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: irrigating ? "0 8px 30px rgba(34,197,94,0.25)" : "none",
            transition: "all .2s",
          }}
        >
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: irrigating ? "rgba(10,10,10,0.18)" : "rgba(34,197,94,0.12)", display: "grid", placeItems: "center", flexShrink: 0 }}>
            <Power size={26} color={irrigating ? "#0a0a0a" : "#22c55e"} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.3 }}>
              {irrigating ? "Parar irrigação" : "Ligar irrigador"}
            </div>
            <div style={{ fontSize: 13, opacity: 0.7, marginTop: 2 }}>
              {irrigating ? "Toque para encerrar agora" : "Acionar manualmente · 15 min"}
            </div>
          </div>
          <ChevronRight size={16} color={irrigating ? "#0a0a0a" : "#737373"} />
        </button>
      </div>

      <div style={{ padding: "20px 22px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { label: "UMIDADE", val: String(humidity), u: "%" },
            { label: "TEMP", val: temperature, u: "°C" },
            { label: "GERAÇÃO", val: "8.4", u: "kWh" },
            { label: "VAZÃO", val: irrigating ? "14.2" : "0", u: "m³/h", highlight: irrigating },
          ].map((card, i) => (
            <Card key={i} radius={14} style={{ padding: "14px 16px" }}>
              <Label>{card.label}</Label>
              <BigNum n={card.val} unit={card.u} size={32} unitSize={13} color={card.highlight ? "#22c55e" : "#fafafa"} />
            </Card>
          ))}
        </div>
      </div>

      <div style={{ height: 8 }} />
    </PageShell>
  );
}
