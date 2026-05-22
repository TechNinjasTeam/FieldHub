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
    <>
      {/* Mobile: floating bottom pill */}
      <nav className="lg:hidden fixed bottom-4 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 rounded-3xl border border-white/10 bg-[#111111]/90 shadow-2xl shadow-black/50 backdrop-blur-2xl">
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
                  ${active ? "text-accent bg-accent/10" : "text-subtle hover:text-accent hover:bg-accent/10"}
                `}
              >
                <Icon size={22} color={active ? "#22c55e" : "#525252"} />
                <span className="mono text-[9px] tracking-[0.8px]">{tab.name}</span>
                <span
                  className={`absolute -bottom-1 h-1 rounded-full bg-accent transition-all duration-300 ${active ? "w-7 opacity-100" : "w-0 opacity-0"}`}
                />
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop: icon rail sidebar */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-full w-16 flex-col items-center py-6 gap-2 bg-[#111111]/90 border-r border-white/10 backdrop-blur-2xl z-50">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                active ? "bg-accent/10 text-accent" : "text-subtle hover:text-accent hover:bg-accent/10"
              }`}
            >
              <Icon size={20} color={active ? "#22c55e" : "#525252"} />
            </Link>
          );
        })}
      </nav>
    </>
  );
}
