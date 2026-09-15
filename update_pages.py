import re

def update_page(filepath, is_homepage):
    with open(filepath, "r") as f:
        content = f.read()
    
    # 1. Add Import
    if 'import { PricingCard }' not in content:
        content = content.replace('import { AnimatedSection } from "@/components/AnimatedSection";', 'import { AnimatedSection } from "@/components/AnimatedSection";\nimport { PricingCard } from "@/components/PricingCard";')

    # 2. Replace mapping logic
    # Find block starting with `.map((pkg: any, i: number) => {` and ending with `})}` inside the grids.
    # Note: there might be two blocks!
    
    # Let's use regex to replace the mapping blocks.
    old_block_pattern = r'\.map\(\(pkg: any, i: number\) => \{\n\s*const features.*?</AnimatedSection>\n\s*\)\;\n\s*\}\)'
    
    if is_homepage:
        new_block = r""".map((pkg: any, i: number) => (
                    <PricingCard 
                      key={pkg.id} 
                      pkg={pkg} 
                      delay={i * 0.1} 
                      onSelect={() => handlePilihPaket(pkg.name)} 
                    />
                  ))"""
    else:
        # In harga/page.tsx, onSelect should link to waLink.
        # But PricingCard expects a function. So we pass `() => window.open(waLink, "_blank")`.
        new_block = r""".map((pkg: any, i: number) => (
                    <PricingCard 
                      key={pkg.id} 
                      pkg={pkg} 
                      delay={i * 0.1} 
                      onSelect={() => window.open(waLink, "_blank")} 
                    />
                  ))"""

    content = re.sub(old_block_pattern, new_block, content, flags=re.DOTALL)
    
    with open(filepath, "w") as f:
        f.write(content)

update_page("src/app/page.tsx", True)
update_page("src/app/harga/page.tsx", False)
