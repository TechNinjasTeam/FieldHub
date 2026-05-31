import type { CSSProperties, ReactNode } from "react";

export function Card({
  children,
  radius = 18,
  style,
}: {
  children: ReactNode;
  radius?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        background: "#141413",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: radius,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
