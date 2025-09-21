"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

type ImageCarouselProps = {
  images: string[];
  autoplay?: boolean;
};

export const ImageCarousel = ({ images, autoplay = true }: ImageCarouselProps) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  const isActive = (index: number) => {
    return index === active;
  };

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="carousel-container">
      <div className="carousel-image-stack">
        <AnimatePresence>
          {images.map((src, index) => (
            <motion.div
              key={src}
              initial={{
                opacity: 0,
                scale: 0.9,
                rotateY: randomRotateY(),
              }}
              animate={{
                opacity: isActive(index) ? 1 : 0.7,
                scale: isActive(index) ? 1 : 0.9,
                y: isActive(index) ? [0, -40, 0] : 0,
                zIndex: isActive(index) ? images.length : images.length - Math.abs(index - active),
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                rotateY: randomRotateY(),
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              className="carousel-image-wrapper"
            >
              <Image
                src={src}
                alt={`Training image ${index + 1}`}
                width={800}
                height={600}
                draggable={false}
                className="carousel-image"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="carousel-controls">
        <button onClick={handlePrev} className="carousel-btn">
          <IconArrowLeft className="carousel-icon" />
        </button>
        <button onClick={handleNext} className="carousel-btn">
          <IconArrowRight className="carousel-icon" />
        </button>
      </div>
    </div>
  );
}; 