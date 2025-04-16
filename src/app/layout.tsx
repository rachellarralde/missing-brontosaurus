import type { Metadata } from "next";

import { defaultFont } from "./typography";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { SanityLive } from "@/sanity/live";

export const metadata: Metadata = {
  title: "Missing Brontosaurus",
  description: "A Record Label by NAIAD",
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
      <body className={`${defaultFont.variable} antialiased bg-background`}>
        <Navbar />
        <main className="w-full flex justify-center">
          {children}
        </main>
        <div className="w-96 h-24">{ /* scroll past footer */ }</div>
        <Footer />
        <SanityLive />
      </body>
    </html>
  );
}
