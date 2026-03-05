import Link from 'next/link';
import Image from 'next/image';

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
            <p className="site-footer__tagline">AI That Works</p>
          </div>

          <nav className="site-footer__nav" aria-label="Footer navigation">
            <div className="site-footer__column">
              <h3>Company</h3>
              <ul>
                <li>
                  <Link href="/#about">What We Do</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
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
                  <Link href="/#contact-form">Email</Link>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/onelink-ai/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="tel:+31631336575">Telephone</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p>Onelink &copy; All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
