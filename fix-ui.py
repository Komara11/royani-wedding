import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# Fix Packages logic
old_pkgs = r"  // Simplified Packages\n  const categoryCards = packages\n    \.filter\(\(p: any\) => p\.is_active !== false && p\.isActive !== false\) // Fallback to true\n    \.sort\(\(a: any, b: any\) => \(a\.sort_order \|\| a\.sortOrder \|\| 0\) - \(b\.sort_order \|\| b\.sortOrder \|\| 0\)\)\n    \.map\(\(p\) => \(\{\n      id: p\.id,\n      name: p\.name,\n      price: p\.price,\n      featured: p\.featured,\n      features: Array\.isArray\(p\.sections\) \n        \? \(typeof p\.sections\[0\] === 'string' \? p\.sections : \(p\.sections\[0\]\?\.features \|\| \[\]\)\) \n        : \[\]\n    \}\)\);"
new_pkgs = """  // Force exactly 2 packages (Akad and Lengkap)
  const activePkgs = packages
    .filter((p: any) => p.is_active !== false && p.isActive !== false)
    .sort((a: any, b: any) => (a.sort_order || a.sortOrder || 0) - (b.sort_order || b.sortOrder || 0));
  
  const akadPkg = activePkgs.find((p: any) => p.type?.toLowerCase() === "akad");
  const lengkapPkg = activePkgs.find((p: any) => p.type?.toLowerCase() === "lengkap");
  const selectedPkgs = [akadPkg, lengkapPkg].filter(Boolean);
  if (selectedPkgs.length === 0) selectedPkgs.push(...activePkgs.slice(0, 2));

  const categoryCards = selectedPkgs.map((p) => ({
      id: p.id,
      name: p.name || "",
      price: p.price || "",
      featured: p.featured || false,
      features: Array.isArray(p.sections) ? (typeof p.sections[0] === 'string' ? p.sections : (p.sections[0]?.features || [])) : []
  }));"""

content = re.sub(old_pkgs, new_pkgs, content)

# Fix Image error fallback for About image
content = content.replace(
    '<img src={aboutContent.image_url} alt="Royani Wedding" />',
    '<img src={aboutContent.image_url || "/images/about.jpg"} alt="Royani Wedding" onError={(e) => { e.currentTarget.src = "/images/about.jpg"; }} />'
)

# Also fix the parallax image just in case
content = content.replace(
    'backgroundImage: `url(${heroContent.parallax_image_url})`',
    'backgroundImage: `url(${heroContent.parallax_image_url || "/images/bg-divider.jpg"})`'
)

with open("src/app/page.tsx", "w") as f:
    f.write(content)
