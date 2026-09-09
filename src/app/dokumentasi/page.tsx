"use client";

import { useEffect, useState } from "react";
import { getPortfolios, getPortfolioCategories } from "@/app/actions";
import { AnimatedSection } from "@/components/AnimatedSection";

type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  location: string;
  imageUrl: string;
  image_url?: string;
  gridClass?: string;
  grid_class?: string;
};

export default function DokumentasiPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [categories, setCategories] = useState<string[]>(["Semua", "Adat", "Resepsi", "Outdoor", "Kimono", "Dekorasi"]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [visibleCount, setVisibleCount] = useState(12);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [portData, catData] = await Promise.all([getPortfolios(), getPortfolioCategories()]);
        if (portData && (portData as any).length > 0) {
          setItems((portData as any).map((d: any) => ({
            id: d.id,
            title: d.title || "",
            category: d.category || "Resepsi",
            location: d.location || "",
            imageUrl: d.imageUrl || d.image_url || "",
            gridClass: d.gridClass || d.grid_class || "col-6",
          })));
        }
        if (catData && (catData as any).list) {
          setCategories(["Semua", ...(catData as any).list]);
        }
      } catch (err) { console.warn(err); }
      finally { setLoading(false); }
    }
    fetchData();
  }, []);

  const filtered = selectedCategory === "Semua" ? items : items.filter((i) => i.category === selectedCategory);
  const visible = filtered.slice(0, visibleCount);

  const openLightbox = (i: number) => {
    setLightbox(i);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = "";
  };

  return (
    <main>
      {/* Hero Banner */}

      {/* Category Filter */}
      <section className="section" style={{ paddingTop: 150 }}>
        <div className="container">
          <div className="filter-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => { setSelectedCategory(cat); setVisibleCount(12); }}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: 80 }}>
              <div className="spinner-line" style={{ margin: "0 auto", width: 60 }} />
            </div>
          ) : visible.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--text-muted)", padding: 60 }}>
              Belum ada dokumentasi untuk kategori ini.
            </p>
          ) : (
            <>
              <div className="portfolio-grid">
                {visible.map((item, i) => (
                  <AnimatedSection key={item.id} className="portfolio-card" delay={(i % 4) * 0.08}>
                    <div className="portfolio-card-img" onClick={() => openLightbox(i)}>
                      <img src={item.imageUrl} alt={item.title} loading="lazy" />
                      <div className="portfolio-card-overlay">
                        <span className="portfolio-card-category">{item.category}</span>
                        <h3>{item.title}</h3>
                        {item.location && <p>{item.location}</p>}
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {visibleCount < filtered.length && (
                <div className="section-cta" style={{ marginTop: 40 }}>
                  <button className="btn-outline" onClick={() => setVisibleCount((v) => v + 12)}>
                    Tampilkan Lebih Banyak
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && visible[lightbox] && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>✕</button>
          <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); setLightbox(Math.max(0, lightbox - 1)); }}>‹</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={visible[lightbox].imageUrl} alt={visible[lightbox].title} />
            <div className="lightbox-info">
              <h3>{visible[lightbox].title}</h3>
              <p>{visible[lightbox].category} {visible[lightbox].location && `• ${visible[lightbox].location}`}</p>
            </div>
          </div>
          <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); setLightbox(Math.min(visible.length - 1, lightbox + 1)); }}>›</button>
        </div>
      )}
    </main>
  );
}
