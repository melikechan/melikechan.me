import { Lexend } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/app/globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://melikechan.me"),
  title: "Summarization of Art Pieces Using Vision-Language Models",
  description:
    "An accessibility-focused approach to generating objective, visual descriptions of art pieces using fine-tuned Vision-Language Models.",
  authors: [
    { name: "Mustafa Taner Turan" },
    { name: "Melike Vurucu" },
    { name: "Bülent Tuğrul" },
  ],
  openGraph: {
    title: "Summarization of Art Pieces Using Vision-Language Models",
    description:
      "An accessibility-focused approach to generating objective, visual descriptions of art pieces using fine-tuned Vision-Language Models.",
    url: "https://melikechan.me/research/grad-project",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={lexend.className} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
        />
        <link rel="icon" href="https://melikechan.me/logo.svg" />
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex flex-col min-h-screen w-full px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
