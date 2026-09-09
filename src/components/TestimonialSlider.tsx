"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  interval?: number;
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ 
  testimonials, 
  interval = 5000 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, interval);
    return () => clearInterval(timer);
  }, [testimonials, interval]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="testimonial-slider">
      <div className="testimonial-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="testimonial-card"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <p className="testimonial-text">&ldquo;{testimonials[activeIndex].text}&rdquo;</p>
            <h4 className="testimonial-name">{testimonials[activeIndex].name}</h4>
            <span className="testimonial-role">{testimonials[activeIndex].role}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="testimonial-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`testimonial-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
