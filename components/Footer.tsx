import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container site-footer__container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link href="/" className="site-footer__logo" aria-label="Onelink homepage">
              <Image
                src="/4.png"
                alt="Onelink Logo"
                width={215}
                height={68}
                style={{ height: '68px', width: 'auto' }}
              />
            </Link>
            <p className="site-footer__tagline">Asana clarity in minutes</p>
          </div>

          <nav className="site-footer__nav" aria-label="Footer navigation">
            <div className="site-footer__column">
              <h3>Company</h3>
              <ul>
                <li>
                  <Link href="/#about">What We Do</Link>
                </li>
                <li>
                  <Link href="/solutions">Solutions</Link>
                </li>
                <li>
                  <Link href="/portfolio">Portfolio</Link>
                </li>
              </ul>
            </div>

            <div className="site-footer__column">
              <h3>Resources</h3>
              <ul>
                <li>
                  <Link href="/portfolio">Video</Link>
                </li>
                <li>
                  <Link href="/">FAQ</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p>Onelink &copy; All rights reserved.</p>
          <div className="site-footer__legal">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="site-footer__linkedin"
            >
              <FaLinkedinIn aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
