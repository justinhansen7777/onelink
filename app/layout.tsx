import type { Metadata } from 'next';
import React from 'react';
import '../styles/globals.css';
import Header from '../components/Header';

export const metadata: Metadata = {
  title: 'Onelink – AI Solutions',
  description: 'From training to product – we accelerate your AI transformation.',
  icons: {
    icon: '/small-logo.png',
  },
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <ul className="footer__links">

        </ul>
        <p>&copy; {new Date().getFullYear()} Onelink. All rights reserved.</p>
      </div>
    </footer>
  );
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