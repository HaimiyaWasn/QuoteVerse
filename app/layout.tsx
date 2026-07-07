import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuoteVerse by Haimiya Wasn",
  description: "Create Random Quote from API",

  openGraph: {
    title: "Randomize Quote by Haimiya Wasn",
    description: "Create Random Quote from API",
    url: "https://quote-verse-randomize.vercel.app/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1920,
        height: 1080,
        alt: "Random Quote"
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Randomize Quote by Haimiya Wasn",
    description: "Create Random Quote from API",
    images: ["/og-image.jpg"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
