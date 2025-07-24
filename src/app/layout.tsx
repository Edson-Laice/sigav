// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../contexts/LanguageProvider";
import { ThemeProvider } from "@/components/theme";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// URL base do site (ajuste para sua URL de produção)
const siteUrl = "https://sigav-wvzo.onrender.com";

export const metadata: Metadata = {
  title: "Sistema Integrado de Gestão Acadêmica e Administrativa",
  description: "Gerenciado por SENAMI - SIGAV",
  metadataBase: new URL(siteUrl),
  applicationName: "SIGAV",
  authors: [{ name: "SENAMI", url: siteUrl }],
  generator: "Next.js",
  keywords: ["passaporte", "vistos", "Moçambique", "SENAMI", "agendamento"],
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/SNM2.png", sizes: "any" },
      { url: "/SNM2.png", type: "image/svg+xml" },
      { url: "/SNM2.png", type: "image/png", sizes: "16x16" },
      { url: "/SNM2.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/SNM2.png",
  },
  openGraph: {
    title: "SIGAV - Sistema Integrado de Gestão Acadêmica",
    description: "Solicitação de passaportes e serviços consulares online",
    url: siteUrl,
    siteName: "SIGAV",
    images: [
      {
        url: "/SNM2.png",
        width: 1200,
        height: 630,
        alt: "SIGAV - Sistema Integrado",
      },
    ],
    locale: "pt_MZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sistema Integrado de Gestão de Agendamento e Vistos",
    description: "Solicitação de passaportes e serviços consulares online",
    images: {
      url: "/SNM2.png",
      alt: "SIGAV - Sistema Integrado",
      width: 1200,
      height: 630,
    },
    creator: "@SENAMI_MZ", // Adicione o usuário Twitter oficial se existir
  },
  manifest: "/site.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        {/* Preload para melhor performance */}
        <link rel="preload" href="/SIGAV_final.png" as="image" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}