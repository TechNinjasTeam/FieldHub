"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Home, User } from "lucide-react";

const tabs = [
  { name: "INÍCIO", href: "/inicio", icon: Home },
  { name: "DADOS", href: "/dados", icon: BarChart3 },
  { name: "PERFIL", href: "/perfil", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 rounded-3xl border border-white/10 bg-[#111111]/90 shadow-2xl shadow-black/50 backdrop-blur-2xl">
      <div className="flex items-center justify-around px-3 py-3">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`
                relative flex flex-col items-center gap-1 rounded-2xl px-6 py-2
                transition-all duration-300
                ${active ? "text-[#22c55e] bg-[#22c55e]/10" : "text-[#525252] hover:text-[#22c55e] hover:bg-[#22c55e]/10"}
              `}
            >
              <Icon size={22} color={active ? "#22c55e" : "#525252"} />
              <span className="mono" style={{ fontSize: 9, letterSpacing: 0.8 }}>
                {tab.name}
              </span>
              <span
                className={`absolute -bottom-1 h-1 rounded-full bg-[#22c55e] transition-all duration-300 ${active ? "w-7 opacity-100" : "w-0 opacity-0"}`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}