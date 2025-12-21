import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Promith - More than just a system",
    template: "%s | Promith",
  },
  description: "Transform your business with Promith's comprehensive solutions. Expert consulting and implementation services.",
  keywords: ["business solutions", "consulting", "promith", "enterprise software"],
  authors: [{ name: "Promith" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://promith.com",
    siteName: "Promith",
    title: "Promith - More than just a system",
    description: "Transform your business with Promith's comprehensive solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Promith - More than just a system",
    description: "Transform your business with Promith's comprehensive solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="antialiased font-sans">
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}