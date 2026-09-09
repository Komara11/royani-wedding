'use client';

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
  interval = 5000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [testimonials.length, interval]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className="testimonial-slider relative w-full max-w-3xl mx-auto overflow-hidden py-10 px-4">
      <div className="relative h-64 md:h-48 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="testimonial-card absolute w-full flex flex-col items-center text-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl md:text-2xl text-gray-800 mb-6 font-serif italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              "{testimonials[activeIndex].text}"
            </p>
            <h4 className="font-bold text-lg">{testimonials[activeIndex].name}</h4>
            <span className="text-sm text-gray-500">{testimonials[activeIndex].role}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="testimonial-dots flex justify-center gap-2 mt-6">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              idx === activeIndex ? 'bg-yellow-500' : 'bg-gray-300'
            }`}
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
