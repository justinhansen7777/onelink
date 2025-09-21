'use client';

import React, { useRef, useState, MouseEvent, ReactNode } from 'react';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  text: string;
  isHighlight?: boolean;
  isSuccess?: boolean;
}

export const ServiceCard = ({ icon, title, text, isHighlight = false, isSuccess = false }: ServiceCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  let cardClassName = "new-service-card";
  if (isHighlight) {
      cardClassName += " new-service-card--highlight";
  }

  let iconClassName = "new-service-card__icon";
  if (isSuccess) {
      iconClassName += " new-service-card__icon--success";
  }


  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cardClassName}
    >
      <div
        className="service-card-spotlight"
        style={{
          opacity,
          background: `radial-gradient(700px circle at ${position.x}px ${position.y}px, rgba(61, 96, 180, 0.25), rgba(203, 253, 255, 0.15), transparent 65%)`,
        }}
      />
      <div className={iconClassName}>{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}; 