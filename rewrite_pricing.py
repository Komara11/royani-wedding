import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# Remove activePricingTab
content = re.sub(r"  const \[activePricingTab, setActivePricingTab\] = useState<'akad'\|'lengkap'>\('akad'\);\n", "", content)

# Inject handlePilihPaket
handle_pilih = """  const [formData, setFormData] = useState({ name: "", date: "", paket: "", message: "" });

  const handlePilihPaket = (pkgName: string) => {
    setFormData(prev => ({ ...prev, paket: pkgName }));
    const el = document.getElementById("kontak");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };"""
content = content.replace('  const [formData, setFormData] = useState({ name: "", date: "", paket: "", message: "" });', handle_pilih)

# Replace the pricing section
old_pricing_section_start = content.find('{/* TAB BUTTONS */}')
old_pricing_section_end = content.find('<div style={{ textAlign: "center", marginTop: "48px" }}>') + content[content.find('<div style={{ textAlign: "center", marginTop: "48px" }}>'):].find('</div>\n        </div>') + len('</div>\n        </div>')

new_pricing_section = """{/* SEMUA PAKET (TIDAK DIPISAH TAB) */}
          <div className="pricing-grid">
            {activePkgs
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
        </div>"""

content = content[:old_pricing_section_start] + new_pricing_section + content[old_pricing_section_end:]

with open("src/app/page.tsx", "w") as f:
    f.write(content)
