"use client";

import React from 'react';

interface MarqueeTickerProps {
  items: string[];
  speed?: number;
  separator?: string;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  items,
  speed = 30,
  separator = "•",
}) => {
  return (
    <div className="marquee-wrapper">
      <div 
        className="marquee-content" 
        style={{ animationDuration: `${speed}s` }}
      >
        {/* We double the items array to create a seamless infinite loop */}
        {[...items, ...items].map((item, index) => (
          <div key={index} className="marquee-item">
            <span>{item}</span>
            <span className="marquee-separator">{separator}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
