"use client";

import { useMemo, useState } from "react";
import { Droplets, Sun, Thermometer, Zap } from "lucide-react";
import { BigNum, HeroRing, Label, LiveDot } from "@/components/ui/shared";

const RANGES = ["24H", "7D", "30D", "90D"] as const;

const HISTORY_EVENTS = [
  { t: "09:46", txt: "Sinal restabelecido", c: "#a3a3a3" },
  { t: "07:32", txt: "Irrigação manual · 12 min · 2.8 m³", c: "#22c55e" },
  { t: "04:18", txt: "Irrigação automática · 22 min", c: "#22c55e" },
  { t: "ONTEM", txt: "Bateria recarregada · 92% → 100%", c: "#a3a3a3" },
];

export default function DadosPage() {
  const [range, setRange] = useState<(typeof RANGES)[number]>("24H");

  // Synthetic 24h humidity series
  const series = useMemo(() => {
    const points: number[] = [];
    let h = 58;
    for (let i = 0; i < 24; i++) {
      h += Math.sin(i / 4) * 2 + ((i * 7) % 5) - 2;
      h = Math.max(28, Math.min(82, h));
      points.push(h);
    }
    points[23] = 64;
    return points;
  }, []);

  const minVal = Math.round(Math.min(...series));
  const maxVal = Math.round(Math.max(...series));

  // SVG path helpers
  const SX = (i: number) => (i / 23) * 320;
  const SY = (v: number) => 130 - ((v - 20) / 65) * 110 - 10;

  const linePath = series.reduce((d, v, i) => {
    if (i === 0) return `M ${SX(0)} ${SY(v)}`;
    return `${d} Q ${SX(i - 0.5)} ${SY(series[i - 1])} ${SX(i)} ${SY(v)}`;
  }, "");

  return (
    <div style={{ maxWidth: 402, margin: "0 auto", paddingTop: 8 }}>

      {/* Header */}
      <div style={{ padding: "8px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <Label>DADOS · IRRIGADOR SOLAR #FH-01</Label>
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: -0.6, marginTop: 4, color: "#fafafa" }}>
            Lote A · Várzea Alta
          </div>
        </div>
        <LiveDot />
      </div>

      {/* Hero ring */}
      <div style={{ display: "grid", placeItems: "center", padding: "24px 0 8px" }}>
        <HeroRing pct={64} label="UMIDADE DO SOLO · AGORA" size={260} />
      </div>

      {/* Summary text */}
      <div style={{ padding: "0 22px", textAlign: "center" }}>
        <div style={{ fontSize: 14, color: "#a3a3a3", maxWidth: 280, margin: "0 auto" }}>
          <span style={{ color: "#22c55e", fontWeight: 500 }}>↑ 6%</span> em relação a ontem.
          Limite de irrigação em <span className="mono">35%</span>.
        </div>
      </div>

      {/* Range selector */}
      <div style={{ padding: "24px 22px 0", display: "flex", gap: 6, justifyContent: "center" }}>
        {RANGES.map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            style={{
              padding: "8px 16px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              background: range === r ? "#fafafa" : "rgba(255,255,255,0.05)",
              color: range === r ? "#0a0a0a" : "#a3a3a3",
              fontFamily: "Geist Mono, monospace",
              fontSize: 11,
              letterSpacing: 0.6,
              fontWeight: 500,
            }}
          >
            {r}
          </button>
        ))}
      </div>

      {/* 24h chart */}
      <div style={{ padding: "18px 22px 0" }}>
        <div style={{ background: "#141413", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 18, padding: "20px 20px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <Label>UMIDADE · 24H</Label>
              <div className="mono" style={{ fontSize: 18, fontWeight: 500, marginTop: 4, letterSpacing: -0.4, color: "#fafafa" }}>
                MIN <span style={{ color: "#a3a3a3" }}>{minVal}%</span>
                <span style={{ color: "#525252", margin: "0 8px" }}>·</span>
                MÁX <span style={{ color: "#a3a3a3" }}>{maxVal}%</span>
              </div>
            </div>
          </div>
          <svg viewBox="0 0 320 130" style={{ width: "100%", height: 130, display: "block" }}>
            <defs>
              <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#22c55e" stopOpacity="0.3" />
                <stop offset="1" stopColor="#22c55e" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Threshold line at 35% */}
            <line
              x1="0" y1={SY(35)} x2="320" y2={SY(35)}
              stroke="#f59e0b" strokeDasharray="3 4" strokeOpacity="0.6"
            />
            {/* Area fill */}
            <path d={`${linePath} L 320 130 L 0 130 Z`} fill="url(#chartFill)" />
            {/* Line */}
            <path d={linePath} stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Current value dot */}
            <circle cx={SX(23)} cy={SY(64)} r="6" fill="#22c55e" fillOpacity="0.2" />
            <circle cx={SX(23)} cy={SY(64)} r="3.5" fill="#22c55e" />
          </svg>
          <div className="mono" style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#525252", letterSpacing: 0.5, marginTop: 4 }}>
            <span>00H</span><span>06H</span><span>12H</span><span>18H</span><span>24H</span>
          </div>
        </div>
      </div>

      {/* 2x2 stats grid */}
      <div style={{ padding: "14px 22px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "#141413", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 18, overflow: "hidden" }}>
          {[
            { label: "TEMPERATURA", val: "24.2", u: "°C", Icon: Thermometer, highlight: false },
            { label: "GERAÇÃO SOLAR", val: "8.4", u: "kWh", Icon: Sun, highlight: true },
            { label: "BATERIA", val: "87", u: "%", Icon: Zap, highlight: false },
            { label: "VAZÃO HOJE", val: "1.4", u: "m³", Icon: Droplets, highlight: false },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                padding: "18px 18px 16px",
                borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                borderTop: i >= 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <Label>{stat.label}</Label>
                <stat.Icon size={14} color="#525252" />
              </div>
              <BigNum n={stat.val} unit={stat.u} size={32} unitSize={12} color={stat.highlight ? "#22c55e" : "#fafafa"} />
            </div>
          ))}
        </div>
      </div>

      {/* Event history */}
      <div style={{ padding: "18px 22px 0" }}>
        <Label>HISTÓRICO</Label>
        <div style={{ background: "#141413", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 18, marginTop: 10, overflow: "hidden" }}>
          {HISTORY_EVENTS.map((event, i) => (
            <div
              key={i}
              style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, borderTop: i ? "1px solid rgba(255,255,255,0.04)" : "none" }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: event.c, flexShrink: 0, display: "inline-block" }} />
              <div style={{ flex: 1, fontSize: 13, color: "#fafafa" }}>{event.txt}</div>
              <span className="mono" style={{ fontSize: 11, color: "#737373", letterSpacing: 0.4 }}>{event.t}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 8 }} />
    </div>
  );
}
