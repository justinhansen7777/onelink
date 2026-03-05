'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type ChallengeTopic = {
  id: string;
  label: string;
  avatar: string;
  placeholder: string;
  href: string;
};

const challengeTopics: ChallengeTopic[] = [
  {
    id: 'customer-support',
    label: 'Customer support',
    avatar: '/challenge-icons/customer-support.svg',
    placeholder:
      'Placeholder use case text: automate ticket triage, generate response drafts, and shorten first-response times while maintaining quality.',
    href: '/portfolio'
  },
  {
    id: 'operations',
    label: 'Operations',
    avatar: '/challenge-icons/operations.svg',
    placeholder:
      'Placeholder use case text: streamline repetitive tasks, detect bottlenecks early, and improve team throughput with AI copilots.',
    href: '/portfolio'
  },
  {
    id: 'sales',
    label: 'Sales',
    avatar: '/challenge-icons/sales.svg',
    placeholder:
      'Placeholder use case text: score leads automatically, personalize outreach, and prioritize the highest-converting opportunities.',
    href: '/portfolio'
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    avatar: '/challenge-icons/healthcare.svg',
    placeholder:
      'Placeholder use case text: support care coordination, summarize patient information, and reduce admin overhead for clinical teams.',
    href: '/portfolio'
  },
  {
    id: 'finance',
    label: 'Finance',
    avatar: '/challenge-icons/finance.svg',
    placeholder:
      'Placeholder use case text: automate reporting workflows, flag anomalies, and provide faster financial insights for decision-making.',
    href: '/portfolio'
  },
  {
    id: 'hr',
    label: 'HR',
    avatar: '/challenge-icons/hr.svg',
    placeholder:
      'Placeholder use case text: improve candidate screening, support onboarding flows, and answer internal policy questions instantly.',
    href: '/portfolio'
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    avatar: '/challenge-icons/manufacturing.svg',
    placeholder:
      'Placeholder use case text: predict maintenance issues, optimize production planning, and reduce machine downtime across teams.',
    href: '/portfolio'
  },
  {
    id: 'marketing',
    label: 'Marketing',
    avatar: '/challenge-icons/marketing.svg',
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
  const hasInitializedLoopRef = useRef(false);

  const loopedTopics = [...challengeTopics, ...challengeTopics, ...challengeTopics];

  const centerTopicInMiddleLoop = (topicId: string, behavior: ScrollBehavior = 'smooth') => {
    const baseIndex = challengeTopics.findIndex((topic) => topic.id === topicId);
    const middleIndex = baseIndex + challengeTopics.length;
    const selectedCard = cardRefs.current[middleIndex];

    if (!selectedCard || !sliderRef.current) {
      return;
    }

    selectedCard.scrollIntoView({
      behavior,
      inline: 'center',
      block: 'nearest'
    });
  };

  useEffect(() => {
    const behavior: ScrollBehavior = hasInitializedLoopRef.current ? 'smooth' : 'auto';
    centerTopicInMiddleLoop(selectedTopic, behavior);
    hasInitializedLoopRef.current = true;
  }, [selectedTopic]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleSliderScroll = () => {
    const slider = sliderRef.current;

    if (slider) {
      const segmentWidth = slider.scrollWidth / 3;
      const leftThreshold = segmentWidth * 0.5;
      const rightThreshold = segmentWidth * 1.5;

      if (slider.scrollLeft < leftThreshold) {
        slider.scrollLeft += segmentWidth;
      } else if (slider.scrollLeft > rightThreshold) {
        slider.scrollLeft -= segmentWidth;
      }
    }

    setIsScrolling(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 700);
  };

  return (
    <section id="challenges" className="challenges hero--aurora section-reveal">
      <div className="challenges__aurora-extra" aria-hidden="true" />
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
          {loopedTopics.map((topic, index) => (
            <article
              key={`${topic.id}-${index}`}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className={`challenges__card ${selectedTopic === topic.id ? 'is-active' : ''}`}
              onClick={() => setSelectedTopic(topic.id)}
            >
              <div className="challenges__topic-row">
                <p className="challenges__topic">{topic.label}</p>
                <span className="challenges__avatar" aria-hidden="true">
                  <Image
                    src={topic.avatar}
                    alt=""
                    width={22}
                    height={22}
                    className="challenges__avatar-icon"
                  />
                </span>
              </div>
              <p className="challenges__body">{topic.placeholder}</p>
              <Link href={topic.href} className="btn btn--outline nav__btn challenges__learn-btn">
                Learn more
              </Link>
            </article>
          ))}
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
