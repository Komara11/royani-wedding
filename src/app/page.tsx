"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getHero, getAbout, getContact, getPackages, getFaqs, getPortfolios } from "@/app/actions";
import { AnimatedSection } from "@/components/AnimatedSection";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { ServiceCard } from "@/components/ServiceCard";
import { TestimonialSlider } from "@/components/TestimonialSlider";

/* ══════════════════════════════════════
   TYPES
   ══════════════════════════════════════ */
type PricingPackage = {
  id: string;
  name: string;
  price: string;
  type: string;
  featured: boolean;
  sortOrder: number;
  isActive: boolean;
  sections: { title: string; is_bonus: boolean; features: string[] }[];
};

type FAQ = { id: string; question: string; answer: string; sortOrder: number; isActive: boolean };

/* ══════════════════════════════════════
   HOMEPAGE
   ══════════════════════════════════════ */
export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activePricingTab, setActivePricingTab] = useState<'akad'|'lengkap'>('akad');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Dynamic data states with fallbacks
  const [heroContent, setHeroContent] = useState({
    subtitle: "WEDDING ORGANIZER",
    title_first: "Royani",
    title_second: "Wedding",
    description: "Mewujudkan hari spesial Anda menjadi sempurna, berkesan, dan elegan lewat layanan profesional kami.",
    cta_text: "Konsultasi Gratis",
    bg_image_url: "/images/bg-hero.jpg",
    parallax_image_url: "/images/bg-divider.jpg",
    parallax_quote: "Cinta tidak hanya tentang saling memandang, melainkan bersama-sama melihat ke satu arah yang sama dengan komitmen dan ketulusan abadi.",
  });

  const [aboutContent, setAboutContent] = useState({
    tag: "TENTANG KAMI",
    title_first: "Mewujudkan Momen",
    title_highlight: "Paling Berharga",
    paragraph_1: "Royani Wedding adalah mitra wedding organizer profesional di Majalengka yang berdedikasi tinggi untuk mewujudkan konsep pernikahan impian Anda. Kami memadukan nilai artistik dan detail organisasi terbaik demi kenyamanan seluruh rangkaian acara Anda.",
    paragraph_2: "Dari konsep tata rias anggun, dekorasi megah, hingga pengaturan alur acara di lapangan, kami memberikan sentuhan elegan dan perhatian penuh di setiap detiknya.",
    quote: "Pernikahan adalah simfoni cinta yang diabadikan dalam janji suci. Kami hadir untuk memastikan simfoni tersebut mengalun sempurna.",
    image_url: "/images/about.jpg",
    metrics: [
      { value: "500+", label: "Acara Sukses" },
      { value: "50+", label: "Mitra Vendor" },
      { value: "8+", label: "Tahun Pengalaman" },
    ],
  });

  const [contactContent, setContactContent] = useState({
    tag: "KONSULTASI GRATIS",
    title_first: "Mari Rencanakan",
    title_highlight: "Hari Spesial Anda",
    description: "Konsultasikan konsep pernikahan impian Anda bersama tim kami. Kami siap memberikan solusi terbaik sesuai dengan anggaran dan kebutuhan Anda.",
    whatsapp_number: "+62 878 4722 2209",
    address: "Blok Rabu RT.03/RW.02 No.81, Beusi, Ligung, Majalengka",
    maps_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1154.5123991206124!2d108.2721081!3d-6.6669931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ede115166299b%3A0xe54c86e245a4ecb4!2sRoyani%20Wedding!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
    form_tag: "HUBUNGI KAMI",
    form_title: "Tinggalkan Pesan",
    form_description: "Isi form di bawah ini dan tim kami akan segera menghubungi Anda melalui WhatsApp.",
  });

  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [faqItems, setFaqItems] = useState<FAQ[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);

  // Fetch all data
  useEffect(() => {
    async function fetchData() {
      try {
        const [heroData, aboutData, contactData, pkgData, faqData, portData] = await Promise.all([
          getHero(), getAbout(), getContact(), getPackages(), getFaqs(), getPortfolios(),
        ]);
        if (heroData) setHeroContent((p) => ({ ...p, ...Object.fromEntries(Object.entries(heroData as any).filter(([_, v]) => v !== "" && v !== null)) }));
        if (aboutData) setAboutContent((p) => ({ ...p, ...Object.fromEntries(Object.entries(aboutData as any).filter(([_, v]) => v !== "" && v !== null)) }));
        if (contactData) setContactContent((p) => ({ ...p, ...(contactData as any) }));
        if (pkgData) setPackages((pkgData as any).filter((p: any) => p.isActive !== false));
        if (faqData) setFaqItems((faqData as any).filter((f: any) => f.isActive !== false));
        if (portData) setPortfolioItems((portData as any).slice(0, 6));
      } catch (err) {
        console.warn("Fetch failed:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const parseWa = (n: string) => {
    const p = n.replace(/[^0-9]/g, "").replace(/^0/, "62");
    return p.startsWith("62") ? p : n;
  };

  const waLink = `https://wa.me/${parseWa(contactContent.whatsapp_number)}?text=Halo%20Royani%20Wedding%2C%20saya%20ingin%20berkonsultasi%20mengenai%20rencana%20pernikahan%20saya.`;

  // Map all packages directly from the database
  const activePkgs = packages.filter((p: any) => p.is_active !== false && p.isActive !== false)
                             .sort((a: any, b: any) => (a.sort_order || a.sortOrder || 0) - (b.sort_order || b.sortOrder || 0));

  const categoryCards = activePkgs.map((p: any) => ({
      id: p.id,
      name: p.name || "",
      price: p.price || "",
      featured: p.featured || false,
      features: Array.isArray(p.sections) ? (typeof p.sections[0] === 'string' ? p.sections : (p.sections[0]?.features || [])) : []
  }));

  // Services data
  const services = [
    { icon: "I", title: "Rias & Busana", description: "Tata rias pengantin profesional dengan sentuhan anggun, lengkap dengan busana pengantin pilihan terbaik." },
    { icon: "II", title: "Dekorasi Pelaminan", description: "Dekorasi megah yang disesuaikan dengan tema pernikahan Anda, dari klasik hingga modern kontemporer." },
    { icon: "III", title: "Dokumentasi", description: "Abadikan setiap momen berharga dengan foto dan video berkualitas tinggi oleh tim fotografer berpengalaman." },
    { icon: "IV", title: "Entertainment", description: "MC profesional, sound system berkualitas, dan hiburan musik untuk memeriahkan acara pernikahan Anda." },
  ];

  // Testimonials
  const testimonials = [
    { name: "Sari & Andi", role: "Resepsi di Majalengka", text: "Royani Wedding benar-benar mewujudkan pernikahan impian kami. Semua detail diperhatikan dengan sangat baik, dari dekorasi hingga rias pengantin. Terima kasih banyak!" },
    { name: "Dewi & Rian", role: "Akad & Resepsi di Cirebon", text: "Pelayanan yang luar biasa profesional. Tim sangat responsif dan membantu kami dalam setiap tahap persiapan. Hasil akhirnya melebihi ekspektasi kami." },
    { name: "Putri & Yoga", role: "Pernikahan Adat di Indramayu", text: "Konsep pernikahan adat kami terlaksana dengan sempurna berkat tim Royani Wedding. Semua tamu memuji keindahan dekorasi dan kelancaran acara." },
  ];

  // WhatsApp form
  const [formData, setFormData] = useState({ name: "", date: "", paket: "", message: "" });
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo *Royani Wedding*, saya ingin berkonsultasi mengenai rencana pernikahan saya.

` +
      `Berikut adalah data saya:
` +
      `👤 *Nama*: ${formData.name}
` +
      `📅 *Tanggal Acara*: ${formData.date || '-'}
` +
      `📦 *Paket Diminati*: ${formData.paket || '-'}
` +
      `💬 *Pesan/Pertanyaan*:
${formData.message || '-'}

` +
      `Terima kasih.`;
    window.open(`https://wa.me/${parseWa(contactContent.whatsapp_number)}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <main>
      {/* ═══════ HERO ═══════ */}
      <section className="hero" id="home">
        <div className="hero-bg"><img src={heroContent.bg_image_url || (heroContent as any).image_url || "/images/bg-hero.jpg"} alt="Royani Wedding" loading="eager" fetchPriority="high" decoding="async" onError={(e) => { e.currentTarget.src = "/images/bg-hero.jpg"; }} /></div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            {heroContent.title_first} <span>{heroContent.title_second}</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.9 }}
          >
            {heroContent.description}
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.1 }}
          >
            
            <Link href="/dokumentasi" className="btn-outline">
              Lihat Dokumentasi
            </Link>
          </motion.div>

          <motion.a
            href="#paket"
            className="hero-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.5 }}
          >
            <span>Scroll</span>
            <div className="scroll-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="7 13 12 18 17 13" />
                <polyline points="7 6 12 11 17 6" />
              </svg>
            </div>
          </motion.a>
        </div>
      </section>

      {/* ═══════ MARQUEE TICKER ═══════ */}
      <MarqueeTicker
        items={["Rias Busana", "Dekorasi Pelaminan", "Dokumentasi Foto & Video", "Wedding Planner", "Tata Panggung", "Entertainment", "MC Profesional"]}
      />

      {/* ═══════ ABOUT ═══════ */}
      <section className="section" id="tentang">
        <div className="container">
          <div className="about-grid">
            <AnimatedSection className="about-image-wrapper" direction="left">
              <div className="about-image">
                <img src={aboutContent.image_url || "/images/about.jpg"} alt="Royani Wedding" loading="lazy" decoding="async" onError={(e) => { e.currentTarget.src = "/images/about.jpg"; }} />
              </div>
              <div className="about-quote-card">
                <p>&ldquo;{aboutContent.quote}&rdquo;</p>
              </div>
            </AnimatedSection>

            <AnimatedSection className="about-text" direction="right">
              <span className="section-tag">{aboutContent.tag}</span>
              <h2 className="section-title">
                {aboutContent.title_first} <span>{aboutContent.title_highlight}</span>
              </h2>
              <p className="section-desc">{aboutContent.paragraph_1}</p>
              <p className="section-desc">{aboutContent.paragraph_2}</p>

              <div className="about-metrics">
                {aboutContent.metrics.map((m, i) => (
                  <div key={i} className="metric-item">
                    <span className="metric-value">{m.value}</span>
                    <span className="metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES ═══════ */}
      <section className="section section-alt" id="layanan">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="section-tag">LAYANAN KAMI</span>
            <h2 className="section-title">
              Layanan <span>Profesional</span>
            </h2>
            <p className="section-desc center">
              Kami menyediakan layanan pernikahan lengkap yang dapat disesuaikan dengan kebutuhan dan impian Anda.
            </p>
          </AnimatedSection>

          <p className="swipe-indicator">← Geser ke samping →</p>
          <div className="services-grid">
            {services.map((s, i) => (
              <ServiceCard key={i} icon={s.icon} title={s.title} description={s.description} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PARALLAX QUOTE ═══════ */}
      <section className="parallax-section" style={{ backgroundImage: `url(${heroContent.parallax_image_url || "/images/bg-divider.jpg"})` }}>
        <div className="parallax-overlay" />
        <AnimatedSection className="parallax-content">
          <p className="parallax-quote">&ldquo;{heroContent.parallax_quote}&rdquo;</p>
        </AnimatedSection>
      </section>


      {/* ═══════ PORTFOLIO PREVIEW ═══════ */}
      <section className="section" id="portfolio">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="section-tag">DOKUMENTASI</span>
            <h2 className="section-title">
              Momen yang <span>Terabadikan</span>
            </h2>
            <p className="section-desc center">
              Setiap pernikahan adalah cerita unik. Berikut beberapa momen indah yang telah kami abadikan.
            </p>
          </AnimatedSection>

          <div className="portfolio-preview-grid">
            {(portfolioItems.length > 0 ? portfolioItems : [
              { id: 1, title: "Andi & Sari", category: "Resepsi", imageUrl: "/images/porto-1.jpg", location: "Majalengka" },
              { id: 2, title: "Rian & Dewi", category: "Outdoor", imageUrl: "/images/porto-2.jpg", location: "Cirebon" },
              { id: 3, title: "Yoga & Putri", category: "Adat", imageUrl: "/images/porto-3.jpg", location: "Indramayu" },
              { id: 4, title: "Dimas & Rina", category: "Resepsi", imageUrl: "/images/porto-4.jpg", location: "Majalengka" },
            ]).slice(0, 4).map((item: any, i: number) => (
              <AnimatedSection key={item.id} className="portfolio-card" delay={i * 0.1}>
                <div className="portfolio-card-img">
                  <img src={item.imageUrl || item.image_url || "/images/porto-1.jpg"} alt={item.title} loading="lazy" decoding="async" />
                  <div className="portfolio-card-overlay">
                    <span className="portfolio-card-category">{item.category}</span>
                    <h3>{item.title}</h3>
                    <p>{item.location}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="section-cta">
            <Link href="/dokumentasi" className="btn-outline">
              Lihat Semua Dokumentasi →
            </Link>
          </AnimatedSection>
        </div>
      </section>
      {/* ═══════ TABBED PRICING PREVIEW ═══════ */}
      <section className="section section-alt" id="paket">
        <div className="container">
          <AnimatedSection className="section-header" direction="up">
            <span className="section-tag">PAKET HARGA</span>
            <h2 className="section-title">
              Pilihan <span className="gold-text">Terbaik</span>
            </h2>
            <p className="section-desc" style={{ margin: "0 auto", textAlign: "center" }}>
              Silakan pilih kategori paket yang sesuai dengan kebutuhan dan skala acara pernikahan Anda.
            </p>
          </AnimatedSection>

          {/* TAB BUTTONS */}
          <AnimatedSection className="pricing-tabs" direction="up" delay={0.1}>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "48px" }}>
              <button 
                onClick={() => setActivePricingTab('akad')}
                className={`btn-outline ${activePricingTab === 'akad' ? 'active-tab' : ''}`}
                style={{ 
                  backgroundColor: activePricingTab === 'akad' ? 'var(--gold)' : 'transparent',
                  color: activePricingTab === 'akad' ? '#000' : 'var(--gold)',
                  borderColor: 'var(--gold)',
                  padding: '12px 32px'
                }}
              >
                Paket Akad
              </button>
              <button 
                onClick={() => setActivePricingTab('lengkap')}
                className={`btn-outline ${activePricingTab === 'lengkap' ? 'active-tab' : ''}`}
                style={{ 
                  backgroundColor: activePricingTab === 'lengkap' ? 'var(--gold)' : 'transparent',
                  color: activePricingTab === 'lengkap' ? '#000' : 'var(--gold)',
                  borderColor: 'var(--gold)',
                  padding: '12px 32px'
                }}
              >
                Paket Lengkap
              </button>
            </div>
          </AnimatedSection>

          {/* TAB CONTENT */}
          <div className="swipe-indicator">← Geser untuk melihat paket →</div>
          <div className="pricing-grid">
            {activePkgs
              .filter((p: any) => p.type?.toLowerCase() === activePricingTab)
              .slice(0, 3) // Tampilkan maksimal 3 per tab agar tidak terlalu panjang
              .map((pkg: any, i: number) => {
                const features = Array.isArray(pkg.sections) ? (typeof pkg.sections[0] === 'string' ? pkg.sections : (pkg.sections[0]?.features || [])) : [];
                return (
                  <AnimatedSection key={pkg.id} className={`pricing-card ${pkg.featured ? "featured" : ""}`} delay={i * 0.15}>
                    {pkg.featured && <div className="pricing-badge">Terpopuler</div>}
                    <h3 className="pricing-name">{pkg.name}</h3>
                    <div className="pricing-price">
                      <span className="pricing-amount">{pkg.price}</span>
                    </div>
                    <ul className="pricing-features">
                      {features.slice(0, 5).map((f: string, fi: number) => (
                        <li key={fi}>✓ {f}</li>
                      ))}
                      {features.length > 5 && <li className="pricing-more">+ {features.length - 5} fitur lainnya</li>}
                    </ul>
                    <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary pricing-cta">
                      Konsultasi Paket
                    </a>
                  </AnimatedSection>
                );
              })}
          </div>

          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Link href="/harga" className="btn-outline">
              Lihat Semua Detail Paket Harga
            </Link>
          </div>
        </div>
      </section>

      

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="section" id="testimoni">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="section-tag">TESTIMONI</span>
            <h2 className="section-title">
              Kata <span>Mereka</span>
            </h2>
          </AnimatedSection>
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="section section-alt" id="faq">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="section-tag">FAQ</span>
            <h2 className="section-title">
              Pertanyaan yang <span>Sering Ditanyakan</span>
            </h2>
          </AnimatedSection>

          <div className="faq-list">
            {(faqItems.length > 0 ? faqItems : [
              { id: "1", question: "Apakah paket bisa disesuaikan?", answer: "Ya, semua paket kami fleksibel dan dapat disesuaikan dengan kebutuhan serta anggaran Anda. Tim kami siap membantu merancang paket yang tepat." },
              { id: "2", question: "Berapa lama sebelumnya harus booking?", answer: "Kami menyarankan booking minimal 3-6 bulan sebelum hari H untuk memastikan ketersediaan dan persiapan yang optimal." },
              { id: "3", question: "Area layanan mencakup mana saja?", answer: "Kami melayani area Majalengka, Cirebon, Indramayu, Kuningan, dan sekitarnya di Jawa Barat." },
            ]).map((faq: any, i: number) => (
              <AnimatedSection key={faq.id} delay={i * 0.05}>
                <div className={`faq-item ${activeFaq === i ? "active" : ""}`} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <div className="faq-question">
                    <h3>{faq.question}</h3>
                    <span className="faq-icon">{activeFaq === i ? "−" : "+"}</span>
                  </div>
                  <div className="faq-answer" style={{ maxHeight: activeFaq === i ? "1000px" : "0" }}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section className="section" id="kontak">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="section-tag">{contactContent.tag}</span>
            <h2 className="section-title">
              {contactContent.title_first} <span>{contactContent.title_highlight}</span>
            </h2>
            <p className="section-desc center">{contactContent.description}</p>
          </AnimatedSection>

          <div className="contact-grid">
            <AnimatedSection className="contact-info" direction="left">
              <div className="contact-card">
                <h3 style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", textTransform: "uppercase", color: "var(--gold)", letterSpacing: "2px", marginBottom: "12px" }}>Lokasi Kami</h3>
                <p>{contactContent.address}</p>
              </div>
              <div className="contact-card">
                <h3 style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", textTransform: "uppercase", color: "var(--gold)", letterSpacing: "2px", marginBottom: "12px" }}>WhatsApp</h3>
                <a href={waLink} target="_blank" rel="noopener noreferrer">{contactContent.whatsapp_number}</a>
              </div>
              <div className="contact-map">
                <iframe src={contactContent.maps_embed_url} width="100%" height="400" style={{ border: 0, borderRadius: 12 }} allowFullScreen loading="lazy" />
              </div>
            </AnimatedSection>

            <AnimatedSection className="contact-form-wrapper" direction="right">
              <form onSubmit={handleFormSubmit} className="contact-form">
                <h3>{contactContent.form_title}</h3>
                <p className="form-desc">{contactContent.form_description}</p>
                <div className="form-group">
                  <input type="text" placeholder="Nama Lengkap" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Tanggal Acara (contoh: 15 Desember 2025)" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                </div>
                <div className="form-group">
                  <select 
                  value={formData.paket} 
                  onChange={(e) => setFormData({ ...formData, paket: e.target.value })}
                  style={{ color: formData.paket === "" ? "var(--text-muted)" : "var(--text-primary)" }}
                  required
                >
                  <option value="" disabled>Pilih Paket yang Diminati</option>
                  {activePkgs.map((pkg: any) => (
                    <option key={pkg.id} value={pkg.name}>
                      {pkg.name} ({pkg.type?.toLowerCase() === 'akad' ? 'Akad' : 'Lengkap'}) - {pkg.price}
                    </option>
                  ))}
                  <option value="Lainnya / Belum Menentukan">Lainnya / Belum Menentukan</option>
                </select>
                </div>
                <div className="form-group">
                  <textarea placeholder="Pesan tambahan..." rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                </div>
                <button type="submit" className="btn-primary">
                  Kirim via WhatsApp →
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}
