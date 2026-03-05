'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { IconType } from 'react-icons';
import {
  FaWrench,
  FaLaptopCode,
  FaCubes,
  FaSyncAlt,
  FaShieldAlt,
  FaPuzzlePiece,
  FaPhoneAlt,
  FaRobot,
  FaCogs,
  FaProjectDiagram,
  FaBalanceScale,
  FaFileAlt,
  FaFileContract,
  FaChartLine,
  FaComments,
  FaClipboardList,
  FaTools,
  FaBoxes,
  FaDollarSign,
  FaTachometerAlt,
  FaLayerGroup,
  FaHeadset,
  FaQuestionCircle,
  FaEnvelope,
  FaUserCheck,
  FaCommentDots,
  FaUserClock,
  FaFilter,
  FaDatabase,
  FaSearch,
  FaUserPlus,
  FaCalendarCheck,
  FaLifeRing,
  FaFileInvoice,
  FaChartPie,
  FaBullseye
} from 'react-icons/fa';
import { ServiceCard } from '@/components/ServiceCard';
import { ImageCarousel } from '@/components/ImageCarousel';
import InsightsCtaSection from '@/components/InsightsCtaSection';

const SERVICE_CARD_COUNT = 6;
const FILTER_FADE_DURATION_MS = 180;

type SolutionItem = {
  title: string;
  description: string;
  industries: IndustryId[];
};

type IndustryId =
  | 'customer-support'
  | 'operations'
  | 'sales'
  | 'healthcare'
  | 'finance'
  | 'hr'
  | 'manufacturing'
  | 'marketing';

type SolutionCategory = {
  id: string;
  title: string;
  intro?: string;
  items: SolutionItem[];
};

const INDUSTRY_LABEL_BY_ID: Record<IndustryId, string> = {
  'customer-support': 'Customer support',
  operations: 'Operations',
  sales: 'Sales',
  healthcare: 'Healthcare',
  finance: 'Finance',
  hr: 'HR',
  manufacturing: 'Manufacturing',
  marketing: 'Marketing'
};

