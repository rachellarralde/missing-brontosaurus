import localFont from "next/font/local";


export const carnotaurus = localFont({
  src: "./fonts/Carnotaurus.ttf",
  variable: "--font-default",
  weight: "400",
});

export const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
  });

export const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
  });
  
export const defaultFont = carnotaurus;
