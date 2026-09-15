import re

with open("src/app/harga/page.tsx", "r") as f:
    content = f.read()

# Replace akadPackages mapping
old_akad_pattern = r'\{akadPackages\.map\(\(pkg, i\) => \{.*?</AnimatedSection>\n\s*\)\;\n\s*\}\)\}'
new_akad = """{akadPackages.map((pkg, i) => (
                    <PricingCard 
                      key={pkg.id} 
                      pkg={pkg} 
                      delay={i * 0.1} 
                      onSelect={() => window.open(waLink, "_blank")} 
                    />
                  ))}"""

content = re.sub(old_akad_pattern, new_akad, content, flags=re.DOTALL)

# Replace lengkapPackages mapping
old_lengkap_pattern = r'\{lengkapPackages\.map\(\(pkg, i\) => \{.*?</AnimatedSection>\n\s*\)\;\n\s*\}\)\}'
new_lengkap = """{lengkapPackages.map((pkg, i) => (
                    <PricingCard 
                      key={pkg.id} 
                      pkg={pkg} 
                      delay={i * 0.1} 
                      onSelect={() => window.open(waLink, "_blank")} 
                    />
                  ))}"""

content = re.sub(old_lengkap_pattern, new_lengkap, content, flags=re.DOTALL)

with open("src/app/harga/page.tsx", "w") as f:
    f.write(content)
