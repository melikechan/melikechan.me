import localFont from "next/font/local";
import { Lexend } from "next/font/google";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";

import { siteConfig } from "@/config/site";
import { getSocialCard } from "@/lib/metadata";

import "katex/dist/katex.min.css";
import "@/app/globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});

const monaspaceNeon = localFont({
  src: "./fonts/MonaspaceNeon-Var.woff2",
  display: "swap",
  variable: "--font-monaspace",
  weight: "200 800",
  adjustFontFallback: false,
});

const defaultSocialCard = getSocialCard("Home");

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    template: "%s | melikechan",
    default: siteConfig.title,
  },
  description: siteConfig.description,
  keywords: ["melikechan", "Melike Vurucu"],
  authors: siteConfig.authors.map((name) => ({ name, url: siteConfig.url })),
  creator: siteConfig.authors[0],
  publisher: siteConfig.authors[0],
  referrer: "origin-when-cross-origin",
  openGraph: {
    siteName: siteConfig.name,
    title: {
      template: "%s | melikechan",
      default: siteConfig.title,
    },
    description: siteConfig.description,
    url: siteConfig.url,
    locale: "en_US",
    type: "website",
    images: [defaultSocialCard],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      template: "%s | melikechan",
      default: siteConfig.title,
    },
    description: siteConfig.description,
    images: [defaultSocialCard],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${lexend.variable} ${monaspaceNeon.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap"
        />
      </head>
      <body className="bg-background text-foreground font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <div className="flex flex-col min-h-screen w-full max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16 mt-4">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
