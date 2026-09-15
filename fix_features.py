import re
import glob

def process_file(filepath):
    with open(filepath, "r") as f:
        content = f.read()

    # We need to replace:
    # <ul className="pricing-features">
    #   {features.map((f: string, fi: number) => (
    #     <li key={fi}>✓ {f}</li>
    #   ))}
    # </ul>
    # With a custom mapping that checks for "FREE:" or "INCLUDE:"
    
    old_ul = r'<ul className="pricing-features">\n\s*\{features\.map\(\(f: string, fi: number\) => \(\n\s*<li key=\{fi\}>✓ \{f\}</li>\n\s*\)\)\}\n\s*</ul>'
    
    new_ul = """<ul className="pricing-features">
                      {features.map((f: string, fi: number) => {
                        const isFree = f.toUpperCase().startsWith("FREE:");
                        const isInclude = f.toUpperCase().startsWith("INCLUDE:");
                        
                        if (isFree || isInclude) {
                          const prefix = isFree ? "FREE:" : "INCLUDE:";
                          const items = f.substring(prefix.length).split(",").map(item => item.trim());
                          const color = isFree ? "var(--gold)" : "var(--gold-light)";
                          const icon = isFree ? "🎁" : "✨";
                          return items.map((item, subIdx) => (
                            <li key={`${fi}-${subIdx}`} style={{ color: color, fontWeight: 500 }}>
                              {icon} {prefix} {item}
                            </li>
                          ));
                        }
                        
                        return <li key={fi}>✓ {f}</li>;
                      })}
                    </ul>"""
                    
    content = re.sub(old_ul, new_ul, content)
    
    with open(filepath, "w") as f:
        f.write(content)

process_file("src/app/page.tsx")
process_file("src/app/harga/page.tsx")
