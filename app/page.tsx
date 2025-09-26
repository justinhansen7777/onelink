import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaDesktop, FaWrench, FaUsers, FaCode, FaPencilAlt, FaRocket, FaLaptopCode, FaCheckSquare, FaBrain, FaTools, FaCubes, FaSyncAlt, FaShieldAlt, FaPuzzlePiece } from 'react-icons/fa';
import { ImageCarousel } from '../components/ImageCarousel';
import { ServiceCard } from '../components/ServiceCard';

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
      <section id="home" className="hero container">
        <Image
            src="/small-logo.png"
            alt="Onelink Icon"
            width={40}
            height={40}
            style={{ marginBottom: '1rem' }}
          />
        <h1 className="font-satoshi">
         Unlock AI for <span className="text-gradient">your business.</span>
        </h1>
        <p>Onelink builds AI tools that integrate seamlessly with your workflows and drive measurable business value. We also provide team training to ensure your organization can adopt and apply AI effectively.

</p>
        
      </section>

      

      {/* 2. Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="services__grid">
            <div className="service-card">
              <div className="service-card__icon"><FaRocket /></div>
              <div className="service-card__content">
                <h3>Streamline your work</h3>
                <p>We automate repetitive tasks so your team can focus on strategy, innovation, and impact.</p>
              </div>
            </div>
            <div className="service-card">
              <div className="service-card__icon"><FaBrain /></div>
              <div className="service-card__content">
                <h3>Confident with AI</h3>
                <p>We train and support your team to adopt AI effectively, without needing a technical background.</p>
              </div>
            </div>
            <div className="service-card">
              <div className="service-card__icon"><FaTools /></div>
              <div className="service-card__content">
                <h3>Built around your business</h3>
                <p>We develop custom AI tools that match your workflows and deliver measurable results.</p>
              </div>
            </div>
          </div>
          <div className="services__button-container">
            <Link href="#work" className="btn btn--explore font-satoshi">
                Explore Work
            </Link>
          </div>
        </div>
      </section>

    

      {/* 4. Testimonials Section */}
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