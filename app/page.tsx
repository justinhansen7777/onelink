'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CompanyCarousel } from '../components/CompanyCarousel';
import { ChallengesSection } from '@/components/ChallengesSection';

export default function HomePage() {
  const [activeWorkItem, setActiveWorkItem] = useState('oneview');
  const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pillarSpotlights, setPillarSpotlights] = useState([
    { x: 0, y: 0, opacity: 1 },
    { x: 0, y: 0, opacity: 0 },
    { x: 0, y: 0, opacity: 0 }
  ]);

  useEffect(() => {
    const workItems = Array.from(document.querySelectorAll<HTMLElement>('[data-work-item]'));

    if (!workItems.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) {
          return;
        }

        const currentId = visibleEntries[0].target.getAttribute('data-work-item');
        if (currentId) {
          setActiveWorkItem(currentId);
        }
      },
      {
        threshold: [0.25, 0.45, 0.65],
        rootMargin: '-12% 0px -30% 0px'
      }
    );

    workItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const latestPointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const updateClosestPillarSpotlight = (clientX: number, clientY: number) => {
      const rects = pillarRefs.current.map((pillar) => pillar?.getBoundingClientRect() ?? null);

      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      rects.forEach((rect, index) => {
        if (!rect) {
          return;
        }

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(clientX - centerX, clientY - centerY);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (!Number.isFinite(closestDistance)) {
        return;
      }

      setPillarSpotlights((previous) =>
        previous.map((spotlight, index) => {
          const rect = rects[index];
          if (!rect) {
            return spotlight;
          }

          const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
          const y = Math.max(0, Math.min(rect.height, clientY - rect.top));

          return {
            x,
            y,
            opacity: index === closestIndex ? 1 : 0
          };
        })
      );
    };

    const handleMouseMove = (event: globalThis.MouseEvent) => {
      latestPointer.x = event.clientX;
      latestPointer.y = event.clientY;
      updateClosestPillarSpotlight(event.clientX, event.clientY);
    };

    const handleViewportChange = () => {
      updateClosestPillarSpotlight(latestPointer.x, latestPointer.y);
    };

    updateClosestPillarSpotlight(latestPointer.x, latestPointer.y);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleViewportChange, { passive: true });
    window.addEventListener('resize', handleViewportChange);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleViewportChange);
      window.removeEventListener('resize', handleViewportChange);
    };
  }, []);

  return (
    <>
      {/* 1. Hero Section */}
      <section id="home" className="hero hero--aurora">
        <div className="container">
          <h1 className="font-satoshi">
            AI that works.
          </h1>
          <p className="hero__subheadline">
            We build a <strong>working AI system</strong> where governance, culture, and technology come together. Start with our <strong>free AI Readiness Scan</strong> and discover where the biggest opportunities lie.
          </p>
          <div className="hero__buttons">
            <Link href="#contact" className="btn btn--secondary btn--hero-secondary font-satoshi">
              Free AI Readiness Scan
            </Link>
            <Link href="https://cal.com/justin-hansen/30min" target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--hero-primary font-satoshi">
              Schedule a call
            </Link>
          </div>
        </div>
      </section>

      {/* Companies strip (below hero) */}
      <section className="companies-section" aria-label="Organisations we helped">
        <CompanyCarousel />
      </section>

      {/* What We Do + How We Do It */}
      <section id="what-we-do" className="what-we-do">
        <div className="container">
          <h2 className="what-we-do__title font-satoshi">
           We build your AI system <span style={{ color: 'var(--text-primary)' }}></span>
          </h2>
          <p className="what-we-do__intro">
            From our experience, AI initiatives rarely fail because of the technology itself. They fail because governance, culture, and systems are not aligned. Real impact only happens when these elements evolve together as one integrated system.
          </p>
          <div className="what-we-do__diagram">
            <div className="what-we-do__system-bracket" aria-hidden="true">
              <span className="what-we-do__system-label">System</span>
            </div>
            <div className="what-we-do__pillars-row">
              <div
                className="what-we-do__pillar"
                ref={(node) => {
                  pillarRefs.current[0] = node;
                }}
              >
              <div
                className="what-we-do__pillar-spotlight"
                style={{
                  opacity: pillarSpotlights[0].opacity,
                  background: `radial-gradient(420px circle at ${pillarSpotlights[0].x}px ${pillarSpotlights[0].y}px, rgba(0, 170, 255, 0.72), rgba(24, 113, 237, 0.58), rgba(14, 63, 176, 0.4), transparent 66%)`
                }}
              />
              <span className="what-we-do__pillar-label">Governance</span>
              <p className="what-we-do__pillar-text">Clear ownership, policies and decision rights so AI is safe and accountable.</p>
              </div>
              <div
                className="what-we-do__pillar"
                ref={(node) => {
                  pillarRefs.current[1] = node;
                }}
              >
              <div
                className="what-we-do__pillar-spotlight"
                style={{
                  opacity: pillarSpotlights[1].opacity,
                  background: `radial-gradient(420px circle at ${pillarSpotlights[1].x}px ${pillarSpotlights[1].y}px, rgba(0, 170, 255, 0.72), rgba(24, 113, 237, 0.58), rgba(14, 63, 176, 0.4), transparent 66%)`
                }}
              />
              <span className="what-we-do__pillar-label">Culture</span>
              <p className="what-we-do__pillar-text">People who understand and adopt AI, with the right mindset and skills.</p>
              </div>
              <div
                className="what-we-do__pillar"
                ref={(node) => {
                  pillarRefs.current[2] = node;
                }}
              >
              <div
                className="what-we-do__pillar-spotlight"
                style={{
                  opacity: pillarSpotlights[2].opacity,
                  background: `radial-gradient(420px circle at ${pillarSpotlights[2].x}px ${pillarSpotlights[2].y}px, rgba(0, 170, 255, 0.72), rgba(24, 113, 237, 0.58), rgba(14, 63, 176, 0.4), transparent 66%)`
                }}
              />
              <span className="what-we-do__pillar-label">Technology</span>
              <p className="what-we-do__pillar-text">Tools, platforms and integrations that fit your workflows and scale.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Testimonials Section */}
      <section id="testimonials" className="testimonials">
          <div className="container">
            <div className="testimonial">
              <div className="testimonial__avatar-box">
                <Image
                  src="/testimonial-avatar-susanne.png"
                  alt="Portrait of Susanne Commandeur"
                  width={420}
                  height={420}
                  className="testimonial__avatar"
                />
              </div>
              <div className="testimonial__content">
                <p className="testimonial__company-logo" aria-label="Company logo">
                  Uniek
                </p>
                <p className="testimonial__text">
                  "Onelink truly helped us to better understand and apply AI within our organization. They were able to explain complex theories clearly and provided practical examples that directly met our needs. Their expertise and personal approach gave us not only new insights but also concrete steps to integrate AI into our work. Thanks to Onelink, we feel prepared to make the most of AI&apos;s potential in the future."
                </p>
                <div className="testimonial__meta">
                  <p className="testimonial__name">Susanne Commandeur</p>
                  <p className="testimonial__function">Director at Uniek</p>
                  <Link href="#work" className="btn btn--live testimonial__use-case-btn">
                    Use case
                  </Link>
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* 5. Contact CTA Section */}
      <section id="contact">
        <div className="container">
            <div className="cta cta--aurora hero--aurora">
                <h2 className="font-satoshi">Already get some insights today?</h2>
                <p>Start with our AI Readiness Scan and get a great fundament</p>
                <div className="cta__buttons">
                  <Link href="/#contact" className="btn btn--live">
                    Start the AI Readiness Scan
                  </Link>
                  <Link href="https://cal.com/justin-hansen/30min" target="_blank" rel="noopener noreferrer" className="btn btn--outline nav__btn">
                    Schedule a call already
                  </Link>
                </div>
            </div>
        </div>
      </section>

      {/* Challenges Section */}
      <ChallengesSection />

      {/* 3. Products Section -> Renamed to Work */}
      <section id="work">
        <div className="container">
          <h2 className="font-satoshi" style={{ color: 'var(--text-primary)' }}>
            Our Work
          </h2>
          <p className="subtitle">A selection of AI-powered products developed by Onelink.