const SOLUTION_CATEGORIES: SolutionCategory[] = [
  {
    id: 'creative-design-process',
    title: 'Creative Design & Process',
    intro: '',
    items: [
      {
        title: 'AI Digital Assistant',
        description:
          'Give teams instant access to internal knowledge and operational information so daily processes run faster and with fewer interruptions.',
        industries: ['operations', 'hr', 'customer-support']
      },
      {
        title: 'Workflow Automation with AI',
        description:
          'Automate multi-step workflows where AI interprets inputs and moves processes forward without manual coordination.',
        industries: ['operations', 'hr', 'finance', 'healthcare']
      },
      {
        title: 'Process Bottleneck Detection',
        description:
          'Analyze operational workflows to reveal where delays and inefficiencies occur, enabling teams to redesign processes for smoother execution.',
        industries: ['operations', 'manufacturing']
      },
      {
        title: 'AI Decision Support',
        description:
          'Provide teams with data-driven recommendations that help them choose the best course of action in complex operational situations.',
        industries: ['operations', 'finance', 'healthcare', 'sales']
      },
      {
        title: 'Automated Report Generation',
        description:
          'Turn operational data into structured reports and summaries that help teams continuously improve how processes are managed.',
        industries: ['operations', 'finance']
      }
    ]
  },
  {
    id: 'data-analysis-insights',
    title: 'Data Analysis & Insights',
    intro: '',
    items: [
      {
        title: 'Intelligent Document Processing',
        description:
          'Extract structured information from invoices, contracts, and forms so important data becomes immediately usable.',
        industries: ['finance', 'healthcare', 'operations', 'hr']
      },
      {
        title: 'AI Sales Forecasting',
        description: 'Predict future sales performance by analyzing historical data and demand patterns.',
        industries: ['sales', 'finance']
      },
      {
        title: 'NLP Survey Analysis',
        description:
          'Transform open-text feedback into clear insights by identifying recurring themes and sentiment.',
        industries: ['marketing', 'hr', 'customer-support']
      },
      {
        title: 'Log Analysis Automation',
        description:
          'Detect operational issues early by automatically analyzing system and application logs.',
        industries: ['operations', 'manufacturing']
      },
      {
        title: 'Predictive Maintenance',
        description:
          'Identify potential equipment failures before they occur by analyzing historical maintenance patterns.',
        industries: ['manufacturing', 'operations']
      },
      {
        title: 'Inventory Optimization',
        description: 'Forecast demand and adjust stock levels to reduce shortages and excess inventory.',
        industries: ['manufacturing', 'operations', 'finance']
      },
      {
        title: 'Financial Anomaly Detection',
        description: 'Spot unusual financial patterns such as unexpected cost increases or margin changes.',
        industries: ['finance']
      },
      {
        title: 'KPI Anomaly Detection',
        description: 'Monitor key business metrics and automatically detect unexpected changes.',
        industries: ['finance', 'operations', 'sales', 'marketing']
      },
      {
        title: 'Cross-System Performance Insights',
        description:
          'Combine data from multiple business systems to reveal hidden patterns and performance drivers.',
        industries: ['operations', 'finance', 'sales', 'marketing']
      }
    ]
  },
  {
    id: 'customer-experience',
    title: 'Customer Experience',
    items: [
      {
        title: 'Sales Process Automation',
        description:
          'Automate repetitive sales tasks so teams can focus on building relationships and closing deals.',
        industries: ['sales']
      },
      {
        title: 'AI Customer Support Assistant',
        description:
          'Provide customers with instant, accurate answers by connecting AI to internal knowledge bases.',
        industries: ['customer-support']
      },
      {
        title: 'FAQ Automation',
        description:
          'Answer common customer questions automatically using existing documentation and support content.',
        industries: ['customer-support', 'hr']
      },
      {
        title: 'Email & Inbox Automation',
        description: 'Classify and route incoming emails so requests reach the right team faster.',
        industries: ['customer-support', 'sales', 'hr', 'operations']
      },
      {
        title: 'Supplier Onboarding Automation',
        description: 'Simplify supplier onboarding by automating document validation and workflow steps.',
        industries: ['operations', 'manufacturing', 'finance']
      },
      {
        title: 'Customer Interaction Intelligence',
        description:
          'Analyze support conversations to uncover recurring issues and opportunities for improvement.',
        industries: ['customer-support', 'sales', 'marketing']
      },
      {
        title: 'Customer Retention Monitoring',
        description:
          'Identify early signals that customers may disengage and alert teams before churn occurs.',
        industries: ['customer-support', 'sales', 'marketing']
      },
      {
        title: 'Lead Qualification Engine',
        description:
          'Automatically evaluate inbound leads and prioritize the most promising opportunities.',
        industries: ['sales', 'marketing']
      }
    ]
  },
  {
    id: 'workforce-productivity',
    title: 'Workforce Productivity',
    items: [
      {
        title: 'Chat with Your Data',
        description:
          'Allow employees to ask questions directly to internal data sources and receive immediate answers.',
        industries: ['operations', 'finance', 'hr', 'healthcare', 'manufacturing']
      },
      {
        title: 'AI Connected to Internal Databases',
        description:
          'Connect AI to company databases so teams can retrieve structured information instantly.',
        industries: ['operations', 'finance', 'hr', 'healthcare', 'manufacturing']
      },
      {
        title: 'Searchable Knowledge Base',
        description: 'Turn internal documentation into an intelligent system employees can query naturally.',
        industries: ['hr', 'customer-support', 'operations']
      },
      {
        title: 'AI Onboarding Assistant',
        description: 'Guide new employees through onboarding materials, policies, and internal processes.',
        industries: ['hr']
      },
      {
        title: 'Meeting Intelligence',
        description: 'Automatically summarize meetings and capture key action points.',
        industries: ['operations', 'hr', 'sales']
      },
      {
        title: 'Internal Support Automation',
        description: 'Automate internal helpdesk requests by routing issues and suggesting solutions.',
        industries: ['hr', 'operations', 'customer-support']
      },
      {
        title: 'Knowledge Extraction from Documents',
        description:
          'Convert large document collections into structured knowledge that employees can easily access.',
        industries: ['hr', 'healthcare', 'finance', 'operations']
      },
      {
        title: 'Company GPT',
        description: 'A private AI assistant trained on internal company knowledge and documentation.',
        industries: ['hr', 'operations', 'finance', 'customer-support', 'sales']
      }
    ]
  },
  {
    id: 'decision-intelligence',
    title: 'Decision Intelligence',
    intro: '',
    items: [
      {
        title: 'Executive Insight Engine',
        description:
          'Automatically generate structured insights from company data to highlight risks and opportunities.',
        industries: ['finance', 'operations', 'sales', 'marketing']
      },
      {
        title: 'Revenue Intelligence',
        description:
          'Combine sales, billing, and operational data to explain revenue changes and growth drivers.',
        industries: ['sales', 'finance', 'marketing']
      },
      {
        title: 'Operational Risk Monitoring',
        description: 'Detect operational risks early by identifying unusual patterns across systems.',
        industries: ['operations', 'manufacturing', 'finance', 'healthcare']
      },
      {
        title: 'Business Performance Summaries',
        description: 'Create executive-ready summaries that explain performance across departments.',
        industries: ['finance', 'operations', 'sales', 'marketing']
      },
      {
        title: 'Strategic KPI Monitoring',
        description:
          'Continuously track key metrics and alert leadership when performance deviates from targets.',
        industries: ['finance', 'sales', 'operations', 'marketing']
      }
    ]
  }
];

