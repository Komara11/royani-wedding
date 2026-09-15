import re

def refactor_homepage():
    with open("src/app/page.tsx", "r") as f:
        content = f.read()
    
    # 1. State for dynamic tabs
    old_state = "const [activePricingTab, setActivePricingTab] = useState<'akad'|'lengkap'>('akad');"
    new_state = """// Get unique categories and default to the first one (usually Akad)
  const uniqueCategories = Array.from(new Set(activePkgs.map((p: any) => p.type?.trim() || 'Lainnya')));
  const defaultTab = uniqueCategories.length > 0 ? uniqueCategories[0] : 'akad';
  const [activePricingTab, setActivePricingTab] = useState<string>(defaultTab);
  
  useEffect(() => {
    if (uniqueCategories.length > 0 && !uniqueCategories.includes(activePricingTab)) {
      setActivePricingTab(uniqueCategories[0]);
    }
  }, [activePkgs]);"""
    
    content = content.replace(old_state, new_state)
    
    # 2. Dynamic Tab buttons
    old_tabs_start = content.find('{/* TOMBOL NAVIGASI PAKET (KAYA SEBELUMNYA) */}')
    old_tabs_end = content.find('{/* KATEGORI: PAKET AKAD */}')
    
    if old_tabs_start != -1 and old_tabs_end != -1:
        new_tabs = """{/* TOMBOL NAVIGASI PAKET (DINAMIS) */}
          <AnimatedSection className="pricing-tabs" direction="up" delay={0.1}>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "48px", flexWrap: "wrap" }}>
              {uniqueCategories.map((cat: any) => (
                <button 
                  key={cat}
                  onClick={() => setActivePricingTab(cat)}
                  className={`btn-outline ${activePricingTab === cat ? 'active-tab' : ''}`}
                  style={{ 
                    backgroundColor: activePricingTab === cat ? 'var(--gold)' : 'transparent',
                    color: activePricingTab === cat ? '#000' : 'var(--gold)',
                    borderColor: 'var(--gold)',
                    padding: '12px 32px',
                    textTransform: 'capitalize'
                  }}
                >
                  Paket {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* KATEGORI PAKET (DINAMIS) */}
"""
        content = content[:old_tabs_start] + new_tabs + content[old_tabs_end + len('{/* KATEGORI: PAKET AKAD */}'):]
    
    # 3. Dynamic Category content
    old_akad_lengkap_start = content.find("{activePricingTab === 'akad'")
    old_akad_lengkap_end = content.find("        </div>\n      </section>\n\n      {/* ═══════ TESTIMONIALS")
    
    if old_akad_lengkap_start != -1 and old_akad_lengkap_end != -1:
        new_content = """{uniqueCategories.map((cat: any) => (
            activePricingTab === cat && activePkgs.filter((p: any) => (p.type?.trim() || 'Lainnya') === cat).length > 0 && (
              <div key={cat} id={`paket-${cat.toLowerCase().replace(/\\s+/g, '-')}`} style={{ scrollMarginTop: "100px", marginBottom: "80px" }}>
                <h2 style={{ fontFamily: "var(--font-playfair)", color: "var(--gold)", fontSize: "2rem", marginBottom: "32px", textAlign: "center", textTransform: 'capitalize' }}>
                  Paket {cat}
                </h2>
                <div className="swipe-indicator">← Geser untuk melihat paket →</div>
                <div className="pricing-preview-grid">
                  {activePkgs
                    .filter((p: any) => (p.type?.trim() || 'Lainnya') === cat)
                    .sort((a: any, b: any) => (a.sort_order || a.sortOrder || 0) - (b.sort_order || b.sortOrder || 0))
                    .map((pkg: any, i: number) => (
                      <PricingCard 
                        key={pkg.id} 
                        pkg={pkg} 
                        delay={i * 0.1} 
                        onSelect={() => handlePilihPaket(pkg.name)} 
                      />
                    ))}
                </div>
              </div>
            )
          ))}
"""
        content = content[:old_akad_lengkap_start] + new_content + content[old_akad_lengkap_end:]
    
    with open("src/app/page.tsx", "w") as f:
        f.write(content)

refactor_homepage()
