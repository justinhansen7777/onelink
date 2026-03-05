'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import InsightsCtaSection from '@/components/InsightsCtaSection';

const team = [
  {
    name: "Wessel van 't Klooster",
    role: 'Business Development Lead',
    src: "/Ontwerp zonder titel (82).png",
    alt: "Wessel van 't Klooster",
    linkedin: 'https://www.linkedin.com/in/wessel-van-%E2%80%98t-klooster-5b2265201/',
  },
  {
    name: 'Justin Hansen',
    role: 'Operational & Product Lead',
    src: "/Ontwerp zonder titel (83).png",
    alt: 'Justin Hansen',
    linkedin: 'https://www.linkedin.com/in/justin-hansen-14a7ba19a',
  },
  {
    name: 'Olivier Wright',
    role: 'Technical Lead',
    src: "/Ontwerp zonder titel (84).png",
    alt: 'Olivier Wright',
    linkedin: 'https://www.linkedin.com/in/olivier-wright-4a78b3128/',
  },
];

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function AboutPage() {
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

  return (
    <>
      <section className="hero hero--aurora">
        <div className="container">
          <h1 className="font-satoshi">About</h1>
          <p className="hero__subheadline">
            We help organizations put AI to work with governance, culture, and technology aligned as one system.
          </p>
          <div className="hero__buttons">
            <Link href="/#contact" className="btn btn--hero-action btn--transparent-box font-satoshi">
              Free AI Readiness Scan
            </Link>
            <Link
              href="https://cal.com/justin-hansen/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--hero-action btn--transparent-box font-satoshi"
            >
              Schedule a call
            </Link>
          </div>
        </div>
      </section>

      <section className="about-content-section section-reveal">
        <div className="container">
          <div className="about-content-section__grid">
            <div className="about-content-section__col about-content-section__col--text">
              <h2 className="font-satoshi about-content-section__title">Who we are</h2>
              <p className="about-content-section__text">
                Onelink was founded as an AI engineering partner for organizations that want to create sustainable competitive advantage through data and artificial intelligence. We believe AI is not a goal in itself, but a powerful tool to fundamentally improve processes, strengthen decision-making, and create new forms of value. Our focus is therefore on designing and building custom AI solutions that connect directly to the operational reality of an organization.
              </p>
              <p className="about-content-section__text">
                We believe that AI will become a structural part of almost every organization. Not as a standalone tool or experiment, but as an integrated capability embedded in the core of business operations. To enable this, we develop custom AI solutions that integrate with existing systems, data sources, and processes. These solutions connect different data environments, identify patterns, and translate complex information into actionable insights and decision support.
              </p>
              <p className="about-content-section__text">
                However, successful AI implementation requires more than technology alone. Without a solid data foundation, clear governance, and well-defined decision structures, AI initiatives often remain stuck in pilots or isolated experiments. That is why we always start by understanding an organization&apos;s data landscape and system environment. This allows us to design AI solutions that are not only technically sound, but also scalable, reliable, and valuable within daily operations.
              </p>
              <p className="about-content-section__text">
                Our philosophy is built around the principle of &ldquo;AI that works.&rdquo; Instead of building isolated AI applications, we develop integrated AI systems that connect multiple processes and technologies within an organization. By combining data from systems such as CRM, financial platforms, operational tools, and customer systems, we create an intelligent layer that reveals patterns, detects risks earlier, and supports better decision-making.
              </p>
              <p className="about-content-section__text">
                Internally, we therefore do not approach AI as a series of isolated experiments or one-off projects. We work through a structured approach to designing, building, and scaling custom AI solutions. By combining standardized architectures and proven delivery methods with tailored solutions for each client, we are able to deliver both scalability and real operational impact. In this way, we build AI solutions that not only deliver value today, but also support the long-term evolution of the organization.
              </p>
            </div>
            <div className="about-content-section__col about-content-section__col--avatars">
              <div className="about-content-section__avatars">
                {team.map((person, index) => (
                  <div key={index} className="about-content-section__avatar-item">
                    <div className="about-content-section__avatar">
                      <Image
                        src={person.src}
                        alt={person.alt}
                        width={200}
                        height={200}
                        className="about-content-section__avatar-image"
                      />
                    </div>
                    {person.name ? (
                      <p className="about-content-section__avatar-name">{person.name}</p>
                    ) : null}
                    {person.role ? (
                      <p className="about-content-section__avatar-role">{person.role}</p>
                    ) : null}
                    {person.linkedin ? (
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="about-content-section__linkedin"
                        aria-label={`${person.name} on LinkedIn`}
                      >
                        <LinkedInIcon className="about-content-section__linkedin-icon" />
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <InsightsCtaSection useReveal />
    </>
  );
}
