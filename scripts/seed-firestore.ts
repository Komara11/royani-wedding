/**
 * Seed script — Populates Firestore with initial data from the existing hardcoded content.
 * 
 * Usage:
 *   npx tsx scripts/seed-firestore.ts
 * 
 * Prerequisites:
 *   - Firebase project must exist
 *   - Firestore must be enabled (in test mode initially)
 *   - Firebase Storage must be enabled
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDn4gVD_oG7ujuZxuHtlfYDiBfQx1fERLI",
  authDomain: "royani-weding.firebaseapp.com",
  projectId: "royani-weding",
  storageBucket: "royani-weding.firebasestorage.app",
  messagingSenderId: "374570807239",
  appId: "1:374570807239:web:a72d92e3d4dc3d23e373e2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ============================================================
// SITE CONTENT (single documents per section)
// ============================================================

async function seedSiteContent() {
  console.log("📝 Seeding site_content...");

  // Hero
  await setDoc(doc(db, "site_content", "hero"), {
    subtitle: "Wedding Organizer",
    title_first: "Royani",
    title_second: "Wedding",
    description: "Mewujudkan hari spesial Anda menjadi sempurna, berkesan, dan elegan lewat layanan profesional kami.",
    cta_text: "Daftar Harga",
    scroll_text: "Gulir ke bawah",
  });
  console.log("  ✅ hero");

  // About
  await setDoc(doc(db, "site_content", "about"), {
    tag: "Tentang Kami",
    title_first: "Menciptakan Momen",
    title_highlight: "Abadi",
    paragraph_1: "Royani Wedding adalah mitra wedding organizer profesional di Majalengka yang berdedikasi tinggi untuk mewujudkan konsep pernikahan impian Anda. Kami memadukan nilai artistik dan detail organisasi terbaik demi kenyamanan seluruh rangkaian acara Anda.",
    paragraph_2: "Dari konsep tata rias anggun, dekorasi megah, hingga pengaturan alur acara di lapangan, kami memberikan sentuhan elegan dan perhatian penuh di setiap detiknya.",
    quote: "Hari terindah adalah ketika janji suci terucap dan disaksikan oleh semesta dengan keanggunan abadi.",
    metrics: [
      { value: "500+", label: "Acara Sukses" },
      { value: "8+", label: "Tahun Kerja" },
      { value: "99%", label: "Kepuasan Klien" },
    ],
    image_url: "/images/about.jpg",
  });
  console.log("  ✅ about");

  // Contact
  await setDoc(doc(db, "site_content", "contact"), {
    tag: "Hubungi Kami",
    title_first: "Mulai Konsultasi",
    title_highlight: "Pernikahan Anda",
    description: "Kami percaya setiap detail menceritakan kisah cinta unik Anda. Ceritakan konsep pernikahan impian Anda, dan mari kita wujudkan hari bahagia Anda menjadi kenyataan yang anggun dan tak terlupakan.",
    whatsapp_number: "6287847222209",
    address: "Desa Kedungsari, Kec. Ligung, Kab. Majalengka",
    maps_url: "https://www.google.com/maps/place/Royani+wedding+gallery/@-6.631259,108.3431362,17z/data=!4m6!3m5!1s0x2e6edd131e725ead:0x46b77e412f815e01!8m2!3d-6.6312202!4d108.3431383!16s%2Fg%2F11h9fjcljr?hl=id&entry=ttu&g_ep=EgoyMDI2MDYwOS4wIKXMDSoASAFQAw%3D%3D",
    maps_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.123456789!2d108.3431362!3d-6.631259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6edd131e725ead%3A0x46b77e412f815e01!2sRoyani%20wedding%20gallery!5e0!3m2!1sid!2sid!4v1234567890",
    form_tag: "Rencana Hari Bahagia",
    form_title: "Kirim Pesan",
    form_description: "Rencanakan konsep pernikahan impian Anda bersama konsultan wedding planner kami.",
  });
  console.log("  ✅ contact");

  // Social Media
  await setDoc(doc(db, "site_content", "social_media"), {
    tag: "Ikuti Kami",
    title_first: "Terhubung Dengan",
    title_highlight: "Kami",
    description: "Ikuti akun sosial media resmi kami untuk info update, tips pranikah, dan portofolio harian terlengkap.",
    items: [
      { platform: "Instagram", url: "https://www.instagram.com/royani_wedding2", icon: "instagram" },
      { platform: "TikTok", url: "https://www.tiktok.com/@ceuroy", icon: "tiktok" },
      { platform: "Facebook", url: "https://www.facebook.com/ceu.roy", icon: "facebook" },
    ],
  });
  console.log("  ✅ social_media");

  // Footer
  await setDoc(doc(db, "site_content", "footer"), {
    description: "Mewujudkan hari spesial Anda menjadi kenangan indah yang sempurna, berkesan, dan elegan lewat layanan profesional kami.",
    copyright: "© 2025 Royani Wedding. All rights reserved.",
  });
  console.log("  ✅ footer");
}

// ============================================================
// PORTFOLIO ITEMS
// ============================================================

async function seedPortfolio() {
  console.log("📸 Seeding portfolio_items...");

  const items = [
    {
      title: "Pernikahan Andi & Sari",
      category: "Resepsi",
      location: "Grand Ballroom",
      image_url: "/images/porto-1.jpg",
      grid_class: "col-4",
      sort_order: 0,
      is_active: true,
      created_at: new Date(),
    },
    {
      title: "Pernikahan Rian & Dewi",
      category: "Outdoor",
      location: "Outdoor Garden",
      image_url: "/images/porto-2.jpg",
      grid_class: "col-8",
      sort_order: 1,
      is_active: true,
      created_at: new Date(),
    },
    {
      title: "Pernikahan Yoga & Putri",
      category: "Akad",
      location: "Gedung Serbaguna",
      image_url: "/images/porto-3.jpg",
      grid_class: "col-6",
      sort_order: 2,
      is_active: true,
      created_at: new Date(),
    },
    {
      title: "Pernikahan Dimas & Rina",
      category: "Resepsi",
      location: "Hotel Bintang 5",
      image_url: "/images/porto-4.jpg",
      grid_class: "col-6",
      sort_order: 3,
      is_active: true,
      created_at: new Date(),
    },
  ];

  for (const item of items) {
    await addDoc(collection(db, "portfolio_items"), item);
    console.log(`  ✅ ${item.title}`);
  }
}

// ============================================================
// PRICING PACKAGES
// ============================================================

async function seedPricing() {
  console.log("💰 Seeding pricing_packages...");

  // --- AKAD PACKAGES ---
  const akadPackages = [
    {
      name: "Paket 1",
      price: "Rp 2.500.000",
      type: "akad",
      featured: false,
      sort_order: 0,
      is_active: true,
      sections: [
        {
          title: "Make-up & Busana",
          is_bonus: false,
          features: ["Makeup Pengantin", "Busana Akad + Acc", "Jas Pengantin Pria", "Sepatu Pria & Wanita", "Melati Fresh"],
        },
        {
          title: "Dokumentasi",
          is_bonus: false,
          features: ["1 Album Magnetik 50 Lembar + File Foto"],
        },
        {
          title: "Bonus Free",
          is_bonus: true,
          features: ["Softlens Pengantin", "Henna + Nail Art Pengantin"],
        },
      ],
    },
    {
      name: "Paket 2",
      price: "Rp 1.700.000",
      type: "akad",
      featured: false,
      sort_order: 1,
      is_active: true,
      sections: [
        {
          title: "Make-up & Busana",
          is_bonus: false,
          features: ["Makeup Pengantin", "Busana Akad + Acc", "Jas Pengantin Pria", "Sepatu Pria & Wanita", "Melati Fresh"],
        },
        {
          title: "Bonus Free",
          is_bonus: true,
          features: ["Softlens Pengantin", "Henna + Nail Art Pengantin"],
        },
      ],
    },
  ];

  // --- LENGKAP PACKAGES ---
  const lengkapPackages = [
    {
      name: "Minimalis",
      price: "Rp 6.000.000",
      type: "lengkap",
      featured: false,
      sort_order: 0,
      is_active: true,
      sections: [
        { title: "Dekorasi", is_bonus: false, features: ["Dekorasi Indoor"] },
        {
          title: "Make-up & Busana",
          is_bonus: false,
          features: [
            "1x sepasang busana akad", "1x gaun resepsi", "1x jas resepsi",
            "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
            "1 set melati fresh", "1x makeup pengantin + touch up",
          ],
        },
        { title: "Dokumentasi", is_bonus: false, features: ["Cetak 1 album magnetik 70 lembar + file"] },
        { title: "Bonus Free", is_bonus: true, features: ["Softlens pengantin", "Henna + nail art pengantin", "Makeup ibu hajat"] },
      ],
    },
    {
      name: "Ekonomis",
      price: "Rp 9.500.000",
      type: "lengkap",
      featured: false,
      sort_order: 1,
      is_active: true,
      sections: [
        {
          title: "Dekorasi", is_bonus: false,
          features: [
            "Pelaminan 4–5 meter", "kursi 3", "2 kotak uang standar", "1 meja penerima tamu",
            "4 lokal tenda (model menyesuaikan tema)", "100 pcs kursi tamu",
            "1 set alat-alat prasmanan berikut 100 piring rotan & 100 sendok",
          ],
        },
        {
          title: "Make-up & Busana", is_bonus: false,
          features: [
            "1x sepasang busana akad", "1x gaun resepsi", "1x jas resepsi",
            "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
            "1 set melati fresh", "1x makeup pengantin + touch up",
            "1x makeup dan busana ibu hajat", "Beskap bapa hajat", "4 makeup dan busana pagar ayu",
          ],
        },
        { title: "Dokumentasi", is_bonus: false, features: ["Cetak 1 album magnetik 70 lembar + file"] },
        { title: "Bonus Free", is_bonus: true, features: ["Softlens pengantin", "Henna + nail art pengantin"] },
      ],
    },
    {
      name: "Standar 1",
      price: "Rp 13.500.000",
      type: "lengkap",
      featured: false,
      sort_order: 2,
      is_active: true,
      sections: [
        {
          title: "Dekorasi", is_bonus: false,
          features: [
            "Pelaminan 6 meter", "kursi 5", "2 kotak uang ukuran standar", "1 meja penerima tamu",
            "1 gapura pintu masuk", "2 set tenda", "100 pcs kursi tamu",
            "1 set alat-alat prasmanan berikut 100 piring rotan & 100 sendok",
          ],
        },
        {
          title: "Make-up & Busana", is_bonus: false,
          features: [
            "1x sepasang busana akad", "2x gaun resepsi",
            "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
            "1 set melati fresh", "1x makeup pengantin + touch up",
            "1x makeup dan busana ibu hajat + besan", "Beskap bapa hajat & besan",
            "4 makeup dan busana pagar ayu",
          ],
        },
        { title: "Dokumentasi", is_bonus: false, features: ["1 album wedding magnetik", "Cetak foto 70 lembar + file foto"] },
        { title: "Bonus Free", is_bonus: true, features: ["Softlens pengantin", "Henna + nail art khusus pengantin", "Makeup anak 2"] },
      ],
    },
    {
      name: "Standar 2",
      price: "Rp 15.500.000",
      type: "lengkap",
      featured: false,
      sort_order: 3,
      is_active: true,
      sections: [
        {
          title: "Dekorasi", is_bonus: false,
          features: [
            "Pelaminan 6 meter", "kursi 5", "Rangkaian bunga imitasi premium",
            "2 kotak uang ukuran standar", "1 meja penerima tamu", "1 gapura pintu masuk",
            "2 set tenda", "100 pcs kursi tamu + 100 pcs sarung kursi",
            "1 set alat-alat prasmanan berikut 100 piring rotan & 100 sendok",
            "2 malam lampu penerang + jenset", "Set meja akad", "1 kipas blower",
          ],
        },
        {
          title: "Make-up & Busana", is_bonus: false,
          features: [
            "1x sepasang busana akad", "2x gaun resepsi",
            "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
            "1 set melati fresh", "1x makeup pengantin + touch up",
            "1x makeup dan busana ibu hajat + besan", "Beskap bapa hajat & besan",
            "4 makeup dan busana pagar ayu",
          ],
        },
        { title: "Dokumentasi", is_bonus: false, features: ["1 album wedding magnetik", "Cetak foto 100 lembar + file foto"] },
        { title: "Bonus Free", is_bonus: true, features: ["Softlens pengantin", "Henna + nail art khusus pengantin", "Makeup anak 2"] },
      ],
    },
    {
      name: "Silver",
      price: "Rp 17.500.000",
      type: "lengkap",
      featured: false,
      sort_order: 4,
      is_active: true,
      sections: [
        {
          title: "Dekorasi", is_bonus: false,
          features: [
            "Pelaminan 8 meter", "kursi 5", "Rangkaian bunga imitasi premium",
            "2 kotak uang", "1 meja penerima tamu", "1 gapura pintu masuk",
            "7 lokal tenda (model menyesuaikan tema)", "100 pcs kursi tamu + 100 pcs sarung kursi",
            "1 set alat-alat prasmanan (roll toup) berikut 100 piring rotan & 100 sendok",
            "2 malam lampu penerang + jenset", "Set meja akad", "1 kipas blower",
          ],
        },
        {
          title: "Make-up & Busana", is_bonus: false,
          features: [
            "1x sepasang busana akad", "2x gaun resepsi",
            "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
            "1 set melati fresh", "1x makeup pengantin + touch up",
            "1x makeup dan busana ibu hajat + besan", "Beskap bapa hajat & besan",
            "4 makeup dan busana pagar ayu",
          ],
        },
        { title: "Dokumentasi", is_bonus: false, features: ["1 album wedding magnetik", "Cetak 100 foto + file"] },
        { title: "Bonus Free", is_bonus: true, features: ["Softlens pengantin", "Henna + nail art pengantin", "Makeup dewasa 2", "Makeup anak 2"] },
      ],
    },
    {
      name: "Gold",
      price: "Rp 20.000.000",
      type: "lengkap",
      featured: true,
      sort_order: 5,
      is_active: true,
      sections: [
        {
          title: "Dekorasi", is_bonus: false,
          features: [
            "Pelaminan 8 meter", "Rangkaian bunga imitasi premium", "Lorong masuk", "Foto booth",
            "2 kotak uang", "1 meja penerima tamu", "1 gapura pintu masuk",
            "8 lokal tenda (model menyesuaikan tema)", "100 pcs kursi tamu + 100 pcs sarung kursi",
            "1 set alat-alat prasmanan (roll toup) berikut 100 piring rotan & 100 sendok",
            "2 malam lampu penerang + jenset", "Set meja akad", "2 kipas blower", "Karpet jalan 20 meter",
          ],
        },
        {
          title: "Make-up & Busana", is_bonus: false,
          features: [
            "1x sepasang busana akad", "2x gaun resepsi",
            "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
            "1 set melati fresh", "1x makeup pengantin + touch up",
            "1x makeup dan busana ibu hajat + besan", "Beskap bapa hajat & besan",
            "4 makeup dan busana pagar ayu", "2 pagar bagus",
          ],
        },
        { title: "Dokumentasi", is_bonus: false, features: ["1 album wedding magnetik", "Cetak 100 foto + file", "Video liputan 2 disk"] },
        { title: "Include & Bonus", is_bonus: true, features: ["1 MC Akad", "Softlens pengantin", "Henna + nail art pengantin", "Makeup dewasa 2", "Pelepasan balon"] },
      ],
    },
    {
      name: "Platinum",
      price: "Rp 35.000.000",
      type: "lengkap",
      featured: false,
      sort_order: 6,
      is_active: true,
      sections: [
        {
          title: "Dekorasi", is_bonus: false,
          features: [
            "Pelaminan 8 meter", "Rangkaian bunga imitasi premium", "Lorong masuk", "Foto booth",
            "2 kotak uang", "2 meja penerima tamu", "1 gapura pintu masuk",
            "9 lokal tenda (model menyesuaikan tema)", "100 pcs kursi tamu + 100 pcs sarung kursi",
            "1 set alat-alat prasmanan (roll toup) berikut 100 piring rotan & 100 sendok",
            "2 malam lampu penerang + jenset", "Set meja akad", "2 kipas blower",
            "Karpet merah 30 meter", "2 meja VIP",
          ],
        },
        {
          title: "Make-up & Busana", is_bonus: false,
          features: [
            "1x sepasang busana akad", "2x gaun resepsi",
            "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
            "1 set melati fresh", "1x makeup pengantin + touch up",
            "1x makeup dan busana ibu hajat + besan", "Beskap bapa hajat & besan",
            "6 makeup dan busana pagar ayu", "2 pagar bagus",
          ],
        },
        {
          title: "Dokumentasi", is_bonus: false,
          features: [
            "Cetak 1 album magazine + file editing (1 flashdisk)", "Cetak 1 album magnetik",
            "Video sinematik", "Video liputan", "Video on flashdisk",
          ],
        },
        {
          title: "Include & Bonus", is_bonus: true,
          features: ["1 MC Akad", "4 Crew WO", "Softlens pengantin", "Henna + nail art pengantin", "Makeup dewasa 2", "Makeup anak 2", "Pelepasan balon"],
        },
      ],
    },
    {
      name: "Exclusive",
      price: "Rp 45.000.000",
      type: "lengkap",
      featured: false,
      sort_order: 7,
      is_active: true,
      sections: [
        {
          title: "Dekorasi", is_bonus: false,
          features: [
            "Pelaminan 10 meter", "Rangkaian bunga imitasi premium", "Lorong masuk", "Foto booth",
            "2 kotak uang", "2 meja penerima tamu", "1 gapura pintu masuk",
            "10 lokal tenda (model menyesuaikan tema)", "100 pcs kursi tamu + 100 pcs sarung kursi",
            "1 set alat-alat prasmanan (roll toup) berikut 150 piring rotan & 150 sendok",
            "2 malam lampu penerang + jenset", "1 Set meja akad Exclusive", "3 kipas blower",
            "Karpet jalan 40 meter", "2 meja VIP", "2 meja hidangan tambahan",
          ],
        },
        {
          title: "Make-up & Busana", is_bonus: false,
          features: [
            "1x sepasang busana akad", "2x gaun resepsi",
            "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
            "1 set melati fresh", "1x makeup pengantin + touch up",
            "1x makeup dan busana ibu hajat + besan", "Beskap bapa hajat & besan",
            "6 makeup dan busana pagar ayu", "4 makeup keluarga", "2 pagar bagus",
          ],
        },
        {
          title: "Dokumentasi", is_bonus: false,
          features: [
            "Cetak 1 album magazine + file editing (1 flashdisk)", "Cetak 1 album magnetik",
            "Video sinematik", "Video liputan", "Video on flashdisk",
          ],
        },
        {
          title: "Include & Bonus", is_bonus: true,
          features: [
            "1 MC Akad", "4 Crew WO", "Pemandu siraman", "Softlens pengantin",
            "Henna + nail art pengantin", "Makeup dewasa 2", "Makeup anak 2", "Pelepasan balon",
          ],
        },
      ],
    },
  ];

  const allPackages = [...akadPackages, ...lengkapPackages];
  for (const pkg of allPackages) {
    await addDoc(collection(db, "pricing_packages"), pkg);
    console.log(`  ✅ ${pkg.type}/${pkg.name}`);
  }
}

// ============================================================
// FAQs
// ============================================================

async function seedFaqs() {
  console.log("❓ Seeding faqs...");

  const faqs = [
    {
      question: "Apakah paket pernikahan bisa disesuaikan kembali?",
      answer: "Ya, tentu saja. Semua paket yang kami tawarkan fleksibel dan dapat disesuaikan kembali dengan konsep impian, kuantitas tamu, maupun anggaran pernikahan Anda. Hubungi kami untuk berkonsultasi secara personal.",
      sort_order: 0,
      is_active: true,
    },
    {
      question: "Bagaimana mekanisme pembayaran dan DP di Royani Wedding?",
      answer: "Mekanisme pembayaran sangat mudah dan bertahap. Untuk mengamankan tanggal pernikahan (booking date), Anda cukup membayar Down Payment (DP) awal yang disepakati. Sisa pembayaran dapat dicicil hingga pelunasan menjelang hari H.",
      sort_order: 1,
      is_active: true,
    },
    {
      question: "Apakah melayani jasa pernikahan di luar wilayah Majalengka?",
      answer: "Ya, kami melayani wilayah Majalengka serta wilayah sekitar seperti Cirebon, Kuningan, Indramayu, dan daerah sekitarnya. Tergantung lokasi, mungkin terdapat sedikit penyesuaian biaya transportasi.",
      sort_order: 2,
      is_active: true,
    },
    {
      question: "Berapa lama persiapan minimal sebelum memesan (booking)?",
      answer: "Waktu ideal adalah 3 hingga 6 bulan sebelum acara pernikahan. Hal ini sangat penting terutama di bulan-bulan padat (wedding season) agar tim dekorasi, MUA, dan logistik kami dapat mempersiapkan segala detailnya dengan matang.",
      sort_order: 3,
      is_active: true,
    },
  ];

  for (const faq of faqs) {
    await addDoc(collection(db, "faqs"), faq);
    console.log(`  ✅ ${faq.question.substring(0, 40)}...`);
  }
}

// ============================================================
// RUN ALL
// ============================================================

async function main() {
  console.log("🚀 Starting Firestore seed...\n");

  try {
    await seedSiteContent();
    console.log("");
    await seedPortfolio();
    console.log("");
    await seedPricing();
    console.log("");
    await seedFaqs();
    console.log("\n✅ All data seeded successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
  }

  process.exit(0);
}

main();
