"use client";

import { useState } from "react";
import { Droplets, Sun, Thermometer, Zap } from "lucide-react";
import { BigNum, HeroRing, Label, LiveDot } from "@/components/ui/shared";
import { useHistory } from "@/hooks/useHistory";
import HumidityChart from "@/components/features/HumidityChart";
import type { Period } from "@/services/irrigationService";

const RANGES = ["24H", "7D", "30D", "90D"] as const;


export default function DadosPage() {
  const [range, setRange] = useState<(typeof RANGES)[number]>("24H");
  const { data, isLoading } = useHistory(range.toLowerCase() as Period);

  return (
    <div className="max-w-[402px] lg:max-w-2xl mx-auto pt-2">

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

      {/* Chart */}
      <div style={{ padding: "18px 22px 0" }}>
        <div style={{ background: "#141413", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 18, padding: "20px 20px 14px" }}>
          <HumidityChart data={data} isLoading={isLoading} range={range} />
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

<div style={{ height: 8 }} />
    </div>
  );
}
