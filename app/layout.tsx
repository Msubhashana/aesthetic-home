import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { WishlistProvider } from "@/app/context/WishlistContext";
import { Inter } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Daily Decor Finds",
    template: "%s | Daily Decor Finds", // Show other pages
  },
  description: "Discover curated home decor, cozy lighting, and aesthetic tech accessories for your dream space.",
  verification: {
    other: {
      "p:domain_verify": "20d8b6bf7ab1ac802df374fe3ccdb3eb",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <WishlistProvider>  {/* <--- UPDATED THIS */}
        <Navbar />
        {children}
        <Footer />
      </WishlistProvider>
      </body>
    </html>
  );
}
