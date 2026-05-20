"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Droplets, Home, User } from "lucide-react";

const tabs = [
  { name: "Inicio", href: "/inicio", icon: Home },
  { name: "Controle", href: "/dados", icon: Droplets },
  { name: "Relatorio", href: "/relatorio", icon: BarChart3 },
  { name: "Perfil", href: "/perfil", icon: User },
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
                group relative flex flex-col items-center gap-1 rounded-2xl px-4 py-2
                text-xs font-semibold transition-all duration-300
                hover:-translate-y-2 hover:bg-[#22c55e]/10 hover:text-[#22c55e]
                ${active ? "text-[#22c55e] bg-[#22c55e]/10" : "text-[#a3a3a3]"}
              `}
            >
              <Icon
                size={23}
                className="
                  transition-all duration-300
                  group-hover:scale-150
                  group-hover:drop-shadow-[0_0_12px_rgba(34,197,94,0.9)]
                "
              />

              <span className="transition-all duration-300 group-hover:text-[#22c55e]">
                {tab.name}
              </span>

              <span
                className={`
                  absolute -bottom-1 h-1 rounded-full bg-[#22c55e]
                  transition-all duration-300
                  ${active ? "w-7 opacity-100" : "w-0 opacity-0 group-hover:w-7 group-hover:opacity-100"}
                `}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}