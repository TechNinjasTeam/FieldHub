import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/features/BottomNav";

export const metadata: Metadata = {
  title: "FieldHub",
  description: "Sistema de Irrigação Inteligente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <main className="pb-28">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}