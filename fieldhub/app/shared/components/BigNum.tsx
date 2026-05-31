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
