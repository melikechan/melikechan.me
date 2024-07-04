import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "melikechan",
  description: "melikechan's personal website.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link rel="icon" href="/logo.svg" />
      </head>
      <body className={inter.className + " bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
