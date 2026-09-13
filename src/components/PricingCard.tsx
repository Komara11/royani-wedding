"use client";

import { useState } from "react";
import { AnimatedSection } from "./AnimatedSection";

interface PricingCardProps {
  pkg: any;
  delay: number;
  onSelect: () => void;
  ctaText?: string;
}

export function PricingCard({ pkg, delay, onSelect, ctaText = "Pilih Paket" }: PricingCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const features = Array.isArray(pkg.sections) 
    ? (typeof pkg.sections[0] === 'string' ? pkg.sections : (pkg.sections[0]?.features || [])) 
    : [];

  const INITIAL_COUNT = 5;
  const hasMore = features.length > INITIAL_COUNT;
  const visibleFeatures = isExpanded ? features : features.slice(0, INITIAL_COUNT);

  return (
    <AnimatedSection className={`pricing-card ${pkg.featured ? "featured" : ""}`} delay={delay}>
      {pkg.featured && <div className="pricing-badge">Terpopuler</div>}
      <h3 className="pricing-name">{pkg.name}</h3>
      <div className="pricing-price">
        <span className="pricing-amount">{pkg.price}</span>
      </div>
      <ul className="pricing-features">
        {visibleFeatures.map((f: string, fi: number) => {
          const isFree = f.toUpperCase().startsWith("FREE:");
          const isInclude = f.toUpperCase().startsWith("INCLUDE:");
          
          if (isFree || isInclude) {
            const prefix = isFree ? "FREE:" : "INCLUDE:";
            const items = f.substring(prefix.length).split(",").map((item: string) => item.trim());
            const color = isFree ? "var(--gold)" : "var(--gold-light)";
            const icon = isFree ? "🎁" : "✨";
            return items.map((item: string, subIdx: number) => (
              <li key={`${fi}-${subIdx}`} style={{ color: color, fontWeight: 500 }}>
                {icon} {prefix} {item}
              </li>
            ));
          }
          
          return <li key={fi}>✓ {f}</li>;
        })}
      </ul>
      
      {hasMore && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)} 
          style={{ 
            background: "transparent", 
            border: "none", 
            color: "var(--gold)", 
            cursor: "pointer", 
            marginBottom: "24px", 
            fontStyle: "italic",
            fontWeight: 600,
            textDecoration: "underline"
          }}
        >
          {isExpanded ? "Tutup Detail ↑" : `Lihat Detail Lengkap (${features.length - INITIAL_COUNT} fitur) ↓`}
        </button>
      )}

      <button onClick={onSelect} className="btn-primary pricing-cta" style={{ border: "none", cursor: "pointer", marginTop: "auto" }}>
        {ctaText}
      </button>
    </AnimatedSection>
  );
}
