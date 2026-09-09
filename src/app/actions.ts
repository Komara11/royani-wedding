"use server";

import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";

const fallbackPackages = [
  {
    id: "l1", name: "Minimalis", price: "Rp 6.000.000", type: "lengkap", featured: false, sortOrder: 1,
    sections: [{ title: "Make-up & Busana", features: ["1x sepasang busana akad", "1x gaun resepsi", "1x jas resepsi", "Sepasang sepatu", "1 set melati fresh", "1x makeup pengantin + touch up"] }]
  },
  {
    id: "l2", name: "Ekonomis", price: "Rp 9.500.000", type: "lengkap", featured: true, sortOrder: 2,
    sections: [{ title: "Dekorasi & Make-up", features: ["Pelaminan 4–5 meter", "4 lokal tenda (menyesuaikan)", "1x sepasang busana akad & resepsi", "1x makeup pengantin + touch up", "1x makeup ibu hajat", "4 makeup pagar ayu"] }]
  },
  {
    id: "l3", name: "Standar 1", price: "Rp 13.500.000", type: "lengkap", featured: false, sortOrder: 3,
    sections: [{ title: "Paket Lengkap", features: ["Pelaminan 6 meter", "1 gapura pintu masuk", "2 set tenda", "1x sepasang busana akad & resepsi", "1x makeup pengantin + touch up", "1 set alat prasmanan"] }]
  },
  {
    id: "a1", name: "Paket 1", price: "Rp 2.500.000", type: "akad", featured: true, sortOrder: 4,
    sections: [{ title: "Make-up & Busana", features: ["Makeup Pengantin", "Busana Akad + Acc", "Jas Pengantin Pria", "Melati Fresh", "1 Album Magnetik"] }]
  },
  {
    id: "a2", name: "Paket 2", price: "Rp 1.700.000", type: "akad", featured: false, sortOrder: 5,
    sections: [{ title: "Make-up", features: ["Makeup Pengantin", "Busana Akad + Acc", "Jas Pengantin Pria", "Melati Fresh"] }]
  }
];

const fallbackPortfolios = [
  { id: "p1", imageUrl: "/images/porto-1.jpg", title: "Pernikahan Andi & Sari", category: "Resepsi", location: "Majalengka", sortOrder: 1 },
  { id: "p2", imageUrl: "/images/porto-2.jpg", title: "Pernikahan Rian & Dewi", category: "Outdoor", location: "Cirebon", sortOrder: 2 },
  { id: "p3", imageUrl: "/images/porto-3.jpg", title: "Pernikahan Yoga & Putri", category: "Adat", location: "Indramayu", sortOrder: 3 },
  { id: "p4", imageUrl: "/images/porto-4.jpg", title: "Pernikahan Dimas & Rina", category: "Resepsi", location: "Majalengka", sortOrder: 4 },
];

const fallbackHero = {
  bg_image_url: "/images/bg-hero.jpg",
  parallax_image_url: "/images/bg-divider.jpg",
  subtitle: "WEDDING ORGANIZER",
  title_first: "Royani",
  title_second: "Wedding",
  description: "Mewujudkan hari spesial Anda menjadi sempurna, berkesan, dan elegan lewat layanan profesional kami.",
  cta_text: "Konsultasi Gratis",
  parallax_quote: "Cinta tidak hanya tentang saling memandang, melainkan bersama-sama melihat ke satu arah yang sama dengan komitmen dan ketulusan abadi."
};

const fallbackAbout = {
  tag: "TENTANG KAMI",
  title_first: "Mewujudkan Momen",
  title_highlight: "Paling Berharga",
  paragraph_1: "Royani Wedding adalah mitra wedding organizer profesional di Majalengka yang berdedikasi tinggi untuk mewujudkan konsep pernikahan impian Anda. Kami memadukan nilai artistik dan detail organisasi terbaik demi kenyamanan seluruh rangkaian acara Anda.",
  paragraph_2: "Dari konsep tata rias anggun, dekorasi megah, hingga pengaturan alur acara di lapangan, kami memberikan sentuhan elegan dan perhatian penuh di setiap detiknya.",
  quote: "\"Pernikahan adalah simfoni cinta yang diabadikan dalam janji suci. Kami hadir untuk memastikan simfoni tersebut mengalun sempurna.\"",
  image_url: "/images/about.jpg",
  metrics: [
    { value: "500+", label: "Acara Sukses" },
    { value: "50+", label: "Mitra Vendor" },
    { value: "8+", label: "Tahun Pengalaman" }
  ]
};

const fallbackContact = {
  tag: "KONSULTASI GRATIS",
  title_first: "Mari Rencanakan",
  title_highlight: "Hari Spesial Anda",
  description: "Konsultasikan konsep pernikahan impian Anda bersama tim kami. Kami siap memberikan solusi terbaik sesuai dengan anggaran dan kebutuhan Anda.",
  whatsapp_number: "+62 878 4722 2209",
  address: "Desa Kedungsari, Kec. Ligung, Kab. Majalengka",
  maps_url: "https://www.google.com/maps/place/Royani+wedding+gallery/@-6.631259,108.3431362,17z/data=!4m6!3m5!1s0x2e6edd131e725ead:0x46b77e412f815e01!8m2!3d-6.6312202!4d108.3431383!16s%2Fg%2F11h9fjcljr?hl=id&entry=ttu&g_ep=EgoyMDI2MDYwOS4wIKXMDSoASAFQAw%3D%3D",
  maps_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.123456789!2d108.3431362!3d-6.631259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6edd131e725ead%3A0x46b77e412f815e01!2sRoyani%20wedding%20gallery!5e0!3m2!1sid!2sid!4v1234567890",
  form_tag: "HUBUNGI KAMI",
  form_title: "Tinggalkan Pesan",
  form_description: "Isi form di bawah ini dan tim kami akan segera menghubungi Anda melalui WhatsApp."
};

