"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, doc, getDoc } from "firebase/firestore";

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
const fallbackPortfolioItems: PortfolioItemType[] = [];

export default function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItemType[]>(fallbackPortfolioItems);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [portfolioCategories, setPortfolioCategories] = useState<string[]>(["Semua", "Adat", "Resepsi", "Outdoor", "Kimono", "Dekorasi"]);

  // Fetch from Firebase
  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const portQ = query(collection(db, "galeri_portfolio"), orderBy("sort_order"));
        const [portSnap, catSnap] = await Promise.all([
          getDocs(portQ),
          getDoc(doc(db, "site_content", "portfolio_categories"))
        ]);
        
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

        if (catSnap.exists() && catSnap.data().list) {
          setPortfolioCategories(["Semua", ...catSnap.data().list]);
        }
      } catch (err) {
        console.warn("Firestore fetch failed, using fallback data:", err);
      }
    }
    fetchPortfolio();
  }, []);

  // Filter Categories
  const categories = portfolioCategories;
  
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

      <section id="dokumentasi" className="page-top-padding">
        
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <span className="section-tag reveal">Dokumentasi</span>
          <h1 className="section-title reveal">Karya & <span>Inspirasi</span></h1>
          <p className="section-desc reveal" style={{ margin: "0 auto" }}>
            Jelajahi seluruh koleksi momen berharga yang telah kami abadikan.
          </p>
        </div>

        {/* Filter */}
        <div className="portfolio-filters" style={{ marginBottom: "40px" }}>
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
              className={`portfolio-item ${item.gridClass || "col-4"} reveal`}
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
      </section>

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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="lightbox-nav next" onClick={nextImage}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
