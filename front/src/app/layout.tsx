import { Quicksand } from "next/font/google";
import { Ubuntu } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/nav/navbar";

export const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
});

export const ubuntu = Ubuntu({
  weight: "300",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "re-loved",
  description:
    "re-loved es una página donde puedes vender los objetos que ya no te sirvan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${ubuntu.className}`}>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
