import { Lato } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import Footer from "../components/Footer";
import { ThemeProvider } from "next-themes";

import { cn } from "@/utils/styling";
import { env } from "@/env";

import "katex/dist/katex.min.css";
import "@/app/globals.css";

const sansSerif = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  display: "swap",
});

const defaultUrl = env.NEXT_PUBLIC_SITE_URL;

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    template: "%s | melikechan",
    default: "melikechan",
  },
  description: "melikechan's personal website.",
  creator: "Melike Vurucu (melikechan)",
  publisher: "Melike Vurucu (melikechan)",
  referrer: "origin-when-cross-origin",
  openGraph: {
    site_name: "melikechan",
    title: {
      template: "%s | melikechan",
      default: "melikechan",
    },
    description: "melikechan's personal website.",
    url: new URL(defaultUrl),
    locale: "en_US",
    type: "website",
    images: [`${defaultUrl}/logo.png`],
  },
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={cn(sansSerif.className)}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link rel="icon" href="/logo.svg" />
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex flex-col min-h-screen mx-2 mt-4">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
