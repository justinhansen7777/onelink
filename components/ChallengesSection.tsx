'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type ChallengeTopic = {
  id: string;
  label: string;
  avatar: string;
  placeholder: string;
};

const challengeTopics: ChallengeTopic[] = [
  {
    id: 'customer-support',
    label: 'Customer support',
    avatar: '/challenge-icons/customer-support.svg',
    placeholder:
      'Support teams handle large volumes of requests while customers expect fast and consistent responses. At the same time, valuable insights remain hidden in tickets, emails, and conversations.'
  },
  {
    id: 'operations',
    label: 'Operations',
    avatar: '/challenge-icons/operations.svg',
    placeholder:
      'Operational processes often span multiple systems, making it difficult to detect bottlenecks or inefficiencies early. Teams spend significant time coordinating tasks and interpreting fragmented information.'
  },
  {
    id: 'sales',
    label: 'Sales',
    avatar: '/challenge-icons/sales.svg',
    placeholder:
      'Sales teams rely on incomplete pipeline visibility and manual forecasting, making revenue performance difficult to predict. Identifying the most promising opportunities and understanding revenue changes remains challenging.'
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    avatar: '/challenge-icons/healthcare.svg',
    placeholder:
      'Healthcare organizations manage large volumes of documentation and administrative tasks alongside critical operational responsibilities. Extracting useful insights from medical records, forms, and feedback can be time-consuming.'
  },
  {
    id: 'finance',
    label: 'Finance',
    avatar: '/challenge-icons/finance.svg',
    placeholder:
      'Financial teams need to monitor margins, costs, and performance across multiple systems and departments. Detecting anomalies, explaining financial changes, and maintaining control over complex data environments can be difficult.'
  },
  {
    id: 'hr',
    label: 'HR',
    avatar: '/challenge-icons/hr.svg',
    placeholder:
      'HR teams support employees across onboarding, internal processes, and policy management while dealing with fragmented knowledge sources. Employees often struggle to find the information they need quickly.'
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    avatar: '/challenge-icons/manufacturing.svg',
    placeholder:
      'Manufacturing environments generate large volumes of operational and system data that are difficult to interpret in real time. Detecting equipment issues, operational inefficiencies, and production risks early remains a major challenge.'
  },
  {
    id: 'marketing',
    label: 'Marketing',
    avatar: '/challenge-icons/marketing.svg',
    placeholder:
      'Marketing teams generate large amounts of campaign data, feedback, and customer signals across different platforms. Turning this information into clear insights about what drives engagement, leads, and growth is often difficult.'
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
              <Link href={`/solutions?industry=${topic.id}`} className="btn btn--outline nav__btn challenges__learn-btn">
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
