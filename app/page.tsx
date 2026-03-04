import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaWrench, FaLaptopCode, FaCubes, FaSyncAlt, FaShieldAlt, FaPuzzlePiece } from 'react-icons/fa';
import { ImageCarousel } from '../components/ImageCarousel';
import { ServiceCard } from '../components/ServiceCard';
import { CompanyCarousel } from '../components/CompanyCarousel';

export default function HomePage() {
  const trainingImages = [
      '/training-image-1.jpg',
      '/training-image-2.jpg',
      '/training-image-3.jpg',
      '/training-image-4.jpg',
      '/training-image-5.jpg'
    ];

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
            What We Do <span style={{ color: 'var(--text-primary)' }}>+</span> How We Do It
          </h2>
          <p className="what-we-do__intro">
            From our experience, AI initiatives rarely fail because of the technology itself. They fail because governance, culture, and systems are not aligned. Real impact only happens when these elements evolve together as one integrated system.
          </p>
          <div className="what-we-do__diagram">
            <div className="what-we-do__pillar what-we-do__pillar--governance">
              <span className="what-we-do__pillar-label">Governance</span>
              <p className="what-we-do__pillar-text">Clear ownership, policies and decision rights so AI is safe and accountable.</p>
            </div>
            <div className="what-we-do__pillar what-we-do__pillar--culture">
              <span className="what-we-do__pillar-label">Culture</span>
              <p className="what-we-do__pillar-text">People who understand and adopt AI, with the right mindset and skills.</p>
            </div>
            <div className="what-we-do__pillar what-we-do__pillar--technology">
              <span className="what-we-do__pillar-label">Technology</span>
              <p className="what-we-do__pillar-text">Tools, platforms and integrations that fit your workflows and scale.</p>
            </div>
            <div className="what-we-do__hub">
              <span className="what-we-do__hub-label">System</span>
              <p className="what-we-do__hub-text">One integrated system where governance, culture and technology work together.</p>
            </div>
          </div>
          <div className="what-we-do__process">
            <div className="what-we-do__process-brace" aria-hidden="true">{'}'}</div>
            <div className="what-we-do__process-steps">
              <span className="what-we-do__process-step">Fundament</span>
              <span className="what-we-do__process-arrow" aria-hidden="true">→</span>
              <span className="what-we-do__process-step">Diagnose</span>
              <span className="what-we-do__process-arrow" aria-hidden="true">→</span>
              <span className="what-we-do__process-step">Build</span>
              <span className="what-we-do__process-arrow" aria-hidden="true">→</span>
              <span className="what-we-do__process-step">Scale</span>
            </div>
            <p className="what-we-do__process-desc">
              We start with a solid fundament, diagnose your readiness, build the right solution, then scale it across your organization.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Testimonials Section */}
      <section id="testimonials" className="testimonials">
          <div className="container">
            <div className="testimonial">
              <Image
                src="/testimonial-avatar-susanne.png"
                alt="Testimonial Avatar"
                width={60}
                height={60}
                className="testimonial__avatar"
              />
              <p className="testimonial__text">
                "Onelink truly helped us to better understand and apply AI within our organization. They were able to explain complex theories clearly and provided practical examples that directly met our needs. Their expertise and personal approach gave us not only new insights but also concrete steps to integrate AI into our work. Thanks to Onelink, we feel prepared to make the most of AI's potential in the future."
              </p>
              <p className="testimonial__author">Susanne Commandeur <span>Director at Uniek</span></p>
            </div>
          </div>
      </section>

      {/* 3. Products Section -> Renamed to Work */}
      <section id="work">
        <div className="container">
          <h2 className="font-satoshi">
            <span style={{ color: 'var(--text-primary)' }}>Our</span> <span className="text-gradient">Work</span>
          </h2>
          <p className="subtitle">A selection of AI-powered products developed by Onelink.

</p>
          
          <div className="work-items-container">
            {/* Work Item 1: Onesynq */}
            <div className="work-item">
              <div className="work-item__image-box">
                  <Image 
                    src="/hero-dashboard.png"
                    alt="Onesynq dashboard preview"
                    width={400}
                    height={250}
                    className="work-item__image"
                  />
              </div>
               <div className="work-item__image-box">
                  <Image 
                    src="/schermafbeelding-2025-09-21-17-19-11.png"
                    alt="Onesynq dashboard preview 2"
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
                  Go to website
                </Link>
              </div>
            </div>

            {/* Work Item 2: Onechat */}
            <div className="work-item">
              <div className="work-item__image-box">
                  <Image 
                    src="/schermafbeelding-2025-07-08-10-17-57.png"
                    alt="Onechat dashboard preview"
                    width={400}
                    height={250}
                    className="work-item__image"
                  />
              </div>
              <div className="work-item__image-box">
                  <Image 
                    src="/schermafbeelding-2025-07-08-10-15-20.png"
                    alt="Onechat dashboard preview 2"
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

            {/* Work Item 3: Oneview */}
            <div className="work-item">
               <div className="work-item__image-box">
                  <Image 
                    src="/screenshot-2025-09-21-12-48-59.png"
                    alt="Oneview dashboard preview"
                    width={400}
                    height={250}
                    className="work-item__image"
                  />
              </div>
              <div className="work-item__image-box">
                  <Image 
                    src="/screenshot-2025-09-21-12-39-26.png"
                    alt="Oneview dashboard preview 2"
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
                  Go to website
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

  {/* New Services Section */}
  <section id="about" className="new-services">
        <div className="container">
          <div className="new-services__header">
            <h2 className="font-satoshi">We build <span className="text-gradient">intelligent systems</span></h2>
            <p>From internal tools to automation platforms, Onelink delivers scalable, secure AI solutions that streamline operations and drive results.

</p>
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

      {/* AI Training Section */}
      <section id="training" className="training">
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

      {/* 5. Contact CTA Section */}
      <section id="contact">
        <div className="container">
            <div className="cta">
                <h2 className="font-satoshi">Let’s unlock AI for your business
                </h2>
                <p>Whether you're exploring opportunities or ready to scale, we’re here to help.<br></br> Schedule a free introduction to get started.</p>
                <a href="https://cal.com/justin-hansen/30min" target="_blank" rel="noopener noreferrer" className="btn btn--live">Schedule Call</a>
            </div>
        </div>
      </section>
    </>
  );
}