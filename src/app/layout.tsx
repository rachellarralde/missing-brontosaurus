import type { Metadata } from "next";

import { defaultFont } from "./typography";
import "./globals.css";
import EnhancedNavbar from "@/components/enhanced-navbar";
import Footer from "@/components/footer";
import { SanityLive } from "@/sanity/live";
import SimpleAnalytics from "@/components/SimpleAnalytics";

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
        <EnhancedNavbar />
        <main className="w-full flex justify-center pt-10">{children}</main>
        <div className="w-96 h-24">{/* scroll past footer */}</div>
        <Footer />
        <SanityLive />
        <SimpleAnalytics />
      </body>
    </html>
  );
}
