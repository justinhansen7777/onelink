'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { FaWrench, FaLaptopCode, FaCubes, FaSyncAlt, FaShieldAlt, FaPuzzlePiece } from 'react-icons/fa';
import { ServiceCard } from '@/components/ServiceCard';
import { ImageCarousel } from '@/components/ImageCarousel';
import InsightsCtaSection from '@/components/InsightsCtaSection';

export default function SolutionsPage() {
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

  const trainingImages = [
    '/training-image-1.jpg',
    '/training-image-2.jpg',
    '/training-image-3.jpg',
    '/training-image-4.jpg',
    '/training-image-5.jpg'
  ];

  return (
    <>
      <section className="hero hero--aurora">
        <div className="container">
          <h1 className="font-satoshi">Solutions</h1>
          <p className="hero__subheadline">
            We design and deliver AI systems that align governance, culture, and technology to create measurable business value.
          </p>
          <div className="hero__buttons">
            <Link href="/#about" className="btn btn--hero-action btn--transparent-box font-satoshi">
              Explore solutions
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

      <section id="about" className="new-services section-reveal">
        <div className="container">
          <div className="new-services__header">
            <h2 className="font-satoshi">We build <span className="text-gradient">intelligent systems</span></h2>
            <p>From internal tools to automation platforms, Onelink delivers scalable, secure AI solutions that streamline operations and drive results.</p>
          </div>
          <div className="new-services__grid">
            <ServiceCard
              icon={<FaCubes />}
              title="AI-Powered Platforms"
              text="Custom tools built to solve real business problems. Think smarter workflows, internal chatbots and automated systems that actually work."
            />
            <ServiceCard
              icon={<FaSyncAlt />}
              title="Workflow Automation"
              text="We automate the boring stuff, from manual processes to fragmented tools, so your teams can move faster with fewer errors."
            />
            <ServiceCard
              icon={<FaShieldAlt />}
              title="Secure Deployment"
              text="We host and deploy AI systems with enterprise-grade security and reliability. Always optimized, always available."
            />
            <ServiceCard
              icon={<FaWrench />}
              title="System Maintenance"
              text="We keep your AI solutions performing at their best. Continuous monitoring, updates and improvements included."
            />
            <ServiceCard
              icon={<FaLaptopCode />}
              title="End-to-End Development"
              text="From idea to full product. We handle everything including backend logic, APIs, frontend and AI integration, all built for scale."
            />
            <ServiceCard
              icon={<FaPuzzlePiece />}
              title="Specialized Solutions"
              text="Internal platforms, smart dashboards and custom chatbots. Whatever improves your operations, we build it with care and precision."
            />
          </div>
        </div>
      </section>

      <section id="training" className="training section-reveal">
        <div className="container">
          <div className="training__main-content">
            <ImageCarousel images={trainingImages} />
            <div className="training__more-info">
              <h3 className="font-satoshi">
                <span>Or just want to know more about </span>
                <span className="text-gradient">GenAI?</span>
              </h3>
              <Link href="https://cal.com/justin-hansen/30min" target="_blank" rel="noopener noreferrer" className="btn btn--live font-satoshi btn--training-cta">
                Book a training
              </Link>
            </div>
          </div>
        </div>
      </section>

      <InsightsCtaSection useReveal />
    </>
  );
}