const fallbackSocialLinks = {
  tag: "SOSIAL MEDIA",
  title_first: "Ikuti",
  title_highlight: "Perjalanan Kami",
  description: "Lihat lebih banyak karya dan momen indah pernikahan klien kami di berbagai platform sosial media.",
  items: [
    { platform: "Instagram", url: "https://instagram.com/royaniwedding", icon: "instagram" },
    { platform: "TikTok", url: "https://tiktok.com/@royaniwedding", icon: "tiktok" },
    { platform: "Facebook", url: "https://facebook.com/royaniwedding", icon: "facebook" },
    { platform: "WhatsApp", url: "https://wa.me/6287847222209", icon: "whatsapp" }
  ]
};

const fallbackFaqs = [
  { id: "1", sortOrder: 1, question: "Apakah paket pernikahan bisa disesuaikan kembali?", answer: "Ya, tentu saja. Semua paket yang kami tawarkan fleksibel dan dapat disesuaikan kembali dengan konsep impian, kuantitas tamu, maupun anggaran pernikahan Anda." },
  { id: "2", sortOrder: 2, question: "Bagaimana mekanisme pembayaran dan DP di Royani Wedding?", answer: "Mekanisme pembayaran sangat mudah dan bertahap. Untuk mengamankan tanggal pernikahan (booking date), Anda cukup membayar Down Payment (DP) awal yang disepakati. Sisa pembayaran dapat dicicil." },
  { id: "3", sortOrder: 3, question: "Apakah melayani jasa pernikahan di luar wilayah Majalengka?", answer: "Ya, kami melayani wilayah Majalengka serta wilayah sekitar seperti Cirebon, Kuningan, Indramayu, dan daerah sekitarnya. Tergantung lokasi, mungkin terdapat sedikit penyesuaian biaya transportasi." },
  { id: "4", sortOrder: 4, question: "Berapa lama persiapan minimal sebelum memesan (booking)?", answer: "Waktu ideal adalah 3 hingga 6 bulan sebelum acara pernikahan. Hal ini sangat penting terutama di bulan-bulan padat (wedding season) agar tim kami dapat mempersiapkan segala detailnya dengan matang." }
];

export async function getHero() {
  noStore();
  try {
    const doc = await prisma.siteContent.findUnique({ where: { id: "hero" } });
    if (!doc?.data) return fallbackHero;
    return { ...fallbackHero, ...Object.fromEntries(Object.entries(doc.data as any).filter(([_, v]) => v !== "" && v !== null)) };
  } catch (e) {
    return fallbackHero;
  }
}

export async function getAbout() {
  noStore();
  try {
    const doc = await prisma.siteContent.findUnique({ where: { id: "about" } });
    if (!doc?.data) return fallbackAbout;
    return { ...fallbackAbout, ...Object.fromEntries(Object.entries(doc.data as any).filter(([_, v]) => v !== "" && v !== null)) };
  } catch (e) {
    return fallbackAbout;
  }
}

export async function getContact() {
  noStore();
  try {
    const doc = await prisma.siteContent.findUnique({ where: { id: "contact" } });
    if (!doc?.data) return fallbackContact;
    return { ...fallbackContact, ...Object.fromEntries(Object.entries(doc.data as any).filter(([_, v]) => v !== "" && v !== null)) };
  } catch (e) {
    return fallbackContact;
  }
}

export async function getSocialLinks() {
  noStore();
  try {
    const doc = await prisma.siteContent.findUnique({ where: { id: "social_links" } });
    if (!doc?.data) return fallbackSocialLinks;
    return { ...fallbackSocialLinks, ...Object.fromEntries(Object.entries(doc.data as any).filter(([_, v]) => v !== "" && v !== null)) };
  } catch (e) {
    return fallbackSocialLinks;
  }
}

export async function getPortfolioCategories() {
  noStore();
  try {
    const doc = await prisma.siteContent.findUnique({ where: { id: "portfolio_categories" } });
    return doc?.data || null;
  } catch (e) {
    return null;
  }
}

export async function getPortfolios() {
  noStore();
  try {
    const data = await prisma.portfolio.findMany({ orderBy: { sortOrder: 'asc' } });
    if (!data || data.length === 0) return fallbackPortfolios;
    return data;
  } catch (e) {
    return fallbackPortfolios;
  }
}

export async function getPackages() {
  noStore();
  try {
    const data = await prisma.package.findMany({ orderBy: { sortOrder: 'asc' } });
    if (!data || data.length === 0) return fallbackPackages;
    return data;
  } catch (e) {
    return fallbackPackages;
  }
}

export async function getFaqs() {
  noStore();
  try {
    const data = await prisma.faqItem.findMany({ orderBy: { sortOrder: 'asc' } });
    if (!data || data.length === 0) return fallbackFaqs;
    return data;
  } catch (e) {
    return fallbackFaqs;
  }
}
