"use client";

import { PieChart, Pie, Cell } from "recharts";

export function HumidityDonut({
  pct = 0,
  label = "UMIDADE DO SOLO · AGORA",
  size = 260,
}: {
  pct?: number;
  label?: string;
  size?: number;
}) {
  const clamped = Math.min(100, Math.max(0, pct));
  const data = [{ value: clamped }, { value: 100 - clamped }];
  const outerRadius = size / 2 - 10;
  const innerRadius = outerRadius - 14;

  return (
    <div style={{ position: "relative", width: size, height: size, display: "grid", placeItems: "center" }}>
      <PieChart width={size} height={size} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="donutGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#22c55e" />
            <stop offset="1" stopColor="#0ea5e9" stopOpacity={0.9} />
          </linearGradient>
        </defs>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          startAngle={90}
          endAngle={-270}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          stroke="none"
          dataKey="value"
          isAnimationActive={false}
        >
          <Cell fill="url(#donutGradient)" />
          <Cell fill="rgba(255,255,255,0.06)" />
        </Pie>
      </PieChart>
      <div style={{ textAlign: "center", zIndex: 1 }}>
        <div className="mono" style={{ fontSize: 64, fontWeight: 500, letterSpacing: -3, color: "#fafafa", lineHeight: 0.95 }}>
          {clamped}<span style={{ fontSize: 24, color: "#737373" }}>%</span>
        </div>
        <div className="mono" style={{ fontSize: 9, letterSpacing: 0.8, color: "#737373", marginTop: 6 }}>
          {label}
        </div>
      </div>
    </div>
  );
}
