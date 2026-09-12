"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getPackages, getContact } from "@/app/actions";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function HargaPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [contactContent, setContactContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pkgData, contactData] = await Promise.all([getPackages(), getContact()]);
        if (pkgData) setPackages((pkgData as any).filter((p: any) => p.isActive !== false && p.is_active !== false));
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

  const akadPackages = packages.filter((p) => p.type?.toLowerCase() === "akad").sort((a, b) => (a.sort_order || a.sortOrder || 0) - (b.sort_order || b.sortOrder || 0));
  const lengkapPackages = packages.filter((p) => p.type?.toLowerCase() === "lengkap").sort((a, b) => (a.sort_order || a.sortOrder || 0) - (b.sort_order || b.sortOrder || 0));

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
            {/* Paket Akad */}
            {akadPackages.length > 0 && (
              <div style={{ marginBottom: "80px" }}>
                <h2 style={{ fontFamily: "var(--font-playfair)", color: "var(--gold)", fontSize: "2rem", marginBottom: "32px", textAlign: "center" }}>Paket Akad</h2>
                <div className="pricing-grid">
                  {akadPackages.map((pkg, i) => {
                    const features = Array.isArray(pkg.sections) ? (typeof pkg.sections[0] === 'string' ? pkg.sections : (pkg.sections[0]?.features || [])) : [];
                    return (
                      <AnimatedSection key={pkg.id} className={`pricing-card ${pkg.featured ? "featured" : ""}`} delay={i * 0.1}>
                        {pkg.featured && <div className="pricing-badge">Terpopuler</div>}
                        <h3 className="pricing-name">{pkg.name}</h3>
                        <div className="pricing-price">
                          <span className="pricing-amount">{pkg.price}</span>
                        </div>
                        <ul className="pricing-features">
                          {features.map((f: string, fi: number) => (
                            <li key={fi}>✓ {f}</li>
                          ))}
                        </ul>
                        <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary pricing-cta">
                          Pilih Paket
                        </a>
                      </AnimatedSection>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Paket Lengkap */}
            {lengkapPackages.length > 0 && (
              <div>
                <h2 style={{ fontFamily: "var(--font-playfair)", color: "var(--gold)", fontSize: "2rem", marginBottom: "32px", textAlign: "center" }}>Paket Lengkap</h2>
                <div className="pricing-grid">
                  {lengkapPackages.map((pkg, i) => {
                    const features = Array.isArray(pkg.sections) ? (typeof pkg.sections[0] === 'string' ? pkg.sections : (pkg.sections[0]?.features || [])) : [];
                    return (
                      <AnimatedSection key={pkg.id} className={`pricing-card ${pkg.featured ? "featured" : ""}`} delay={i * 0.1}>
                        {pkg.featured && <div className="pricing-badge">Terpopuler</div>}
                        <h3 className="pricing-name">{pkg.name}</h3>
                        <div className="pricing-price">
                          <span className="pricing-amount">{pkg.price}</span>
                        </div>
                        <ul className="pricing-features">
                          {features.map((f: string, fi: number) => (
                            <li key={fi}>✓ {f}</li>
                          ))}
                        </ul>
                        <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary pricing-cta">
                          Pilih Paket
                        </a>
                      </AnimatedSection>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
