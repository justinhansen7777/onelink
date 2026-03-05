import Link from 'next/link';

type InsightsCtaSectionProps = {
  withAnchorId?: boolean;
  /** Use scroll-reveal animation (only works on homepage where the observer runs) */
  useReveal?: boolean;
};

export default function InsightsCtaSection({ withAnchorId = false, useReveal = false }: InsightsCtaSectionProps) {
  return (
    <section
      id={withAnchorId ? 'contact' : undefined}
      className={`insights-cta-section${useReveal ? ' section-reveal' : ''}`}
    >
      <div className="container">
        <div className="cta">
          <h2 className="font-satoshi">Already get some insights today?</h2>
          <p>Start with our AI Readiness Scan and get a great fundament</p>
          <div className="cta__buttons">
            <Link href="/#contact" className="btn btn--live">
              Start the AI Readiness Scan
            </Link>
            <Link
              href="https://cal.com/justin-hansen/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline nav__btn"
            >
              Schedule a call already
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
