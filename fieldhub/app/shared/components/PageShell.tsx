import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ maxWidth: 402, margin: "0 auto", paddingTop: 8 }}>
      {children}
    </div>
  );
}
