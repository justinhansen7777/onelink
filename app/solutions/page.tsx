import React from 'react';
import Link from 'next/link';

export default function SolutionsPage() {
  return (
    <section className="hero" style={{ paddingTop: '8rem' }}>
      <div className="container">
        <h1 className="font-satoshi">
          <span style={{ color: 'var(--text-primary)' }}>Our</span>{' '}
          <span className="text-gradient">Solutions</span>
        </h1>
        <p className="hero__subheadline" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
          From intelligent systems to GenAI training, we help organizations put AI to work in a secure, scalable way.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
          <Link href="/#about" className="btn btn--gradient-border font-satoshi">
            Intelligent systems
          </Link>
          <Link href="/#training" className="btn btn--gradient-border font-satoshi">
            GenAI training
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
