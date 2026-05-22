import type { ReactNode } from "react";

export function BigNum({
  n,
  unit,
  color = "#fafafa",
  size = 84,
  unitSize,
}: {
  n: string | number;
  unit: string;
  color?: string;
  size?: number;
  unitSize?: number;
}) {
  return (
    <div
      className="mono"
      style={{
        fontSize: size,
        fontWeight: 500,
        letterSpacing: -size * 0.05,
        lineHeight: 0.95,
        color,
      }}
    >
      {n}
      <span style={{ fontSize: unitSize ?? size * 0.32, color: "#737373", marginLeft: 4, fontWeight: 500 }}>
        {unit}
      </span>
    </div>
  );
}

export function Label({ children, c = "#525252" }: { children: ReactNode; c?: string }) {
  return (
    <div
      className="mono"
      style={{ fontSize: 10, letterSpacing: 0.8, color: c, textTransform: "uppercase" }}
    >
      {children}
    </div>
  );
}

export function LiveDot({ label = "AO VIVO" }: { label?: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span
        style={{
          display: "inline-block",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#22c55e",
          animation: "pulse 1.6s ease-in-out infinite",
        }}
      />
      <span className="mono" style={{ fontSize: 10, letterSpacing: 0.8, color: "#737373" }}>
        {label}
      </span>
    </div>
  );
}

export function Wordmark({ s = 22, c = "#fafafa", ac = "#22c55e" }: { s?: number; c?: string; ac?: string }) {
  return (
    <span style={{ fontFamily: "Geist, sans-serif", fontSize: s, fontWeight: 700, letterSpacing: -0.8, color: c }}>
      fieldhub<span style={{ color: ac }}>.</span>
    </span>
  );
}

export function Mark({ s = 28, c = "#22c55e" }: { s?: number; c?: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="14" fill="none" stroke={c} strokeWidth="1.5" strokeOpacity="0.2" />
      <circle cx="18" cy="18" r="8" fill="none" stroke={c} strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="18" cy="18" r="4" fill={c} />
    </svg>
  );
}

export function SolarPanel() {
  return (
    <g>
      <rect x="-44" y="-22" width="88" height="50" rx="2" fill="#1a1a1d" stroke="#22c55e" strokeWidth="1.2" transform="skewX(-15)" />
      <line x1="-44" y1="-6" x2="44" y2="-6" stroke="#22c55e" strokeOpacity="0.4" strokeWidth="0.5" transform="skewX(-15)" />
      <line x1="-44" y1="12" x2="44" y2="12" stroke="#22c55e" strokeOpacity="0.4" strokeWidth="0.5" transform="skewX(-15)" />
      <line x1="-15" y1="-22" x2="-15" y2="28" stroke="#22c55e" strokeOpacity="0.4" strokeWidth="0.5" transform="skewX(-15)" />
      <line x1="15" y1="-22" x2="15" y2="28" stroke="#22c55e" strokeOpacity="0.4" strokeWidth="0.5" transform="skewX(-15)" />
    </g>
  );
}

export function HeroRing({
  pct = 64,
  label = "UMIDADE DO SOLO",
  size = 240,
}: {
  pct?: number;
  label?: string;
  size?: number;
}) {
  const r = size / 2 - 16;
  const cx = size / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - pct / 100);

  return (
    <div style={{ position: "relative", width: size, height: size, display: "grid", placeItems: "center" }}>
      <svg
        width={size}
        height={size}
        style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
      >
        <defs>
          <linearGradient id="ringGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#22c55e" />
            <stop offset="1" stopColor="#0ea5e9" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div style={{ textAlign: "center" }}>
        <div className="mono" style={{ fontSize: 64, fontWeight: 500, letterSpacing: -3, color: "#fafafa", lineHeight: 0.95 }}>
          {pct}<span style={{ fontSize: 24, color: "#737373" }}>%</span>
        </div>
        <div className="mono" style={{ fontSize: 9, letterSpacing: 0.8, color: "#737373", marginTop: 6 }}>
          {label}
        </div>
      </div>
    </div>
  );
}
