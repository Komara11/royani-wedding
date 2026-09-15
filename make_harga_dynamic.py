import re

with open("src/app/harga/page.tsx", "r") as f:
    content = f.read()

# Replace the two hardcoded categories with dynamic mapping
old_start = content.find('<h2 style={{ fontFamily: "var(--font-playfair)"')
old_end = content.find('</div>\n      </section>\n\n      <Footer />')

if old_start != -1 and old_end != -1:
    new_content = """{Array.from(new Set(packages.map((p: any) => p.type?.trim() || 'Lainnya'))).map((cat: any) => {
            const catPackages = packages
              .filter((p: any) => (p.type?.trim() || 'Lainnya') === cat)
              .sort((a: any, b: any) => (a.sort_order || a.sortOrder || 0) - (b.sort_order || b.sortOrder || 0));
              
            if (catPackages.length === 0) return null;
            
            return (
              <div key={cat} style={{ marginBottom: "80px" }}>
                <h2 style={{ fontFamily: "var(--font-playfair)", color: "var(--gold)", fontSize: "2rem", marginBottom: "32px", textAlign: "center", textTransform: 'capitalize' }}>
                  Paket {cat}
                </h2>
                <div className="pricing-grid">
                  {catPackages.map((pkg: any, i: number) => (
                    <PricingCard 
                      key={pkg.id} 
                      pkg={pkg} 
                      delay={i * 0.1} 
                      onSelect={() => window.open(waLink, "_blank")} 
                    />
                  ))}
                </div>
              </div>
            );
          })}
        """
    content = content[:old_start] + new_content + content[old_end:]

with open("src/app/harga/page.tsx", "w") as f:
    f.write(content)
