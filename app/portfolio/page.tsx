import React from 'react';
import Link from 'next/link';

export default function PortfolioPage() {
  return (
    <section className="hero" style={{ paddingTop: '8rem' }}>
      <div className="container">
        <h1 className="font-satoshi">
          <span style={{ color: 'var(--text-primary)' }}>Our</span>{' '}
          <span className="text-gradient">Portfolio</span>
        </h1>
        <p className="hero__subheadline" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
          A selection of AI-powered products and projects we’ve built for our clients.
        </p>
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/#work" className="btn btn--gradient-border font-satoshi">
            View our work
          </Link>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginTop: '2rem' }}>
          <Link href="/" className="nav__link" style={{ fontWeight: 600 }}>
            ← Back to home
          </Link>
        </p>
      </div>
    </section>
  );
}
