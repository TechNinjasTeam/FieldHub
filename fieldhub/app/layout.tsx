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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <main className="pb-28">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}