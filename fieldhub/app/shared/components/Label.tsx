import type { ReactNode } from "react";

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
