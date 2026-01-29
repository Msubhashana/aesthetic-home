import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { WishlistProvider } from "@/app/context/WishlistContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Daily Decor Finds",
    template: "%s | Daily Decor Finds", // Show other pages
  },
  description: "Discover curated home decor, cozy lighting, and aesthetic tech accessories for your dream space.",
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
