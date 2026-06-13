"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

// Shared Types
type PortfolioItemType = {
  id: number;
  src: string;
  category: string;
  title: string;
  location: string;
  gridClass?: string;
};

// Fallback data
const fallbackPortfolioItems: PortfolioItemType[] = [
  { id: 1, src: "/portfolio/1.jpg", category: "Akad", title: "Intimate Akad", location: "Bandung", gridClass: "col-4" },
  { id: 2, src: "/portfolio/2.jpg", category: "Resepsi", title: "Grand Reception", location: "Jakarta", gridClass: "col-8" },
  { id: 3, src: "/portfolio/3.jpg", category: "Pre-Wedding", title: "Nature Pre-Wedding", location: "Bali", gridClass: "col-6" },
  { id: 4, src: "/portfolio/4.jpg", category: "Akad", title: "Traditional Akad", location: "Yogyakarta", gridClass: "col-6" },
  { id: 5, src: "/portfolio/5.jpg", category: "Resepsi", title: "Garden Party", location: "Bogor", gridClass: "col-12" },
];

export default function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItemType[]>(fallbackPortfolioItems);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  // Fetch from Firebase
  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const portQ = query(collection(db, "portfolio_items"), orderBy("sort_order"));
        const portSnap = await getDocs(portQ);
        if (!portSnap.empty) {
          const items = portSnap.docs
            .filter(d => d.data().is_active !== false)
            .map((d, idx) => ({ 
              ...d.data(), 
              id: idx, 
              src: d.data().image_url, 
              gridClass: d.data().grid_class || "col-6" 
            } as PortfolioItemType));
          if (items.length > 0) setPortfolioItems(items);
        }
      } catch (err) {
        console.warn("Firestore fetch failed, using fallback data:", err);
      }
    }
    fetchPortfolio();
  }, []);

  // Filter Categories
  const categories = Array.from(new Set(["Semua", "Akad", "Resepsi", "Outdoor", "Kimono", ...portfolioItems.map(item => item.category)]));
  
  const rawFilteredPortfolio = selectedCategory === "Semua"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  const filteredPortfolio = rawFilteredPortfolio.slice(0, visibleCount);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(12);
  }, [selectedCategory]);

  // Reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -80px 0px" }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [selectedCategory, portfolioItems]);

  // Lightbox
  const openLightbox = (id: number) => {
    const originalIndex = portfolioItems.findIndex(item => item.id === id);
    if (originalIndex !== -1) setLightboxIndex(originalIndex);
  };
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % portfolioItems.length);
  };
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + portfolioItems.length) % portfolioItems.length);
  };

  return (
    <>
      <nav style={{ background: "var(--nav-bg)", borderBottom: "1px solid var(--border-color)", padding: "16px 40px", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(10px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ color: "var(--gold)", textDecoration: "none", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "8px", fontWeight: 500 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Kembali ke Beranda
          </Link>
          <div style={{ fontFamily: "var(--ff-playfair)", fontSize: "1.3rem", color: "var(--text-primary)" }}>
            Semua Dokumentasi
          </div>
        </div>
      </nav>

      <main style={{ padding: "60px 40px", maxWidth: 1280, margin: "0 auto", minHeight: "80vh" }}>
        
        {/* Filter */}
        <div className="portfolio-filter" style={{ marginBottom: "40px" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid (show-all prevents the desktop 6-item limit) */}
        <div className="portfolio-grid show-all">
          {filteredPortfolio.map((item, idx) => (
            <div
              key={item.id}
              className={`portfolio-item ${item.gridClass || "span-1"} reveal`}
              style={{ transitionDelay: `${idx * 0.05}s` }}
              onClick={() => openLightbox(item.id)}
            >
              <img src={item.src} alt={item.title} />
              <div className="portfolio-overlay">
                <span className="portfolio-overlay-tag">{item.category}</span>
                <h4>{item.title}</h4>
                <p>{item.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < rawFilteredPortfolio.length && (
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button 
              className="btn btn-outline" 
              onClick={() => setVisibleCount(prev => prev + 12)}
              style={{ padding: "12px 32px", borderRadius: "30px", fontSize: "0.95rem" }}
            >
              Tampilkan Lebih Banyak
            </button>
          </div>
        )}

        {rawFilteredPortfolio.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px", color: "var(--text-muted)" }}>
            Belum ada dokumentasi untuk kategori ini.
          </div>
        )}
      </main>

      {/* PORTFOLIO LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <svg viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            Tutup
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={portfolioItems[lightboxIndex].src} 
              alt={portfolioItems[lightboxIndex].title} 
              className="lightbox-image" 
            />
            <div className="lightbox-info">
              <h3>{portfolioItems[lightboxIndex].title}</h3>
              <p>{portfolioItems[lightboxIndex].category} - {portfolioItems[lightboxIndex].location}</p>
            </div>
            
            <button className="lightbox-nav prev" onClick={prevImage}>
              <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="lightbox-nav next" onClick={nextImage}>
              <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
