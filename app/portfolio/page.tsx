 'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PortfolioPage() {
  const [activeWorkItem, setActiveWorkItem] = useState('oneview');

  useEffect(() => {
    const workItems = Array.from(document.querySelectorAll<HTMLElement>('[data-work-item]'));

    if (!workItems.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));

        if (!visibleEntries.length) {
          return;
        }

        const currentId = visibleEntries[0].target.getAttribute('data-work-item');
        if (currentId) {
          setActiveWorkItem(currentId);
        }
      },
      {
        threshold: 0,
        rootMargin: '-45% 0px -45% 0px'
      }
    );

    workItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

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

      <section className="portfolio-work-section">
        <div className="container">
          <h2 className="font-satoshi" style={{ color: 'var(--text-primary)' }}>
            Portfolio
          </h2>

          <div className="work-items-container">
            <div
              className={`work-item work-item--single-image work-item--oneview-portfolio ${activeWorkItem === 'oneview' ? 'is-active' : ''}`}
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
                  <p>
                    Oneview is our AI-powered analytics and visualization product for Asana environments. We built it because we kept seeing the same pattern: companies invested in Asana, but as the workspace grew, it became difficult to understand what was really happening. Alignment started to drift, governance became inconsistent, and improving the setup turned into a slow, manual exercise that depended on senior consultant time.
                  </p>
                  <p>
                    Oneview turns an Asana workspace into a clear strategic view. It makes structure visible, highlights adoption and usage patterns, and translates what it sees into concrete recommendations that teams can act on. It is intentionally not an Asana replacement. It is a high-level dashboard that helps you steer, improve and scale how work is organized.
                  </p>
                  <p>
                    In practice, it delivers speed and clarity. What used to take days of mapping, interviews and manual analysis becomes a repeatable flow that surfaces what is working, what is missing, and what to fix first. For partners, Oneview saves around 25 hours of analysis work per client environment, freeing up time to focus on implementation and change.
                  </p>
                  <p>
                    For end clients, the result is faster decision-making, more consistent ways of working across teams, and a workspace that stays clean and governable as the organization grows. This is scalable because the method is productized, innovative because it combines structure, adoption intelligence and AI recommendations in one system, and sustainable because it strengthens the operating system of work rather than adding another layer of complexity.
                  </p>
                </div>
                <div className="work-item__separator"></div>
              </div>
            </div>

            <div
              className={`work-item work-item--single-image work-item--onesynq-portfolio ${activeWorkItem === 'onesynq' ? 'is-active' : ''}`}
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
                  <p>
                    Onesynq was built for a very practical gap we see in many organizations: headquarters plans work in structured tools, while the workfloor runs on messaging, calls and informal updates. That split creates daily friction. Tasks get lost, status becomes unreliable, and project leaders spend more time chasing progress than improving execution.
                  </p>
                  <p>
                    Onesynq closes that gap by connecting structured work to the channel frontline teams already use: messaging. It enables clear requests, simple confirmations, and reliable updates without forcing people into heavyweight software. The goal is not more chat. The goal is a dependable operational loop between planning and execution, so communication stops being a side-channel and becomes part of how work gets done.
                  </p>
                  <p>
                    For clients, Onesynq reduces coordination overhead and makes execution easier to scale across teams, shifts and locations. Because it is built as an integration layer, it supports organizations that already use work-management platforms as well as companies that operate primarily with Microsoft 365. It is scalable because it fits existing reality instead of replacing it, innovative because it turns messaging into a controlled execution surface, and sustainable because it reduces miscommunication and rework as operations grow.
                  </p>
                </div>
                <div className="work-item__separator"></div>
              </div>
            </div>

            <div
              className={`work-item work-item--single-image work-item--onechat-portfolio ${activeWorkItem === 'onechat' ? 'is-active' : ''}`}
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
                  <p>
                    Onechat exists because most organizations want to use AI, but they need it to be trustworthy, controlled and practical. Many teams try a public chat tool, see early value, and then get stuck: concerns about data, governance and consistent usage prevent AI from becoming a reliable part of daily work. We built Onechat to make AI usable across the organization in a way that feels safe and straightforward.
                  </p>
                  <p>
                    Onechat is a secure, organization-ready chat experience designed for real work: summarizing information, drafting content, supporting internal knowledge questions, and helping teams move faster with higher consistency. It is built to fit professional environments where trust matters, and where adoption should not depend on a handful of power users.
                  </p>
                  <p>
                    For clients, Onechat delivers a repeatable way to use AI in day-to-day workflows, improving speed and quality while keeping control and consistency at the center. It scales because teams can adopt it broadly with shared working habits, it is innovative because it makes AI operational rather than experimental, and it is sustainable because it builds a capability that compounds as people learn to collaborate with AI in a structured way.
                  </p>
                </div>
                <div className="work-item__separator"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
