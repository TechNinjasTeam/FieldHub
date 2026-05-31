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
