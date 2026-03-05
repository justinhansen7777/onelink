'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CompanyCarousel } from '../components/CompanyCarousel';
import { ChallengesSection } from '@/components/ChallengesSection';
import InsightsCtaSection from '@/components/InsightsCtaSection';

type TestimonialSlide = {
  id: string;
  company: string;
  quote: string;
  logoSrc: string;
  logoAlt: string;
  useCaseHref: string;
  author?: string;
  role?: string;
};

export default function HomePage() {
  const [activeWorkItem, setActiveWorkItem] = useState('oneview');
  const testimonialMeasureRef = useRef<HTMLDivElement>(null);
  const howQuoteCardRef = useRef<HTMLElement>(null);
  const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pillarSpotlights, setPillarSpotlights] = useState([
    { x: 0, y: 0, opacity: 1 },
    { x: 0, y: 0, opacity: 0 },
    { x: 0, y: 0, opacity: 0 }
  ]);
  const trajectorySteps = [
    {
      phase: '0. AI Readiness Scan',
      text: 'A quick assessment that reveals where AI can create the most value in your organization.',
      labels: [
        'Assess AI readiness',
        'Identify opportunities',
        'Map key domains',
        'Create opportunity map'
      ]
    },
    {
      phase: '1. Diagnose & Opportunity',
      text: 'We analyze processes, data, and stakeholders to identify the AI opportunities with the highest impact.',
      labels: [
        'Analyze processes',
        'Assess data',
        'Interview stakeholders',
        'Define use cases'
      ]
    },
    {
      phase: '2. Architect & Design',
      text: 'We design a scalable AI architecture and define how AI integrates with existing systems.',
      labels: [
        'Design architecture',
        'Plan integrations',
        'Define governance',
        'Create roadmap'
      ]
    },
    {
      phase: '3. Build, Integrate & Adopt',
      text: 'We develop and integrate AI solutions into existing workflows and support teams in adopting them.',
      labels: [
        'Develop AI solutions',
        'Integrate systems',
        'Automate workflows',
        'Deploy to production'
      ]
    },
    {
      phase: '4. Embed & Scale',
      text: 'AI becomes a structural capability in the organization with monitoring, governance, and continuous improvement.',
      labels: [
        'Monitor performance',
        'Optimize models',
        'Expand use cases',
        'Continuous improvement'
      ]
    }
  ];
  const [activeTrajectoryIndex, setActiveTrajectoryIndex] = useState(0);
  const [isTrajectoryAutoShuffleEnabled, setIsTrajectoryAutoShuffleEnabled] = useState(true);
  const [howSectionRightHeight, setHowSectionRightHeight] = useState<number | null>(null);
  const testimonials: TestimonialSlide[] = [
    {
      id: 'dopharma-1',
      company: 'Dopharma',
      quote:
        "Onelink truly helped us to better understand and apply AI within our organization. They were able to explain complex theories clearly and provided practical examples that directly met our needs. Their expertise and personal approach gave us not only new insights but also concrete steps to integrate AI into our work. Thanks to Onelink, we feel prepared to make the most of AI's potential in the future.",
      logoSrc: '/Dopharma-logo_hor_rgb_HR-scaled.png',
      logoAlt: 'Dopharma logo',
      useCaseHref: '#work'
    },
    {
      id: 'bluehive-1',
      company: 'OPG',
      quote:
        "As an Asana partner we see how challenging it can be for enterprise clients to get a clear overview of their entire setup. Oneview is unique because it instantly shows where structures, goals and projects align and where gaps exist. With its AI-driven recommendations, and while keeping a human in the loop, we can implement targeted improvements that make a real difference.",
      logoSrc: '/1771927763203.png',
      logoAlt: 'Bluehive logo',
      useCaseHref: '#work'
    },
    {
      id: 'studioqast-1',
      company: 'Studio Qast',
      quote:
        "As a custom cabinet builder, we manage countless appointments, client projects and operational tasks every week. Even though we used Asana daily, it was difficult to really see the bigger picture and understand how everything connected. Oneview changed that for us. The interactive map gave us instant clarity on our structure and priorities, and the AI consultant highlighted improvements we hadn't considered. What made the biggest impact was combining those AI insights with human follow-up, turning recommendations into concrete changes in how we work.",
      logoSrc: '/0x0.png',
      logoAlt: 'Studio Qast logo',
      useCaseHref: '#work',
    }
  ];
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [testimonialCardHeight, setTestimonialCardHeight] = useState(400);

  useEffect(() => {
    const { pathname, search, hash } = window.location;
    const supportsManualRestoration = 'scrollRestoration' in window.history;
    const previousScrollRestoration = supportsManualRestoration ? window.history.scrollRestoration : 'auto';

    if (supportsManualRestoration) {
      window.history.scrollRestoration = 'manual';
    }

    if (hash) {
      window.history.replaceState(null, '', `${pathname}${search}`);
    }

    const scrollToHeroTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    scrollToHeroTop();
    window.requestAnimationFrame(scrollToHeroTop);

    return () => {
      if (supportsManualRestoration) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, []);

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
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.section-reveal'));

    if (!sections.length) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sections.forEach((section) => section.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-8% 0px -8% 0px'
      }
    );

    sections.forEach((section) => observer.observe(section));

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

  useEffect(() => {
    if (!isTrajectoryAutoShuffleEnabled) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveTrajectoryIndex((prev) => (prev + 1) % trajectorySteps.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isTrajectoryAutoShuffleEnabled, trajectorySteps.length]);

  useEffect(() => {
    const quoteCard = howQuoteCardRef.current;

    if (!quoteCard) {
      return;
    }

    const syncRightHeight = () => {
      setHowSectionRightHeight(Math.ceil(quoteCard.getBoundingClientRect().height));
    };

    syncRightHeight();

    const resizeObserver = new ResizeObserver(syncRightHeight);
    resizeObserver.observe(quoteCard);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const measureCards = () => {
      if (!testimonialMeasureRef.current) {
        return;
      }

      const measuredCards = Array.from(
        testimonialMeasureRef.current.querySelectorAll<HTMLElement>('.testimonial--measure-item')
      );

      if (!measuredCards.length) {
        return;
      }

      const maxHeight = Math.max(...measuredCards.map((card) => card.getBoundingClientRect().height));
      if (Number.isFinite(maxHeight) && maxHeight > 0) {
        setTestimonialCardHeight(Math.ceil(maxHeight) + 48);
      }
    };

    const rafId = window.requestAnimationFrame(measureCards);
    const timeoutId = window.setTimeout(measureCards, 300);
    window.addEventListener('resize', measureCards);
    if ('fonts' in document) {
      document.fonts.ready.then(measureCards).catch(() => undefined);
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      window.removeEventListener('resize', measureCards);
    };
  }, []);

  const [testimonialAutoplay, setTestimonialAutoplay] = useState(true);

  useEffect(() => {
    if (!testimonialAutoplay) return;
    const interval = setInterval(() => {
      setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonialAutoplay, testimonials.length]);

  const activeTestimonial = testimonials[activeTestimonialIndex];
  const goToPreviousTestimonial = () => {
    setTestimonialAutoplay(false);
    setActiveTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  const goToNextTestimonial = () => {
    setTestimonialAutoplay(false);
    setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

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
            <Link href="#contact" className="btn btn--hero-action btn--transparent-box font-satoshi">
              Free AI Readiness Scan
            </Link>
            <Link href="https://cal.com/justin-hansen/30min" target="_blank" rel="noopener noreferrer" className="btn btn--hero-action btn--transparent-box font-satoshi">
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
      <section id="what-we-do" className="what-we-do section-reveal">
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

      <section className="how-section how-section--aurora section-reveal" id="how">
        <div className="how-section__aurora-extra" aria-hidden="true" />
        <div className="container">
          <h2 className="how-section__title font-satoshi">We are your innovation AI partner</h2>
          <p className="how-section__subtitle">And this is our approach</p>
          <div className="how-section__layout">
            <div className="how-section__quote-column">
              <article className="how-section__quote-card" ref={howQuoteCardRef}>
                <div className="how-section__quote-top">
                  <div className="how-section__avatar" aria-hidden="true">
                    <Image
                      src="/Ontwerp zonder titel (83).png"
                      alt=""
                      width={180}
                      height={180}
                      className="how-section__avatar-image"
                    />
                  </div>
                  <div className="how-section__quote-person">
                    <p className="how-section__quote-name">Justin Hansen</p>
                    <p className="how-section__quote-function">Operational &amp; Product Lead</p>
                    <p className="how-section__quote-company">Onelink</p>
                  </div>
                </div>
                <p className="how-section__quote-copy">
                  Our goal is a hybrid model: personal guidance combined with data-driven, standardized solutions, so we can deliver both tailored outcomes and scalable, continuous service. We start at step 0 by assessing data maturity and AI readiness first, then design implementations that fit the full organization and make real impact measurable.
                </p>
              </article>
            </div>

            <article
              className="how-section__card"
              aria-live="polite"
              style={howSectionRightHeight ? { height: `${howSectionRightHeight}px` } : undefined}
            >
              <div className="how-section__steps" aria-label="Trajectory chapters">
                {trajectorySteps.map((step, index) => {
                  const [tabNumber, ...tabLabelParts] = step.phase.split('. ');
                  const tabLabel = tabLabelParts.join('. ');
                  const isExpanded = index === activeTrajectoryIndex;

                  return (
                  <div
                    key={step.phase}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isExpanded}
                    className={`how-section__step ${isExpanded ? 'is-active' : ''}`}
                    onMouseEnter={() => {
                      setActiveTrajectoryIndex(index);
                      setIsTrajectoryAutoShuffleEnabled(false);
                    }}
                    onFocus={() => {
                      setActiveTrajectoryIndex(index);
                      setIsTrajectoryAutoShuffleEnabled(false);
                    }}
                    onClick={() => {
                      setActiveTrajectoryIndex(index);
                      setIsTrajectoryAutoShuffleEnabled(false);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setActiveTrajectoryIndex(index);
                        setIsTrajectoryAutoShuffleEnabled(false);
                      }
                    }}
                  >
                    <div className="how-section__step-header">
                      <div className="how-section__step-heading">
                        <span className="how-section__step-number">{tabNumber}.</span>
                        <span className="how-section__step-label">{tabLabel}</span>
                      </div>
                      <div className="how-section__step-badges">
                        {index === 0 && (
                          <Link href="/#contact" className="btn btn--transparent-box how-section__scan-cta">
                            Free AI readiness Scan
                          </Link>
                        )}
                        {index > 0 && (
                          <Link
                            href="https://cal.com/justin-hansen/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--transparent-box how-section__scan-cta"
                          >
                            Talk to Sales
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="how-section__step-content">
                      <ul className="how-section__labels-list" aria-label="What we will deliver">
                        {step.labels.map((label) => (
                          <li key={label} className="how-section__label-item">
                            {label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  );
                })}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 2. Testimonials Section */}
      <section
        id="testimonials"
        className="testimonials section-reveal"
        style={{ ['--testimonial-card-height' as string]: `${testimonialCardHeight}px` }}
      >
          <div className="container">
            <h2 className="font-satoshi testimonials__title">What our clients say</h2>
            <div className="testimonials__carousel" aria-label="Testimonial carousel">
              <button
                type="button"
                className="testimonials__control testimonials__control--prev font-satoshi"
                onClick={goToPreviousTestimonial}
                aria-label="Previous testimonial"
              >
                <span className="testimonials__glyph testimonials__glyph--prev">↓</span>
              </button>
              <div className="testimonial" key={activeTestimonial.id} aria-live="polite">
                <div className="testimonial__avatar-box">
                  <Image
                    src={activeTestimonial.logoSrc}
                    alt={activeTestimonial.logoAlt}
                    width={420}
                    height={420}
                    className="testimonial__avatar"
                  />
                </div>
                <div className="testimonial__content">
                  <p className="testimonial__company-logo" aria-label="Company logo">
                    {activeTestimonial.company}
                  </p>
                  <div className="testimonial__text-wrap">
                    <p className="testimonial__text">
                      "{activeTestimonial.quote}"
                    </p>
                    {activeTestimonial.author && (
                      <div className="testimonial__author">
                        <p className="testimonial__author-name">{activeTestimonial.author}</p>
                        {activeTestimonial.role && (
                          <p className="testimonial__author-role">{activeTestimonial.role}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="testimonials__control testimonials__control--next font-satoshi"
                onClick={goToNextTestimonial}
                aria-label="Next testimonial"
              >
                <span className="testimonials__glyph testimonials__glyph--next">↓</span>
              </button>
            </div>
            <div className="testimonials__measure" ref={testimonialMeasureRef} aria-hidden="true">
              {testimonials.map((testimonial) => (
                <div className="testimonial testimonial--measure-item" key={`${testimonial.id}-measure`}>
                  <div className="testimonial__avatar-box">
                    <Image
                      src={testimonial.logoSrc}
                      alt=""
                      width={420}
                      height={420}
                      className="testimonial__avatar"
                    />
                  </div>
                  <div className="testimonial__content">
                    <p className="testimonial__company-logo">
                      {testimonial.company}
                    </p>
                    <div className="testimonial__text-wrap">
                      <p className="testimonial__text">
                        "{testimonial.quote}"
                      </p>
                      {testimonial.author && (
                        <div className="testimonial__author">
                          <p className="testimonial__author-name">{testimonial.author}</p>
                          {testimonial.role && (
                            <p className="testimonial__author-role">{testimonial.role}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </section>

      {/* 5. Contact CTA Section */}
      <InsightsCtaSection withAnchorId useReveal />

      {/* Challenges Section */}
      <ChallengesSection />

      {/* 3. Products Section -> Renamed to Work */}
      <section id="work" className="section-reveal">
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
               <div className="work-item__image-box">
                  <Image 
                    src="/Scherm%C2%ADafbeelding%202026-03-05%20om%2010.35.12.png"
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
                <span className="work-item__year">2026</span>
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
                <span className="work-item__year">2025</span>
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
              <div className="work-item__image-box">
                  <Image 
                    src="/schermafbeelding-2025-07-08-10-17-57.png"
                    alt="Onechat dashboard preview"
                    width={400}
                    height={250}
                    className="work-item__image work-item__image--onechat"
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
                <span className="work-item__year">2025</span>
                <h3 className="work-item__title">Onechat</h3>
                <div className="work-item__description">
                  <p>A secure AI chatbot trained on your internal knowledge.
                  </p>
                  <p>Delivers fast, accurate answers without compromising your data.

</p>
                </div>
                <div className="work-item__separator"></div>
                <Link href="https://cal.com/justin-hansen/30min" target="_blank" rel="noopener noreferrer" className="btn btn--live">
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-panel section-reveal" id="contact-form">
        <div className="container">
          <div className="contact-panel__shell">
            <div className="contact-panel__aurora-extra" aria-hidden="true" />
            <div className="contact-panel__content">
              <div className="contact-panel__intro">
                <p className="contact-panel__eyebrow">Get in touch</p>
                <h2 className="contact-panel__title font-satoshi">Let&apos;s talk about your AI roadmap</h2>
                <p className="contact-panel__copy">
                  Share your details and context. We&apos;ll get back to you for a short call to explore your opportunities.
                </p>

                <div className="contact-panel__person">
                  <div className="contact-panel__avatar" aria-hidden="true">
                    <Image
                      src="/Ontwerp zonder titel (82).png"
                      alt="Wessel van 't Klooster"
                      width={168}
                      height={168}
                      className="contact-panel__avatar-image"
                    />
                  </div>
                  <div className="contact-panel__person-meta">
                    <p className="contact-panel__name">Wessel van &apos;t Klooster</p>
                    <p className="contact-panel__role">Co-founder</p>
                    <p className="contact-panel__company">Onelink</p>
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
        </div>
      </section>

      <Link
        href="#contact-form"
        className="go-down-button font-satoshi"
        aria-label="Go down to contact form"
      >
        ↓
      </Link>

    </>
  );
}