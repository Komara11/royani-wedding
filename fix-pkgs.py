import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# Replace the aggregated cards with mapping all packages directly
old_pkgs = r"  // Create 2 aggregated category cards based on the lowest price in each category\n  const activePkgs = packages\.filter\(\(p: any\) => p\.is_active !== false && p\.isActive !== false\);\n  \n  // Find cheapest Akad\n  const akadPkgs = activePkgs\.filter\(\(p: any\) => p\.type\?\.toLowerCase\(\) === 'akad'\);\n  const cheapestAkad = akadPkgs\.length > 0 \? akadPkgs\.sort\(\(a, b\) => \{\n    const pA = parseInt\(\(a\.price \|\| \"\"\)\.replace\(/\[\^0-9\]/g, ''\)\) \|\| 0;\n    const pB = parseInt\(\(b\.price \|\| \"\"\)\.replace\(/\[\^0-9\]/g, ''\)\) \|\| 0;\n    return pA - pB;\n  \}\)\[0\]\.price : \"Rp 2\.500\.000\";\n\n  // Find cheapest Lengkap\n  const lengkapPkgs = activePkgs\.filter\(\(p: any\) => p\.type\?\.toLowerCase\(\) === 'lengkap'\);\n  const cheapestLengkap = lengkapPkgs\.length > 0 \? lengkapPkgs\.sort\(\(a, b\) => \{\n    const pA = parseInt\(\(a\.price \|\| \"\"\)\.replace\(/\[\^0-9\]/g, ''\)\) \|\| 0;\n    const pB = parseInt\(\(b\.price \|\| \"\"\)\.replace\(/\[\^0-9\]/g, ''\)\) \|\| 0;\n    return pA - pB;\n  \}\)\[0\]\.price : \"Rp 6\.000\.000\";\n\n  const categoryCards = \[\n    \{\n      id: \"cat-akad\",\n      name: \"Paket Akad\",\n      price: `Mulai dari \$\{cheapestAkad\}`,\n      featured: false,\n      features: \[\n        \"Makeup & Busana Pengantin\",\n        \"Melati Fresh & Aksesoris\",\n        \"Jas Pengantin Pria\",\n        \"Dokumentasi Foto & Cetak Album\",\n        \"Bisa disesuaikan dengan kebutuhan\"\n      \]\n    \},\n    \{\n      id: \"cat-lengkap\",\n      name: \"Paket Lengkap\",\n      price: `Mulai dari \$\{cheapestLengkap\}`,\n      featured: true,\n      features: \[\n        \"Dekorasi Pelaminan & Tenda\",\n        \"Alat Prasmanan & Meja Kursi\",\n        \"Makeup, Busana Pengantin & Keluarga\",\n        \"Dokumentasi Lengkap \(Album & Video\)\",\n        \"Tim WO & Acara Terkoordinasi\"\n      \]\n    \}\n  \];"

new_pkgs = """  // Map all packages directly from the database
  const activePkgs = packages.filter((p: any) => p.is_active !== false && p.isActive !== false)
                             .sort((a: any, b: any) => (a.sort_order || a.sortOrder || 0) - (b.sort_order || b.sortOrder || 0));

  const categoryCards = activePkgs.map((p: any) => ({
      id: p.id,
      name: p.name || "",
      price: p.price || "",
      featured: p.featured || false,
      features: Array.isArray(p.sections) ? (typeof p.sections[0] === 'string' ? p.sections : (p.sections[0]?.features || [])) : []
  }));"""

content = re.sub(old_pkgs, new_pkgs, content)

with open("src/app/page.tsx", "w") as f:
    f.write(content)