const SOLUTION_VISUAL_ICON_BY_TITLE: Record<string, IconType> = {
  'AI Digital Assistant': FaRobot,
  'Workflow Automation with AI': FaCogs,
  'Process Bottleneck Detection': FaProjectDiagram,
  'AI Decision Support': FaBalanceScale,
  'Automated Report Generation': FaFileAlt,
  'Intelligent Document Processing': FaFileContract,
  'AI Sales Forecasting': FaChartLine,
  'NLP Survey Analysis': FaComments,
  'Log Analysis Automation': FaClipboardList,
  'Predictive Maintenance': FaTools,
  'Inventory Optimization': FaBoxes,
  'Financial Anomaly Detection': FaDollarSign,
  'KPI Anomaly Detection': FaTachometerAlt,
  'Cross-System Performance Insights': FaLayerGroup,
  'Sales Process Automation': FaPhoneAlt,
  'AI Customer Support Assistant': FaHeadset,
  'FAQ Automation': FaQuestionCircle,
  'Email & Inbox Automation': FaEnvelope,
  'Supplier Onboarding Automation': FaUserCheck,
  'Customer Interaction Intelligence': FaCommentDots,
  'Customer Retention Monitoring': FaUserClock,
  'Lead Qualification Engine': FaFilter,
  'Chat with Your Data': FaComments,
  'AI Connected to Internal Databases': FaDatabase,
  'Searchable Knowledge Base': FaSearch,
  'AI Onboarding Assistant': FaUserPlus,
  'Meeting Intelligence': FaCalendarCheck,
  'Internal Support Automation': FaLifeRing,
  'Knowledge Extraction from Documents': FaFileInvoice,
  'Company GPT': FaRobot,
  'Executive Insight Engine': FaChartPie,
  'Revenue Intelligence': FaChartLine,
  'Operational Risk Monitoring': FaShieldAlt,
  'Business Performance Summaries': FaFileAlt,
  'Strategic KPI Monitoring': FaBullseye
};

function getSpotlightStyle(x: number, y: number, opacity: number) {
  return {
    opacity,
    background: `radial-gradient(420px circle at ${x}px ${y}px, rgba(0, 170, 255, 0.72), rgba(24, 113, 237, 0.58), rgba(14, 63, 176, 0.4), transparent 66%)`
  };
}

function getSolutionVisualization(title: string) {
  const Icon = SOLUTION_VISUAL_ICON_BY_TITLE[title] ?? FaCubes;

  return (
    <div className="solutions-catalog__visual" aria-hidden="true">
      <Icon />
    </div>
  );
}

