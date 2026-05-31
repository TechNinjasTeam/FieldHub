"use client";

import { useState } from "react";
import { Droplets, Sun, Thermometer, Zap } from "lucide-react";
import { BigNum } from "@/app/shared/components/BigNum";
import { Card } from "@/app/shared/components/Card";
import { Label } from "@/app/shared/components/Label";
import { LiveDot } from "@/app/shared/components/LiveDot";
import { PageShell } from "@/app/shared/components/PageShell";
import { useHistory } from "@/hooks/useHistory";
import { useIrrigation } from "@/hooks/useIrrigation";
import { HumidityDonut } from "./components/HumidityDonut";
import { HumidityLineChart } from "./components/HumidityLineChart";
import type { Period } from "@/services/irrigationService";

const RANGES: { label: string; value: Period }[] = [
  { label: "24H", value: "24h" },
  { label: "7D", value: "7d" },
  { label: "30D", value: "30d" },
  { label: "90D", value: "90d" },
];

const HISTORY_EVENTS = [
  { t: "09:46", txt: "Sinal restabelecido", c: "#a3a3a3" },
  { t: "07:32", txt: "Irrigação manual · 12 min · 2.8 m³", c: "#22c55e" },
  { t: "04:18", txt: "Irrigação automática · 22 min", c: "#22c55e" },
  { t: "ONTEM", txt: "Bateria recarregada · 92% → 100%", c: "#a3a3a3" },
];

export default function DadosPage() {
  const [range, setRange] = useState<Period>("24h");
  const { latestReading } = useIrrigation();
  const { history } = useHistory(range);

  const humidity = Math.round(latestReading?.humidity ?? 0);
  const temperature = latestReading?.temperature?.toFixed(1) ?? "--";

  const minVal = history.length ? Math.round(Math.min(...history.map((r) => r.humidity))) : "--";
  const maxVal = history.length ? Math.round(Math.max(...history.map((r) => r.humidity))) : "--";

  return (
    <PageShell>
      <div style={{ padding: "8px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <Label>DADOS · IRRIGADOR SOLAR #FH-01</Label>
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: -0.6, marginTop: 4, color: "#fafafa" }}>
            Lote A · Várzea Alta
          </div>
        </div>
        <LiveDot />
      </div>

      <div style={{ display: "grid", placeItems: "center", padding: "24px 0 8px" }}>
        <HumidityDonut pct={humidity} />
      </div>

      <div style={{ padding: "0 22px", textAlign: "center" }}>
        <div style={{ fontSize: 14, color: "#a3a3a3", maxWidth: 280, margin: "0 auto" }}>
          <span style={{ color: "#22c55e", fontWeight: 500 }}>↑ 6%</span> em relação a ontem.
          Limite de irrigação em <span className="mono">35%</span>.
        </div>
      </div>

      <div style={{ padding: "24px 22px 0", display: "flex", gap: 6, justifyContent: "center" }}>
        {RANGES.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setRange(value)}
            style={{
              padding: "8px 16px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              background: range === value ? "#fafafa" : "rgba(255,255,255,0.05)",
              color: range === value ? "#0a0a0a" : "#a3a3a3",
              fontFamily: "Geist Mono, monospace",
              fontSize: 11,
              letterSpacing: 0.6,
              fontWeight: 500,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ padding: "18px 22px 0" }}>
        <Card style={{ padding: "20px 20px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <Label>UMIDADE · {RANGES.find((r) => r.value === range)?.label}</Label>
              <div className="mono" style={{ fontSize: 18, fontWeight: 500, marginTop: 4, letterSpacing: -0.4, color: "#fafafa" }}>
                MIN <span style={{ color: "#a3a3a3" }}>{minVal}%</span>
                <span style={{ color: "#525252", margin: "0 8px" }}>·</span>
                MÁX <span style={{ color: "#a3a3a3" }}>{maxVal}%</span>
              </div>
            </div>
          </div>
          <HumidityLineChart data={history} period={range} />
        </Card>
      </div>

      <div style={{ padding: "14px 22px 0" }}>
        <Card style={{ display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
          {[
            { label: "TEMPERATURA", val: temperature, u: "°C", Icon: Thermometer, highlight: false },
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
        </Card>
      </div>

      <div style={{ padding: "18px 22px 0" }}>
        <Label>HISTÓRICO</Label>
        <Card style={{ marginTop: 10, overflow: "hidden" }}>
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
        </Card>
      </div>

      <div style={{ height: 8 }} />
    </PageShell>
  );
}
