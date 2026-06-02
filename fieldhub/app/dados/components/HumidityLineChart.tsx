"use client";

import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import type { SensorReading } from "@/lib/types";

type DotProps = { cx?: number; cy?: number; index?: number };

const INTERVAL_MS: Record<string, number> = {
  "24h": 6 * 3_600_000,
  "7d":  86_400_000,
  "30d": 7 * 86_400_000,
  "90d": 30 * 86_400_000,
};

function generateTicks(start: number, end: number, period: string): number[] {
  const interval = INTERVAL_MS[period] ?? 6 * 3_600_000;
  const ticks: number[] = [];
  let t = Math.ceil(start / interval) * interval;
  while (t <= end) { ticks.push(t); t += interval; }
  return ticks;
}

function formatTick(ts: number, period: string): string {
  const d = new Date(ts);
  if (period === "24h") return d.getHours().toString().padStart(2, "0") + "H";
  if (period === "7d") return ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][d.getDay()];
  if (period === "30d") return `${d.getDate()}/${d.getMonth() + 1}`;
  return `${d.getMonth() + 1}/${String(d.getFullYear()).slice(2)}`;
}

export function HumidityLineChart({
  data,
  period,
}: {
  data: SensorReading[];
  period: string;
}) {
  const chartData = data.map((r) => ({
    ts: new Date(r.recorded_at).getTime(),
    h: r.humidity,
  }));

  const lastIdx = chartData.length - 1;
  const tsStart = chartData[0]?.ts ?? 0;
  const tsEnd = chartData[lastIdx]?.ts ?? 0;
  const ticks = generateTicks(tsStart, tsEnd, period);

  return (
    <ResponsiveContainer width="100%" height={130}>
      <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="lineChartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#22c55e" stopOpacity={0.3} />
            <stop offset="1" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="ts"
          type="number"
          domain={[tsStart, tsEnd]}
          ticks={ticks}
          tickFormatter={(ts) => formatTick(ts, period)}
          tick={{ fill: "#525252", fontSize: 10, fontFamily: "Geist Mono, monospace", letterSpacing: 0.5 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={{ stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 }}
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            return (
              <div style={{ background: "#171717", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "6px 10px", fontFamily: "Geist Mono, monospace", fontSize: 11, letterSpacing: 0.4 }}>
                <div style={{ color: "#737373" }}>{formatTick(label as number, period)}</div>
                <div style={{ color: "#22c55e", fontWeight: 600, marginTop: 2 }}>{payload[0].value}%</div>
              </div>
            );
          }}
        />
        <ReferenceLine y={35} stroke="#f59e0b" strokeDasharray="3 4" strokeOpacity={0.6} />
        <Area
          type="monotone"
          dataKey="h"
          stroke="#22c55e"
          strokeWidth={2}
          fill="url(#lineChartFill)"
          strokeLinecap="round"
          isAnimationActive={false}
          dot={(props: DotProps) => {
            if (props.index !== lastIdx || props.cx == null || props.cy == null)
              return <g key={props.index ?? 0} />;
            return (
              <g key="end-dot">
                <circle cx={props.cx} cy={props.cy} r={6} fill="#22c55e" fillOpacity={0.2} />
                <circle cx={props.cx} cy={props.cy} r={3.5} fill="#22c55e" />
              </g>
            );
          }}
          activeDot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
