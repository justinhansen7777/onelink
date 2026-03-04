'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'solutions' | 'portfolio' | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) setOpenDropdown(null);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
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
              <Link href="/#about" className="nav__link" onClick={closeMenu}>
                What We Do
              </Link>
            </li>
            <li
              className="nav__item--dropdown"
              onMouseEnter={() => setOpenDropdown('solutions')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link href="/solutions" className="nav__link nav__link--trigger">
                Solutions
              </Link>
              <ul className={`nav__dropdown ${openDropdown === 'solutions' ? 'nav__dropdown--open' : ''}`}>
                <li><Link href="/solutions" onClick={closeMenu}>Solutions overview</Link></li>
                <li><Link href="/#about" onClick={closeMenu}>Intelligent systems</Link></li>
                <li><Link href="/#training" onClick={closeMenu}>GenAI training</Link></li>
              </ul>
            </li>
            <li
              className="nav__item--dropdown"
              onMouseEnter={() => setOpenDropdown('portfolio')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link href="/portfolio" className="nav__link nav__link--trigger">
                Portfolio
              </Link>
              <ul className={`nav__dropdown ${openDropdown === 'portfolio' ? 'nav__dropdown--open' : ''}`}>
                <li><Link href="/portfolio" onClick={closeMenu}>Portfolio overview</Link></li>
                <li><Link href="/#work" onClick={closeMenu}>Our work</Link></li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className="nav__buttons">
          <Link href="/#contact" className="btn btn--live">
            Free AI readiness scan
          </Link>
          <Link href="https://cal.com/justin-hansen/30min" target="_blank" rel="noopener noreferrer" className="btn btn--outline nav__btn">
            Schedule a call
          </Link>
        </div>
        <button className="nav__toggle" onClick={toggleMenu} aria-label="Toggle menu">
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;