</p>
          
          <div className="work-items-container">
            {/* Work Item 1: Oneview */}
            <div
              className={`work-item work-item--single-image ${activeWorkItem === 'oneview' ? 'is-active' : ''}`}
              data-work-item="oneview"
            >
              <span className="work-item__timeline-marker" aria-hidden="true"></span>
               <div className="work-item__image-box">
                  <Image 
                    src="/screenshot-2025-09-21-12-48-59.png"
                    alt="Oneview dashboard preview"
                    width={400}
                    height={250}
                    className="work-item__image"
                  />
              </div>
              <div className="work-item__content">
                 <Image 
                  src="/3.png"
                  alt="Oneview Logo"
                  width={150}
                  height={40}
                  className="work-item__logo-title"
                />
                <h3 className="work-item__title">Oneview</h3>
                 <div className="work-item__description">
                  <p>A platform that gives teams a clear, visual overview of their business.



</p>
                  <p>Helps you monitor progress, spot bottlenecks and stay aligned across teams.



</p>
                </div>
                <div className="work-item__separator"></div>
                <Link href="https://www.oneviewai.nl" target="_blank" rel="noopener noreferrer" className="btn btn--live">
                  Learn more
                </Link>
              </div>
            </div>

            {/* Work Item 2: Onesynq */}
            <div
              className={`work-item work-item--single-image ${activeWorkItem === 'onesynq' ? 'is-active' : ''}`}
              data-work-item="onesynq"
            >
              <span className="work-item__timeline-marker" aria-hidden="true"></span>
              <div className="work-item__image-box">
                  <Image 
                    src="/hero-dashboard.png"
                    alt="Onesynq dashboard preview"
                    width={400}
                    height={250}
                    className="work-item__image"
                  />
              </div>
              <div className="work-item__content">
                <Image 
                  src="/1.png"
                  alt="Onesynq Logo"
                  width={150}
                  height={40}
                  className="work-item__logo-title"
                />
                <h3 className="work-item__title">Onesynq</h3>
                <div className="work-item__description">
                  <p>A communication layer that connects planning tools with frontline teams.</p>
                  <p>Keeps everyone aligned through smart messaging, task syncing and real-time updates.

