"use client";

import { useState } from "react";
import { ChevronRight, Plus, Sun } from "lucide-react";
import { BigNum } from "@/app/shared/components/BigNum";
import { Label } from "@/app/shared/components/Label";
import { Wordmark } from "@/app/shared/components/Wordmark";

const ACCOUNT_ROWS = [
  { label: "Plano", sub: "FieldHub Solo · grátis" },
  { label: "Equipe", sub: "Apenas você" },
  { label: "Idioma", sub: "Português (BR)" },
  { label: "Suporte", sub: "WhatsApp · 0800" },
  { label: "Sair", sub: "", danger: true },
];

export default function PerfilPage() {
  const [autoMode, setAutoMode] = useState(true);
  const [threshold, setThreshold] = useState(35);
  const [notifs, setNotifs] = useState(true);

  return (
    <div style={{ maxWidth: 402, margin: "0 auto", paddingTop: 8 }}>

      <div style={{ padding: "12px 22px 0" }}>
        <Label>PERFIL</Label>
      </div>

      <div style={{ padding: "14px 22px 0", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#22c55e,#16a34a)", display: "grid", placeItems: "center", color: "#0a0a0a", fontSize: 22, fontWeight: 700, letterSpacing: -0.5, flexShrink: 0 }}>
          JM
        </div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: -0.4, color: "#fafafa" }}>João Marques</div>
          <div style={{ fontSize: 13, color: "#a3a3a3", marginTop: 2 }}>Fazenda Três Marias · 76.8 ha</div>
          <div className="mono" style={{ fontSize: 10, color: "#525252", letterSpacing: 0.6, marginTop: 4 }}>MEMBRO DESDE MAR 2025</div>
        </div>
      </div>

      <div style={{ padding: "24px 22px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#141413", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, overflow: "hidden" }}>
          {[
            { label: "DISPOSITIVOS", val: "1", highlight: false },
            { label: "IRRIGAÇÕES", val: "47", highlight: false },
            { label: "M³ ECONOMIZADOS", val: "214", highlight: true },
          ].map((s, i) => (
            <div
              key={i}
              style={{ padding: "16px 14px", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none", textAlign: "center" }}
            >
              <BigNum n={s.val} unit="" size={26} color={s.highlight ? "#22c55e" : "#fafafa"} />
              <div style={{ marginTop: 6 }}>
                <Label>{s.label}</Label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "28px 22px 0" }}>
        <Label>DISPOSITIVOS</Label>
        <div style={{ background: "#141413", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, marginTop: 10, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(34,197,94,0.12)", display: "grid", placeItems: "center", flexShrink: 0 }}>
              <Sun size={18} color="#22c55e" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#fafafa" }}>Irrigador Solar</div>
              <div className="mono" style={{ fontSize: 11, color: "#737373", letterSpacing: 0.4, marginTop: 2 }}>#FH-01 · LOTE A · ONLINE</div>
            </div>
            <ChevronRight size={14} color="#525252" />
          </div>
          <div style={{ padding: "14px 18px", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, border: "1px dashed rgba(34,197,94,0.4)", display: "grid", placeItems: "center", flexShrink: 0 }}>
              <Plus size={16} color="#22c55e" />
            </div>
            <div style={{ flex: 1, fontSize: 15, fontWeight: 500, color: "#22c55e" }}>Parear novo dispositivo</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "24px 22px 0" }}>
        <Label>AUTOMAÇÃO</Label>
        <div style={{ background: "#141413", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, marginTop: 10, padding: "18px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#fafafa" }}>Irrigação automática</div>
              <div style={{ fontSize: 12, color: "#737373", marginTop: 2 }}>Aciona quando umidade &lt; limite</div>
            </div>
            <Toggle on={autoMode} onToggle={() => setAutoMode((v) => !v)} />
          </div>
          <div style={{ paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <Label>LIMITE DE UMIDADE</Label>
              <span className="mono" style={{ fontSize: 18, fontWeight: 500, color: autoMode ? "#fafafa" : "#525252" }}>
                {threshold}%
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={60}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              disabled={!autoMode}
              style={{ width: "100%", opacity: autoMode ? 1 : 0.4, accentColor: "#22c55e" }}
            />
            <div className="mono" style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#525252", marginTop: 4, letterSpacing: 0.5 }}>
              <span>20%</span><span>60%</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "24px 22px 0" }}>
        <Label>CONTA</Label>
        <div style={{ background: "#141413", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, marginTop: 10, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#fafafa" }}>Notificações</div>
              <div style={{ fontSize: 12, color: "#737373", marginTop: 2 }}>{notifs ? "Ativas" : "Pausadas"}</div>
            </div>
            <Toggle on={notifs} onToggle={() => setNotifs((v) => !v)} />
          </div>
          {ACCOUNT_ROWS.map((row, i) => (
            <div
              key={i}
              style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 14, borderTop: "1px solid rgba(255,255,255,0.04)", cursor: "pointer" }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: row.danger ? "#ef4444" : "#fafafa" }}>{row.label}</div>
                {row.sub && <div style={{ fontSize: 12, color: "#737373", marginTop: 2 }}>{row.sub}</div>}
              </div>
              {!row.danger && <ChevronRight size={14} color="#525252" />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "32px 22px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <Wordmark s={13} />
        <div className="mono" style={{ fontSize: 10, color: "#525252", letterSpacing: 0.6 }}>VERSÃO 1.0 · 2026</div>
      </div>

      <div style={{ height: 8 }} />
    </div>
  );
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{
        width: 44,
        height: 26,
        borderRadius: 13,
        border: "none",
        padding: 2,
        cursor: "pointer",
        background: on ? "#22c55e" : "#3f3f3f",
        display: "flex",
        alignItems: "center",
        justifyContent: on ? "flex-end" : "flex-start",
        transition: "all .2s",
        flexShrink: 0,
      }}
    >
      <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#fafafa", display: "block" }} />
    </button>
  );
}