export default function SolutionsPage() {
  const searchParams = useSearchParams();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const catalogTransitionTimeoutRef = useRef<number | null>(null);
  const [cardSpotlights, setCardSpotlights] = useState(
    () => Array.from({ length: SERVICE_CARD_COUNT }, () => ({ x: 0, y: 0, opacity: 0 }))
  );
  const [activeCatalogCategory, setActiveCatalogCategory] = useState(SOLUTION_CATEGORIES[0].id);
  const [displayedCatalogCategory, setDisplayedCatalogCategory] = useState(SOLUTION_CATEGORIES[0].id);
  const [isCatalogFadingOut, setIsCatalogFadingOut] = useState(false);

  useEffect(() => {
    const latestPointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const updateClosestCardSpotlight = (clientX: number, clientY: number) => {
      const rects = cardRefs.current.map((el) => el?.getBoundingClientRect() ?? null);
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      rects.forEach((rect, index) => {
        if (!rect) return;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(clientX - centerX, clientY - centerY);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (!Number.isFinite(closestDistance)) return;

      setCardSpotlights((previous) =>
        previous.map((spotlight, index) => {
          const rect = rects[index];
          if (!rect) return spotlight;
          const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
          const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
          return { x, y, opacity: index === closestIndex ? 1 : 0 };
        })
      );
    };

    const handleMouseMove = (event: globalThis.MouseEvent) => {
      latestPointer.x = event.clientX;
      latestPointer.y = event.clientY;
      updateClosestCardSpotlight(event.clientX, event.clientY);
    };

    const handleViewportChange = () => {
      updateClosestCardSpotlight(latestPointer.x, latestPointer.y);
    };

    updateClosestCardSpotlight(latestPointer.x, latestPointer.y);
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
    const industryParam = searchParams.get('industry');
    if (!industryParam || !(industryParam in INDUSTRY_LABEL_BY_ID)) {
      return;
    }

    const selectedIndustry = industryParam as IndustryId;

    const firstMatchingCategory = SOLUTION_CATEGORIES.find((category) =>
      category.items.some((item) => item.industries.includes(selectedIndustry))
    );

    if (!firstMatchingCategory) {
      return;
    }

    if (catalogTransitionTimeoutRef.current !== null) {
      window.clearTimeout(catalogTransitionTimeoutRef.current);
      catalogTransitionTimeoutRef.current = null;
    }

    setIsCatalogFadingOut(false);
    setActiveCatalogCategory(firstMatchingCategory.id);
    setDisplayedCatalogCategory(firstMatchingCategory.id);
  }, [searchParams]);

  useEffect(() => {
    return () => {
      if (catalogTransitionTimeoutRef.current !== null) {
        window.clearTimeout(catalogTransitionTimeoutRef.current);
      }
    };
  }, []);

  const trainingImages = [
    '/training-image-1.jpg',
    '/training-image-2.jpg',
    '/training-image-3.jpg',
    '/training-image-4.jpg',
    '/training-image-5.jpg'
  ];
  const visibleCatalogCategory =
    SOLUTION_CATEGORIES.find((category) => category.id === displayedCatalogCategory) ??
    SOLUTION_CATEGORIES[0];

  const handleCatalogCategoryChange = (categoryId: string) => {
    if (categoryId === activeCatalogCategory) {
      return;
    }

    setActiveCatalogCategory(categoryId);
    setIsCatalogFadingOut(true);

    if (catalogTransitionTimeoutRef.current !== null) {
      window.clearTimeout(catalogTransitionTimeoutRef.current);
    }

    catalogTransitionTimeoutRef.current = window.setTimeout(() => {
      setDisplayedCatalogCategory(categoryId);
      setIsCatalogFadingOut(false);
      catalogTransitionTimeoutRef.current = null;
    }, FILTER_FADE_DURATION_MS);
  };

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

      <section className="solutions-catalog section-reveal">
        <div className="container">
          <div className="solutions-catalog__header">
            <h2 className="font-satoshi">Solutions we can make</h2>
            <p>Explore practical AI solutions by category and discover what fits your next operational challenge.</p>
          </div>

          <div className="solutions-catalog__filters" role="tablist" aria-label="Solution categories">
            {SOLUTION_CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={activeCatalogCategory === category.id}
                className={`solutions-catalog__filter ${activeCatalogCategory === category.id ? 'is-active' : ''}`}
                onClick={() => handleCatalogCategoryChange(category.id)}
              >
                {category.title}
              </button>
            ))}
          </div>

          <div className={`solutions-catalog__content ${isCatalogFadingOut ? 'is-fading-out' : 'is-fading-in'}`}>
            {visibleCatalogCategory.intro ? (
              <p className="solutions-catalog__category-intro">{visibleCatalogCategory.intro}</p>
            ) : null}
            <div className="solutions-catalog__grid">
              {visibleCatalogCategory.items.map((solution) => (
                <article
                  key={solution.title}
                  className="solutions-catalog__card solutions-catalog__card--with-visual"
                >
                  {getSolutionVisualization(solution.title)}
                  <div className="solutions-catalog__industry-tags">
                    {solution.industries.map((industryId) => (
                      <span key={`${solution.title}-${industryId}`} className="solutions-catalog__industry-tag">
                        {INDUSTRY_LABEL_BY_ID[industryId]}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-satoshi">{solution.title}</h3>
                  <p>{solution.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="solutions-catalog__actions">
            <Link href="/portfolio" className="btn btn--live font-satoshi">
              Need something else
            </Link>
            <Link
              href="https://cal.com/justin-hansen/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline nav__btn font-satoshi"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="new-services hero--aurora section-reveal">
        <div className="new-services__aurora-extra" aria-hidden="true" />
        <div className="container">
          <div className="new-services__header">
            <h2 className="font-satoshi">We build intelligent systems</h2>
            <p>From internal tools to automation platforms, Onelink delivers scalable, secure AI solutions that streamline operations and drive results.</p>
          </div>
          <div className="new-services__grid">
            <ServiceCard
              icon={<FaCubes />}
              title="AI-Powered Platforms"
              text="Custom tools built to solve real business problems. Think smarter workflows, internal chatbots and automated systems that actually work."
              cardRef={(el) => { cardRefs.current[0] = el; }}
              spotlightStyle={getSpotlightStyle(cardSpotlights[0].x, cardSpotlights[0].y, cardSpotlights[0].opacity)}
            />
            <ServiceCard
              icon={<FaSyncAlt />}
              title="Workflow Automation"
              text="We automate the boring stuff, from manual processes to fragmented tools, so your teams can move faster with fewer errors."
              cardRef={(el) => { cardRefs.current[1] = el; }}
              spotlightStyle={getSpotlightStyle(cardSpotlights[1].x, cardSpotlights[1].y, cardSpotlights[1].opacity)}
            />
            <ServiceCard
              icon={<FaShieldAlt />}
              title="Secure Deployment"
              text="We host and deploy AI systems with enterprise-grade security and reliability. Always optimized, always available."
              cardRef={(el) => { cardRefs.current[2] = el; }}
              spotlightStyle={getSpotlightStyle(cardSpotlights[2].x, cardSpotlights[2].y, cardSpotlights[2].opacity)}
            />
            <ServiceCard
              icon={<FaWrench />}
              title="System Maintenance"
              text="We keep your AI solutions performing at their best. Continuous monitoring, updates and improvements included."
              cardRef={(el) => { cardRefs.current[3] = el; }}
              spotlightStyle={getSpotlightStyle(cardSpotlights[3].x, cardSpotlights[3].y, cardSpotlights[3].opacity)}
            />
            <ServiceCard
              icon={<FaLaptopCode />}
              title="End-to-End Development"
              text="From idea to full product. We handle everything including backend logic, APIs, frontend and AI integration, all built for scale."
              cardRef={(el) => { cardRefs.current[4] = el; }}
              spotlightStyle={getSpotlightStyle(cardSpotlights[4].x, cardSpotlights[4].y, cardSpotlights[4].opacity)}
            />
            <ServiceCard
              icon={<FaPuzzlePiece />}
              title="Specialized Solutions"
              text="Internal platforms, smart dashboards and custom chatbots. Whatever improves your operations, we build it with care and precision."
              cardRef={(el) => { cardRefs.current[5] = el; }}
              spotlightStyle={getSpotlightStyle(cardSpotlights[5].x, cardSpotlights[5].y, cardSpotlights[5].opacity)}
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
                We care deeply about adoption
              </h3>
              <p className="training__adoption-subline">because without people, technology does not work.</p>
              <Link href="https://cal.com/justin-hansen/30min" target="_blank" rel="noopener noreferrer" className="btn btn--live font-satoshi btn--training-cta">
                Discover what this means
              </Link>
            </div>
          </div>
        </div>
      </section>

      <InsightsCtaSection useReveal />
    </>
  );
}
