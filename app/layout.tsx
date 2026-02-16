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
  title: "Tharuka Umayanga | Portfolio",
  description: "IT Undergraduate at SLIIT | Full Stack Developer specializing in Next.js, React, and Modern Web Technologies.",
  keywords: ["Tharuka Umayanga", "Portfolio", "Full Stack Developer", "SLIIT", "IT Undergraduate", "Next.js", "React", "Web Developer", "Sri Lanka"],
  authors: [{ name: "Tharuka Umayanga" }],
  creator: "Tharuka Umayanga",
  openGraph: {
    title: "Tharuka Umayanga | Portfolio",
    description: "IT Undergraduate at SLIIT | Full Stack Developer crafting high-end digital experiences.",
    url: "https://tharuka-portfolio.vercel.app", // Replace with actual URL if different
    siteName: "Tharuka Umayanga Portfolio",
    images: [
      {
        url: "/opengraph-image", // Next.js automatically handles this route
        width: 1200,
        height: 630,
        alt: "Tharuka Umayanga Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tharuka Umayanga | Portfolio",
    description: "IT Undergraduate at SLIIT | Full Stack Developer specializing in Next.js & React.",
    images: ["/opengraph-image"], // Next.js automatically handles this route
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
