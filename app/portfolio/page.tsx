import React from 'react';
import Link from 'next/link';

export default function PortfolioPage() {
  return (
    <>
      <section className="hero hero--aurora">
        <div className="container">
          <h1 className="font-satoshi">Portfolio</h1>
          <p className="hero__subheadline">
            A showcase of platforms, workflows, and AI products we have built to help organizations move faster with confidence.
          </p>
          <div className="hero__buttons">
            <Link href="/#work" className="btn btn--secondary btn--hero-secondary font-satoshi">
              View our work
            </Link>
            <Link
              href="https://cal.com/justin-hansen/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--hero-primary font-satoshi"
            >
              Schedule a call
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="font-satoshi" style={{ color: 'var(--text-primary)' }}>
            Featured projects
          </h2>
          <p style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
            Explore a selection of practical AI implementations, from operational dashboards to secure knowledge assistants and automation systems.
          </p>
        </div>
      </section>
    </>
  );
}
