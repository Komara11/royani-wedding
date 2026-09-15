import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# Add anchor IDs to the sections
content = content.replace('<div style={{ marginBottom: "80px" }}>', '<div id="paket-akad" style={{ marginBottom: "80px", scrollMarginTop: "100px" }}>')
content = content.replace('<div>\n              <h2 style={{ fontFamily: "var(--font-playfair)"', '<div id="paket-lengkap" style={{ scrollMarginTop: "100px" }}>\n              <h2 style={{ fontFamily: "var(--font-playfair)"')

# Add the "tabs" back as scroll navigation buttons
nav_buttons = """{/* TOMBOL NAVIGASI PAKET (KAYA SEBELUMNYA) */}
          <AnimatedSection className="pricing-tabs" direction="up" delay={0.1}>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "48px" }}>
              <button 
                onClick={() => { document.getElementById('paket-akad')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn-outline active-tab"
                style={{ 
                  backgroundColor: 'var(--gold)',
                  color: '#000',
                  borderColor: 'var(--gold)',
                  padding: '12px 32px'
                }}
              >
                Paket Akad
              </button>
              <button 
                onClick={() => { document.getElementById('paket-lengkap')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn-outline"
                style={{ 
                  backgroundColor: 'transparent',
                  color: 'var(--gold)',
                  borderColor: 'var(--gold)',
                  padding: '12px 32px'
                }}
              >
                Paket Lengkap
              </button>
            </div>
          </AnimatedSection>

          {/* KATEGORI: PAKET AKAD */}"""

content = content.replace('{/* KATEGORI: PAKET AKAD */}', nav_buttons)

with open("src/app/page.tsx", "w") as f:
    f.write(content)
