export function Wordmark({ s = 22, c = "#fafafa", ac = "#22c55e" }: { s?: number; c?: string; ac?: string }) {
  return (
    <span style={{ fontFamily: "Geist, sans-serif", fontSize: s, fontWeight: 700, letterSpacing: -0.8, color: c }}>
      fieldhub<span style={{ color: ac }}>.</span>
    </span>
  );
}
