import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TradeSense AI Platform - Professional Prop Trading",
  description:
    "Advanced prop trading platform with AI-powered insights, real-time market data, and comprehensive challenge management.",
  keywords: [
    "prop trading",
    "trading platform",
    "AI trading",
    "market data",
    "trading challenges",
    "forex",
    "stocks",
  ],
  authors: [{ name: "TradeSense Team" }],
  creator: "TradeSense AI",
  publisher: "TradeSense AI",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tradesense.ai",
    title: "TradeSense AI Platform",
    description: "Professional prop trading platform with AI-powered insights",
    siteName: "TradeSense AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "TradeSense AI Platform",
    description: "Professional prop trading platform with AI-powered insights",
    creator: "@tradesense",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c4a6e" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <div id="root" className="relative flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
