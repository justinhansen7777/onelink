'use client';

import React, { CSSProperties, ReactNode } from 'react';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  text: string;
  isHighlight?: boolean;
  isSuccess?: boolean;
  cardRef?: (node: HTMLDivElement | null) => void;
  spotlightStyle?: CSSProperties;
}

export const ServiceCard = ({
  icon,
  title,
  text,
  isHighlight = false,
  isSuccess = false,
  cardRef,
  spotlightStyle
}: ServiceCardProps) => {
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
      ref={cardRef}
      className={cardClassName}
    >
      <div
        className="service-card-spotlight"
        style={spotlightStyle}
      />
      <div className={iconClassName}>{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}; 