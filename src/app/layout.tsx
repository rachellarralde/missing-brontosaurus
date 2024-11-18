import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { geistSans, geistMono } from "./typography";

export const metadata: Metadata = {
  title: "Missing Brontosaurus",
  description: "Record label",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <Navbar />
        <main className="pt-12 pb-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
