import type { Metadata } from 'next';
import React from 'react';
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Onelink – AI Solutions',
  description: 'From training to product – we accelerate your AI transformation.',
  icons: {
    icon: '/small-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
} 