'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container nav">
        <Link href="/" className="nav__logo">
          <Image
            src="/onelink-logo.png"
            alt="Onelink Logo"
            width={100}
            height={32}
            style={{ height: '32px', width: 'auto' }}
            priority
          />
        </Link>
        <nav>
          <ul className={`nav__links ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <Link href="/#home" className="nav__link" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/#work" className="nav__link" onClick={() => setIsMenuOpen(false)}>
                Our work
              </Link>
            </li>
            <li>
              <Link href="/#about" className="nav__link" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
               <Link href="/#training" className="nav__link" onClick={() => setIsMenuOpen(false)}>
                 GenAI training
               </Link>
            </li>
          </ul>
        </nav>
        <Link href="https://cal.com/justin-hansen/30min" target="_blank" rel="noopener noreferrer" className="btn btn--live">
          Schedule a call
        </Link>
        <button className="nav__toggle" onClick={toggleMenu} aria-label="Toggle menu">
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header; 