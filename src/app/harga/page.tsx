"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getPackages, getContact } from "@/app/actions";
import { AnimatedSection } from "@/components/AnimatedSection";
import { PricingCard } from "@/components/PricingCard";

export default function HargaPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [contactContent, setContactContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pkgData, contactData] = await Promise.all([getPackages(), getContact()]);
        if (pkgData) setPackages((pkgData as any).filter((p: any) => p.isActive !== false));
        if (contactData) setContactContent(contactData);
      } catch (err) {
        console.error("Fetch failed:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const parseWa = (n: string) => {
    if (!n) return "6287847222209";
    const p = n.replace(/[^0-9]/g, "");
    return p.startsWith("0") ? "62" + p.substring(1) : p;
  };

  const waLink = contactContent
    ? `https://wa.me/${parseWa(contactContent.whatsapp_number)}?text=Halo%20Royani%20Wedding%2C%20saya%20ingin%20berkonsultasi%20mengenai%20paket%20harga.`
    : "https://wa.me/6287847222209";

  // Dynamic categories from database
  const activePkgs = packages.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  const uniqueCategories = Array.from(new Set(activePkgs.map((p: any) => p.type?.trim() || 'Lainnya')));

  return (
    <main className="page-wrapper" >
      <div className="container">
        <AnimatedSection className="section-header" direction="up">
          <span className="section-tag">PILIHAN PAKET</span>
          <h1 className="section-title">
            Paket <span className="gold-text">Harga</span>
          </h1>
          <p className="section-desc" style={{ maxWidth: "600px", margin: "0 auto 40px", textAlign: "center" }}>
            Kami menyediakan berbagai pilihan paket yang dapat disesuaikan dengan kebutuhan dan skala acara pernikahan Anda.
          </p>
        </AnimatedSection>

        {isLoading ? (
          <div style={{ textAlign: "center", padding: "100px 0", color: "var(--gold)" }}>Memuat paket harga...</div>
        ) : (
          <>
            {uniqueCategories.map((cat) => {
              const catPkgs = activePkgs.filter((p) => (p.type?.trim() || 'Lainnya') === cat);
              if (catPkgs.length === 0) return null;
              return (
                <div key={cat} style={{ marginBottom: "80px" }}>
                  <h2 style={{ fontFamily: "var(--font-playfair)", color: "var(--gold)", fontSize: "2rem", marginBottom: "32px", textAlign: "center", textTransform: "capitalize" }}>
                    Paket {cat}
                  </h2>
                  <div className="pricing-grid">
                    {catPkgs.map((pkg, i) => (
                      <PricingCard 
                        key={pkg.id} 
                        pkg={pkg} 
                        delay={i * 0.1} 
                        onSelect={() => window.open(waLink, "_blank")} 
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </main>
  );
}
