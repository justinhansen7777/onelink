'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

type ChallengeTopic = {
  id: string;
  label: string;
  placeholder: string;
  href: string;
};

const challengeTopics: ChallengeTopic[] = [
  {
    id: 'customer-support',
    label: 'Customer support',
    placeholder:
      'Placeholder use case text: automate ticket triage, generate response drafts, and shorten first-response times while maintaining quality.',
    href: '/portfolio'
  },
  {
    id: 'operations',
    label: 'Operations',
    placeholder:
      'Placeholder use case text: streamline repetitive tasks, detect bottlenecks early, and improve team throughput with AI copilots.',
    href: '/portfolio'
  },
  {
    id: 'sales',
    label: 'Sales',
    placeholder:
      'Placeholder use case text: score leads automatically, personalize outreach, and prioritize the highest-converting opportunities.',
    href: '/portfolio'
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    placeholder:
      'Placeholder use case text: support care coordination, summarize patient information, and reduce admin overhead for clinical teams.',
    href: '/portfolio'
  },
  {
    id: 'finance',
    label: 'Finance',
    placeholder:
      'Placeholder use case text: automate reporting workflows, flag anomalies, and provide faster financial insights for decision-making.',
    href: '/portfolio'
  },
  {
    id: 'hr',
    label: 'HR',
    placeholder:
      'Placeholder use case text: improve candidate screening, support onboarding flows, and answer internal policy questions instantly.',
    href: '/portfolio'
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    placeholder:
      'Placeholder use case text: predict maintenance issues, optimize production planning, and reduce machine downtime across teams.',
    href: '/portfolio'
  },
  {
    id: 'marketing',
    label: 'Marketing',
    placeholder:
      'Placeholder use case text: generate campaign concepts, personalize content, and identify high-performing audience segments.',
    href: '/portfolio'
  }
];

export function ChallengesSection() {
  const [selectedTopic, setSelectedTopic] = useState(challengeTopics[0].id);
  const [isScrolling, setIsScrolling] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const selectedIndex = challengeTopics.findIndex((topic) => topic.id === selectedTopic);
    const selectedCard = cardRefs.current[selectedIndex];

    if (!selectedCard || !sliderRef.current) {
      return;
    }

    selectedCard.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest'
    });
  }, [selectedTopic]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleSliderScroll = () => {
    setIsScrolling(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 700);
  };

  return (
    <section id="challenges" className="challenges">
      <div className="container">
        <div className="challenges__header">
          <h2 className="font-satoshi">Challenges we can solve</h2>
          <p>Select your topic or industry and explore relevant use cases.</p>
        </div>

        <div className="challenges__controls">
          <label htmlFor="challenge-topic" className="challenges__label">
            Topic / Industry
          </label>
          <select
            id="challenge-topic"
            className="challenges__select"
            value={selectedTopic}
            onChange={(event) => setSelectedTopic(event.target.value)}
          >
            {challengeTopics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.label}
              </option>
            ))}
          </select>
        </div>

        <div
          className={`challenges__slider ${isScrolling ? 'is-scrolling' : ''}`}
          ref={sliderRef}
          onScroll={handleSliderScroll}
        >
          <div className="challenges__spacer" aria-hidden="true" />
          {challengeTopics.map((topic, index) => (
            <article
              key={topic.id}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className={`challenges__card ${selectedTopic === topic.id ? 'is-active' : ''}`}
              onClick={() => setSelectedTopic(topic.id)}
            >
              <p className="challenges__topic">{topic.label}</p>
              <p className="challenges__body">{topic.placeholder}</p>
              <Link href={topic.href} className="btn btn--outline nav__btn challenges__learn-btn">
                Learn more
              </Link>
            </article>
          ))}
          <div className="challenges__spacer" aria-hidden="true" />
        </div>

        <div className="challenges__footer">
          <Link href="/portfolio" className="btn btn--live">
            See more usecases
          </Link>
        </div>
      </div>
    </section>
  );
}
