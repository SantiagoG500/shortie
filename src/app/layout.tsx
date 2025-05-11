import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from './providers';

import { auth } from '@/auth';
import { MainNavBar } from '@/components/MainNavBar';
import { Footer } from '@/components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shortie",
  description: "An Open source link shortener, created with Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
    return (
    <html lang="en" className='dark'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <MainNavBar session={session}/>
          <main className='min-h-screen'>
            {children}
          </main>
        </Providers>
        <Footer/>
      </body>
    </html>
  );
}