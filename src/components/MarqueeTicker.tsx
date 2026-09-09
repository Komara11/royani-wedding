'use client';

import React from 'react';

interface MarqueeTickerProps {
  items: string[];
  speed?: number;
  separator?: string;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  items,
  speed = 30,
  separator = '•',
}) => {
  const content = items.map((item, i) => (
    <React.Fragment key={i}>
      <span className="text-[#D4AF37] font-medium tracking-wider mx-6">{item}</span>
      <span className="text-[#D4AF37]/50">{separator}</span>
    </React.Fragment>
  ));

  return (
    <div className="overflow-hidden whitespace-nowrap bg-zinc-900 border-y border-[#D4AF37]/30 py-3 relative flex">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
      <div 
        className="flex min-w-[200%]"
        style={{ animation: `scroll ${speed}s linear infinite` }}
      >
        <div className="flex-1 flex justify-around">
          {content}
        </div>
        <div className="flex-1 flex justify-around">
          {content}
        </div>
      </div>
    </div>
  );
};
