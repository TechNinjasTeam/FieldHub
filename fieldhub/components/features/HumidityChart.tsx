"use client";

import { Label } from "@/components/ui/shared";
import type { SensorReading } from "@/lib/types";

const THRESHOLD = 35;
const W = 320;
const H = 130;

function toX(i: number, total: number): number {
  return total < 2 ? 0 : (i / (total - 1)) * W;
}

function toY(v: number): number {
  return H - ((v - 20) / 65) * (H - 10) - 10;
}

function buildPath(values: number[]): string {
  return values.reduce((d, v, i) => {
    if (i === 0) return `M ${toX(0, values.length)} ${toY(v)}`;
    return `${d} Q ${toX(i - 0.5, values.length)} ${toY(values[i - 1])} ${toX(i, values.length)} ${toY(v)}`;
  }, "");
}

function formatLabel(reading: SensorReading, range: string): string {
  const date = new Date(reading.recorded_at);
  if (range === "24H") {
    return date.getHours().toString().padStart(2, "0") + "H";
  }
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}`;
}

type Props = {
  data: SensorReading[];
  isLoading: boolean;
  range: string;
};

export default function HumidityChart({ data, isLoading, range }: Props) {
  if (isLoading) {
    return (
      <div className="h-[158px] flex items-center justify-center">
        <span className="mono text-[11px] text-subtle tracking-[0.6px]">CARREGANDO...</span>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-[158px] flex items-center justify-center">
        <span className="mono text-[11px] text-subtle tracking-[0.6px]">SEM DADOS</span>
      </div>
    );
  }

  const values = data.map((r) => r.humidity);
  const minVal = Math.round(Math.min(...values));
  const maxVal = Math.round(Math.max(...values));
  const last = values[values.length - 1];
  const linePath = buildPath(values);

  const n = data.length - 1;
  const axisReadings = [
    data[0],
    data[Math.round(n * 0.25)],
    data[Math.round(n * 0.5)],
    data[Math.round(n * 0.75)],
    data[n],
  ];

  return (
    <>
      <div className="flex justify-between items-start mb-3">
        <div>
          <Label>UMIDADE · {range}</Label>
          <div className="mono text-[18px] font-medium mt-1 tracking-[-0.4px] text-fg">
            MIN <span className="text-muted">{minVal}%</span>
            <span className="text-subtle mx-2">·</span>
            MÁX <span className="text-muted">{maxVal}%</span>
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: H, display: "block" }}>
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#22c55e" stopOpacity="0.3" />
            <stop offset="1" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1={toY(THRESHOLD)} x2={W} y2={toY(THRESHOLD)} stroke="#f59e0b" strokeDasharray="3 4" strokeOpacity="0.6" />
        <path d={`${linePath} L ${W} ${H} L 0 ${H} Z`} fill="url(#chartFill)" />
        <path d={linePath} stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx={toX(values.length - 1, values.length)} cy={toY(last)} r="6" fill="#22c55e" fillOpacity="0.2" />
        <circle cx={toX(values.length - 1, values.length)} cy={toY(last)} r="3.5" fill="#22c55e" />
      </svg>

      <div className="mono flex justify-between text-[10px] text-subtle tracking-[0.5px] mt-1">
        {axisReadings.map((r, i) => (
          <span key={i}>{formatLabel(r, range)}</span>
        ))}
      </div>
    </>
  );
}
