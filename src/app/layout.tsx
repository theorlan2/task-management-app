import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Toaster } from "sonner";
import StoreProvider from "./StoreProvider";
import { Providers } from "../context/Providers";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import "./globals.css";
import "remixicon/fonts/remixicon.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Management App",
  description: "Manage your easy and fast your tasks",
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
        <StoreProvider>
          <Providers>
            <main className="">
              <Header />
              {children}
              <Footer />
            </main>
          </Providers>
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
