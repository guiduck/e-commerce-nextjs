import type { Metadata } from "next";
import { Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HtmlWrapper } from "@/components/HtmlWrapper";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIVA TECH",
  description: "E-commerce app",
};

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HtmlWrapper fontVars={`${orbitron.variable} ${geistMono.variable}`}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <main>{children}</main>
        <Toaster richColors />
      </ThemeProvider>
    </HtmlWrapper>
  );
}
