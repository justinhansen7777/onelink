'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'solutions' | 'portfolio' | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [useLightLogo, setUseLightLogo] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) setOpenDropdown(null);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  useEffect(() => {
    let rafId = 0;

    const updateLogoVariant = () => {
      const header = document.querySelector<HTMLElement>('.header');
      const headerHeight = header?.offsetHeight ?? 96;
      const probeY = Math.min(window.innerHeight - 1, Math.max(0, Math.round(headerHeight * 0.75)));
      const containers = Array.from(document.querySelectorAll<HTMLElement>('section, footer'));
      const currentContainer =
        containers.find((container) => {
          const rect = container.getBoundingClientRect();
          return rect.top <= probeY && rect.bottom >= probeY;
        }) ?? null;

      if (!currentContainer) {
        setUseLightLogo(false);
        return;
      }

      const containerClasses = Array.from(currentContainer.classList).map((className) => className.toLowerCase());
      const isAuroraSection = containerClasses.some((className) => className.includes('aurora'));
      const isDarkNonAuroraSection = containerClasses.some((className) =>
        ['contact-panel', 'challenges'].includes(className)
      );

      setUseLightLogo(isAuroraSection || isDarkNonAuroraSection);
    };

    const requestUpdate = () => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateLogoVariant();
      });
    };

    updateLogoVariant();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  const headerLogoSrc = useLightLogo ? '/5.png' : '/4.png';

  return (
    <header className={`header ${useLightLogo ? 'header--aurora' : 'header--light'}`}>
      <div className="container nav">
        <Link href="/" className="nav__logo">
          <Image
            src={headerLogoSrc}
            alt="Onelink Logo"
            width={195}
            height={62}
            style={{ height: '62px', width: 'auto' }}
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
            <li>
              <Link href="/about" className="nav__link" onClick={closeMenu}>
                About
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
                <li><Link href="/portfolio#oneview" onClick={closeMenu}>Oneview</Link></li>
                <li><Link href="/portfolio#onesynq" onClick={closeMenu}>Onesynq</Link></li>
                <li><Link href="/portfolio#onechat" onClick={closeMenu}>Onechat</Link></li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className="nav__buttons">
          <label className="nav__language-label" htmlFor="header-language-select">
            Language
          </label>
          <select
            id="header-language-select"
            className="nav__language-select"
            value={selectedLanguage}
            onChange={(event) => setSelectedLanguage(event.target.value)}
            aria-label="Select language"
          >
            <option value="en" aria-label="English">🇬🇧</option>
            <option value="nl" aria-label="Dutch">🇳🇱</option>
            <option value="de" aria-label="German">🇩🇪</option>
            <option value="fr" aria-label="French">🇫🇷</option>
          </select>
          <Link href="/#contact" className="btn btn--hero-action btn--transparent-box nav__btn">
            Free AI readiness scan
          </Link>
          <Link href="https://cal.com/justin-hansen/30min" target="_blank" rel="noopener noreferrer" className="btn btn--hero-action btn--transparent-box nav__btn">
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
