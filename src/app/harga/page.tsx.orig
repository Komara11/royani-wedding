"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPackages, getContact } from "@/app/actions";
import { AnimatedSection } from "@/components/AnimatedSection";

type PricingPackage = {
  id: string; name: string; price: string; type: string;
  featured: boolean; sortOrder: number; isActive: boolean;
  sections: { title: string; is_bonus: boolean; features: string[] }[];
};

export default function HargaPage() {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [tab, setTab] = useState<"lengkap" | "akad">("lengkap");
  const [loading, setLoading] = useState(true);
  const [waLink, setWaLink] = useState("https://wa.me/6287847222209");

  useEffect(() => {
    async function fetchData() {
      try {
        const [pkgData, contactData] = await Promise.all([getPackages(), getContact()]);
        if (pkgData) setPackages((pkgData as any).filter((p: any) => p.isActive !== false));
        if (contactData) {
          const num = ((contactData as any).whatsapp_number || "").replace(/[^0-9]/g, "").replace(/^0/, "62");
          setWaLink(`https://wa.me/${num}?text=Halo%20Royani%20Wedding%2C%20saya%20tertarik%20dengan%20paket%20pernikahan.`);
        }
      } catch (err) { console.warn(err); }
      finally { setLoading(false); }
    }
    fetchData();
  }, []);

  const filtered = packages.filter((p) => p.type === tab);

  return (
    <main>
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: "url(/images/bg-divider.jpg)" }} />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <AnimatedSection>
            <span className="section-tag">PAKET PERNIKAHAN</span>
            <h1 className="page-hero-title">
              Pilih Paket <span>Terbaik</span> untuk Hari Spesial Anda
            </h1>
            <p className="page-hero-desc">
              Setiap paket dapat disesuaikan dengan kebutuhan dan anggaran Anda. Hubungi kami untuk penawaran terbaik.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Info Banner */}
      <section className="info-banner">
        <div className="container">
          <p>💡 Harga yang tertera adalah harga dasar. Setiap paket dapat disesuaikan dengan kebutuhan Anda. Hubungi kami untuk konsultasi gratis.</p>
        </div>
      </section>

      {/* Tabs & Packages */}
      <section className="section">
        <div className="container">
          {/* Tab Navigation */}
          <div className="pricing-tabs">
            <button className={`pricing-tab ${tab === "lengkap" ? "active" : ""}`} onClick={() => setTab("lengkap")}>
              Paket Lengkap
            </button>
            <button className={`pricing-tab ${tab === "akad" ? "active" : ""}`} onClick={() => setTab("akad")}>
              Paket Akad
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: 80 }}>
              <div className="spinner-line" style={{ margin: "0 auto", width: 60 }} />
            </div>
          ) : filtered.length === 0 ? (
            <AnimatedSection>
              <p style={{ textAlign: "center", color: "var(--text-muted)", padding: 60 }}>
                Belum ada paket {tab === "akad" ? "akad" : "lengkap"} tersedia.
              </p>
            </AnimatedSection>
          ) : (
            <div className="pricing-grid">
              {filtered.map((pkg, i) => (
                <AnimatedSection key={pkg.id} className={`pricing-card ${pkg.featured ? "featured" : ""}`} delay={i * 0.1}>
                  {pkg.featured && <div className="pricing-badge">Terpopuler</div>}
                  <h3 className="pricing-name">{pkg.name}</h3>
                  <div className="pricing-price">
                    <span className="pricing-from">Mulai dari</span>
                    <span className="pricing-amount">{pkg.price}</span>
                  </div>

                  <ul className="pricing-features">
                    {pkg.sections.map((sec, si) => (
                      <li key={si} className="pricing-section-group">
                        <strong className="pricing-section-title">
                          {sec.title} {sec.is_bonus && <span className="bonus-tag">Bonus</span>}
                        </strong>
                        <ul>
                          {sec.features.slice(0, 4).map((f, fi) => (
                            <li key={fi}>✓ {f}</li>
                          ))}
                          {sec.features.length > 4 && (
                            <li className="pricing-more">+{sec.features.length - 4} lainnya</li>
                          )}
                        </ul>
                      </li>
                    ))}
                  </ul>

                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary pricing-cta">
                    Konsultasi Paket Ini
                  </a>
                </AnimatedSection>
              ))}
            </div>
          )}

          {/* CTA Bottom */}
          <AnimatedSection className="pricing-bottom-cta">
            <h3>Butuh paket yang lebih personal?</h3>
            <p>Tim kami siap membantu merancang paket pernikahan yang sesuai dengan impian dan anggaran Anda.</p>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Konsultasi Gratis via WhatsApp
            </a>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