</p>
                </div>
                <div className="work-item__separator"></div>
                <Link href="https://onesynq.nl" target="_blank" rel="noopener noreferrer" className="btn btn--live">
                  Learn more
                </Link>
              </div>
            </div>

            {/* Work Item 3: Onechat */}
            <div
              className={`work-item work-item--single-image ${activeWorkItem === 'onechat' ? 'is-active' : ''}`}
              data-work-item="onechat"
            >
              <span className="work-item__timeline-marker" aria-hidden="true"></span>
              <div className="work-item__image-box">
                  <Image 
                    src="/schermafbeelding-2025-07-08-10-17-57.png"
                    alt="Onechat dashboard preview"
                    width={400}
                    height={250}
                    className="work-item__image"
                  />
              </div>
              <div className="work-item__content">
                <Image 
                  src="/2.png"
                  alt="Onechat Logo"
                  width={150}
                  height={40}
                  className="work-item__logo-title"
                />
                <h3 className="work-item__title">Onechat</h3>
                <div className="work-item__description">
                  <p>A secure AI chatbot trained on your internal knowledge.
                  </p>
                  <p>Delivers fast, accurate answers without compromising your data.

</p>
                </div>
                <div className="work-item__separator"></div>
                <Link href="https://cal.com/justin-hansen/30min" target="_blank" rel="noopener noreferrer" className="btn btn--live">
                  Schedule a call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-panel" id="contact-form">
        <div className="container">
          <div className="contact-panel__shell">
            <div className="contact-panel__intro">
              <p className="contact-panel__eyebrow">Get in touch</p>
              <h2 className="contact-panel__title font-satoshi">Let&apos;s talk about your AI roadmap</h2>
              <p className="contact-panel__copy">
                Share your details and context. We&apos;ll get back to you for a short call to explore your opportunities.
              </p>

              <div className="contact-panel__person">
                <div className="contact-panel__avatar" aria-hidden="true">
                  WK
                </div>
                <div className="contact-panel__person-meta">
                  <p className="contact-panel__name">Wessel van &apos;t Klooster</p>
                  <p className="contact-panel__role">Co-founder</p>
                </div>
              </div>

              <p className="contact-panel__note">
                Prefer to plan directly?{" "}
                <Link
                  href="https://cal.com/justin-hansen/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-panel__schedule-link"
                >
                  Schedule a call
                </Link>
                .
              </p>
            </div>

            <form className="contact-panel__form" onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" type="text" placeholder="Your name" required />

              <label htmlFor="contact-company">Company Name</label>
              <input id="contact-company" name="company" type="text" placeholder="Your company" required />

              <label htmlFor="contact-phone">Phone / Mobile</label>
              <input id="contact-phone" name="phone" type="tel" placeholder="+31 ..." required />

              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" placeholder="name@company.com" required />

              <label htmlFor="contact-message">What should we prepare for?</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell us your current challenge, goals, or idea."
                rows={4}
              />

              <button type="submit" className="btn btn--live contact-panel__submit">
                Request contact
              </button>
            </form>
          </div>
        </div>
      </section>

    </>
  );
}