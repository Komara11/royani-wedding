import re

with open("src/app/actions.ts", "r") as f:
    content = f.read()

fallback_regex = r"const fallbackPackages = \[.*?\];"
replacement = """const fallbackPackages = [
  {
    id: "cat-akad", name: "Paket Akad", price: "Mulai dari Rp 4.000.000", type: "akad", featured: false, sortOrder: 1,
    sections: [{ title: "", is_bonus: false, features: ["Makeup & Busana Pengantin", "Melati Fresh & Aksesoris", "Jas Pengantin Pria", "Dokumentasi Foto & Cetak Album", "Bisa disesuaikan dengan kebutuhan"] }]
  },
  {
    id: "cat-lengkap", name: "Paket Lengkap", price: "Mulai dari Rp 15.000.000", type: "lengkap", featured: true, sortOrder: 2,
    sections: [{ title: "", is_bonus: false, features: ["Dekorasi Pelaminan & Tenda", "Alat Prasmanan & Meja Kursi", "Makeup, Busana Pengantin & Keluarga", "Dokumentasi Lengkap (Album & Video)", "Tim WO & Acara Terkoordinasi"] }]
  }
];"""

content = re.sub(fallback_regex, replacement, content, flags=re.DOTALL)

with open("src/app/actions.ts", "w") as f:
    f.write(content)
