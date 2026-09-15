import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# Define the old block that renders all packages flat
old_jsx_start = content.find('{/* SEMUA PAKET (TIDAK DIPISAH TAB) */}')
old_jsx_end = content.find('</div>\n        </div>', old_jsx_start) + len('</div>\n        </div>')

old_jsx = content[old_jsx_start:old_jsx_end]

# We need to filter activePkgs into akad and lengkap
new_jsx = """{/* KATEGORI: PAKET AKAD */}
          {activePkgs.filter((p: any) => p.type?.toLowerCase() === 'akad').length > 0 && (
            <div style={{ marginBottom: "80px" }}>
              <h2 style={{ fontFamily: "var(--font-playfair)", color: "var(--gold)", fontSize: "2rem", marginBottom: "32px", textAlign: "center" }}>Paket Akad</h2>
              <div className="pricing-grid">
                {activePkgs
                  .filter((p: any) => p.type?.toLowerCase() === 'akad')
                  .sort((a: any, b: any) => (a.sort_order || a.sortOrder || 0) - (b.sort_order || b.sortOrder || 0))
                  .map((pkg: any, i: number) => {
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
                        <button onClick={() => handlePilihPaket(pkg.name)} className="btn-primary pricing-cta" style={{ border: "none", cursor: "pointer" }}>
                          Pilih Paket
                        </button>
                      </AnimatedSection>
                    );
                  })}
              </div>
            </div>
          )}

          {/* KATEGORI: PAKET LENGKAP */}
          {activePkgs.filter((p: any) => p.type?.toLowerCase() === 'lengkap').length > 0 && (
            <div>
              <h2 style={{ fontFamily: "var(--font-playfair)", color: "var(--gold)", fontSize: "2rem", marginBottom: "32px", textAlign: "center" }}>Paket Lengkap</h2>
              <div className="pricing-grid">
                {activePkgs
                  .filter((p: any) => p.type?.toLowerCase() === 'lengkap')
                  .sort((a: any, b: any) => (a.sort_order || a.sortOrder || 0) - (b.sort_order || b.sortOrder || 0))
                  .map((pkg: any, i: number) => {
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
                        <button onClick={() => handlePilihPaket(pkg.name)} className="btn-primary pricing-cta" style={{ border: "none", cursor: "pointer" }}>
                          Pilih Paket
                        </button>
                      </AnimatedSection>
                    );
                  })}
              </div>
            </div>
          )}
        </div>"""

content = content[:old_jsx_start] + new_jsx + content[old_jsx_end:]

with open("src/app/page.tsx", "w") as f:
    f.write(content)
