"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getHero, getAbout, getContact, getSocialLinks } from "@/app/actions";

// Portfolio definition (fallback data)
const fallbackPortfolioItems = [
  { id: 0, src: "/images/porto-1.jpg", title: "Pernikahan Andi & Sari", category: "Resepsi", location: "Grand Ballroom", gridClass: "col-4" },
  { id: 1, src: "/images/porto-2.jpg", title: "Pernikahan Rian & Dewi", category: "Outdoor", location: "Outdoor Garden", gridClass: "col-8" },
  { id: 2, src: "/images/porto-3.jpg", title: "Pernikahan Yoga & Putri", category: "Adat", location: "Gedung Serbaguna", gridClass: "col-6" },
  { id: 3, src: "/images/porto-4.jpg", title: "Pernikahan Dimas & Rina", category: "Resepsi", location: "Hotel Bintang 5", gridClass: "col-6" },
];

// Pricing definitions
interface PricingPackage {
  name: string;
  price: string;
  featured?: boolean;
  sections: {
    title: string;
    features: string[];
    free?: boolean;
  }[];
}

const akadPackages: PricingPackage[] = [
  {
    name: "Paket 1",
    price: "Rp 2.500.000",
    sections: [
      {
        title: "Make-up & Busana",
        features: ["Makeup Pengantin", "Busana Akad + Acc", "Jas Pengantin Pria", "Sepatu Pria & Wanita", "Melati Fresh"]
      },
      {
        title: "Dokumentasi",
        features: ["1 Album Magnetik 50 Lembar + File Foto"]
      },
      {
        title: "Bonus Free",
        free: true,
        features: ["Softlens Pengantin", "Henna + Nail Art Pengantin"]
      }
    ]
  },
  {
    name: "Paket 2",
    price: "Rp 1.700.000",
    sections: [
      {
        title: "Make-up & Busana",
        features: ["Makeup Pengantin", "Busana Akad + Acc", "Jas Pengantin Pria", "Sepatu Pria & Wanita", "Melati Fresh"]
      },
      {
        title: "Bonus Free",
        free: true,
        features: ["Softlens Pengantin", "Henna + Nail Art Pengantin"]
      }
    ]
  }
];

const lengkapPackages: PricingPackage[] = [
  {
    name: "Minimalis",
    price: "Rp 6.000.000",
    sections: [
      {
        title: "Dekorasi",
        features: ["Dekorasi Indoor"]
      },
      {
        title: "Make-up & Busana",
        features: [
          "1x sepasang busana akad",
          "1x gaun resepsi",
          "1x jas resepsi",
          "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
          "1 set melati fresh",
          "1x makeup pengantin + touch up"
        ]
      },
      {
        title: "Dokumentasi",
        features: ["Cetak 1 album magnetik 70 lembar + file"]
      },
      {
        title: "Bonus Free",
        free: true,
        features: ["Softlens pengantin", "Henna + nail art pengantin", "Makeup ibu hajat"]
      }
    ]
  },
  {
    name: "Ekonomis",
    price: "Rp 9.500.000",
    sections: [
      {
        title: "Dekorasi",
        features: [
          "Pelaminan 4–5 meter",
          "kursi 3",
          "2 kotak uang standar",
          "1 meja penerima tamu",
          "4 lokal tenda (model menyesuaikan tema)",
          "100 pcs kursi tamu",
          "1 set alat-alat prasmanan berikut 100 piring rotan & 100 sendok"
        ]
      },
      {
        title: "Make-up & Busana",
        features: [
          "1x sepasang busana akad",
          "1x gaun resepsi",
          "1x jas resepsi",
          "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
          "1 set melati fresh",
          "1x makeup pengantin + touch up",
          "1x makeup dan busana ibu hajat",
          "Beskap bapa hajat",
          "4 makeup dan busana pagar ayu"
        ]
      },
      {
        title: "Dokumentasi",
        features: ["Cetak 1 album magnetik 70 lembar + file"]
      },
      {
        title: "Bonus Free",
        free: true,
        features: ["Softlens pengantin", "Henna + nail art pengantin"]
      }
    ]
  },
  {
    name: "Standar 1",
    price: "Rp 13.500.000",
    sections: [
      {
        title: "Dekorasi",
        features: [
          "Pelaminan 6 meter",
          "kursi 5",
          "2 kotak uang ukuran standar",
          "1 meja penerima tamu",
          "1 gapura pintu masuk",
          "2 set tenda",
          "100 pcs kursi tamu",
          "1 set alat-alat prasmanan berikut 100 piring rotan & 100 sendok"
        ]
      },
      {
        title: "Make-up & Busana",
        features: [
          "1x sepasang busana akad",
          "2x gaun resepsi",
          "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
          "1 set melati fresh",
          "1x makeup pengantin + touch up",
          "1x makeup dan busana ibu hajat + besan",
          "Beskap bapa hajat & besan",
          "4 makeup dan busana pagar ayu"
        ]
      },
      {
        title: "Dokumentasi",
        features: ["1 album wedding magnetik", "Cetak foto 70 lembar + file foto"]
      },
      {
        title: "Bonus Free",
        free: true,
        features: ["Softlens pengantin", "Henna + nail art khusus pengantin", "Makeup anak 2"]
      }
    ]
  },
  {
    name: "Standar 2",
    price: "Rp 15.500.000",
    sections: [
      {
        title: "Dekorasi",
        features: [
          "Pelaminan 6 meter",
          "kursi 5",
          "Rangkaian bunga imitasi premium",
          "2 kotak uang ukuran standar",
          "1 meja penerima tamu",
          "1 gapura pintu masuk",
          "2 set tenda",
          "100 pcs kursi tamu + 100 pcs sarung kursi",
          "1 set alat-alat prasmanan berikut 100 piring rotan & 100 sendok",
          "2 malam lampu penerang + jenset",
          "Set meja akad",
          "1 kipas blower"
        ]
      },
      {
        title: "Make-up & Busana",
        features: [
          "1x sepasang busana akad",
          "2x gaun resepsi",
          "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
          "1 set melati fresh",
          "1x makeup pengantin + touch up",
          "1x makeup dan busana ibu hajat + besan",
          "Beskap bapa hajat & besan",
          "4 makeup dan busana pagar ayu"
        ]
      },
      {
        title: "Dokumentasi",
        features: ["1 album wedding magnetik", "Cetak foto 100 lembar + file foto"]
      },
      {
        title: "Bonus Free",
        free: true,
        features: ["Softlens pengantin", "Henna + nail art khusus pengantin", "Makeup anak 2"]
      }
    ]
  },
  {
    name: "Silver",
    price: "Rp 17.500.000",
    sections: [
      {
        title: "Dekorasi",
        features: [
          "Pelaminan 8 meter",
          "kursi 5",
          "Rangkaian bunga imitasi premium",
          "2 kotak uang",
          "1 meja penerima tamu",
          "1 gapura pintu masuk",
          "7 lokal tenda (model menyesuaikan tema)",
          "100 pcs kursi tamu + 100 pcs sarung kursi",
          "1 set alat-alat prasmanan (roll toup) berikut 100 piring rotan & 100 sendok",
          "2 malam lampu penerang + jenset",
          "Set meja akad",
          "1 kipas blower"
        ]
      },
      {
        title: "Make-up & Busana",
        features: [
          "1x sepasang busana akad",
          "2x gaun resepsi",
          "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
          "1 set melati fresh",
          "1x makeup pengantin + touch up",
          "1x makeup dan busana ibu hajat + besan",
          "Beskap bapa hajat & besan",
          "4 makeup dan busana pagar ayu"
        ]
      },
      {
        title: "Dokumentasi",
        features: ["1 album wedding magnetik", "Cetak 100 foto + file"]
      },
      {
        title: "Bonus Free",
        free: true,
        features: ["Softlens pengantin", "Henna + nail art pengantin", "Makeup dewasa 2", "Makeup anak 2"]
      }
    ]
  },
  {
    name: "Gold",
    price: "Rp 20.000.000",
    featured: true,
    sections: [
      {
        title: "Dekorasi",
        features: [
          "Pelaminan 8 meter",
          "Rangkaian bunga imitasi premium",
          "Lorong masuk",
          "Foto booth",
          "2 kotak uang",
          "1 meja penerima tamu",
          "1 gapura pintu masuk",
          "8 lokal tenda (model menyesuaikan tema)",
          "100 pcs kursi tamu + 100 pcs sarung kursi",
          "1 set alat-alat prasmanan (roll toup) berikut 100 piring rotan & 100 sendok",
          "2 malam lampu penerang + jenset",
          "Set meja akad",
          "2 kipas blower",
          "Karpet jalan 20 meter"
        ]
      },
      {
        title: "Make-up & Busana",
        features: [
          "1x sepasang busana akad",
          "2x gaun resepsi",
          "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
          "1 set melati fresh",
          "1x makeup pengantin + touch up",
          "1x makeup dan busana ibu hajat + besan",
          "Beskap bapa hajat & besan",
          "4 makeup dan busana pagar ayu",
          "2 pagar bagus"
        ]
      },
      {
        title: "Dokumentasi",
        features: ["1 album wedding magnetik", "Cetak 100 foto + file", "Video liputan 2 disk"]
      },
      {
        title: "Include & Bonus",
        free: true,
        features: ["1 MC Akad", "Softlens pengantin", "Henna + nail art pengantin", "Makeup dewasa 2", "Pelepasan balon"]
      }
    ]
  },
  {
    name: "Platinum",
    price: "Rp 35.000.000",
    sections: [
      {
        title: "Dekorasi",
        features: [
          "Pelaminan 8 meter",
          "Rangkaian bunga imitasi premium",
          "Lorong masuk",
          "Foto booth",
          "2 kotak uang",
          "2 meja penerima tamu",
          "1 gapura pintu masuk",
          "9 lokal tenda (model menyesuaikan tema)",
          "100 pcs kursi tamu + 100 pcs sarung kursi",
          "1 set alat-alat prasmanan (roll toup) berikut 100 piring rotan & 100 sendok",
          "2 malam lampu penerang + jenset",
          "Set meja akad",
          "2 kipas blower",
          "Karpet merah 30 meter",
          "2 meja VIP"
        ]
      },
      {
        title: "Make-up & Busana",
        features: [
          "1x sepasang busana akad",
          "2x gaun resepsi",
          "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
          "1 set melati fresh",
          "1x makeup pengantin + touch up",
          "1x makeup dan busana ibu hajat + besan",
          "Beskap bapa hajat & besan",
          "6 makeup dan busana pagar ayu",
          "2 pagar bagus"
        ]
      },
      {
        title: "Dokumentasi",
        features: [
          "Cetak 1 album magazine + file editing (1 flashdisk)",
          "Cetak 1 album magnetik",
          "Video sinematik",
          "Video liputan",
          "Video on flashdisk"
        ]
      },
      {
        title: "Include & Bonus",
        free: true,
        features: [
          "1 MC Akad",
          "4 Crew WO",
          "Softlens pengantin",
          "Henna + nail art pengantin",
          "Makeup dewasa 2",
          "Makeup anak 2",
          "Pelepasan balon"
        ]
      }
    ]
  },
  {
    name: "Exclusive",
    price: "Rp 45.000.000",
    sections: [
      {
        title: "Dekorasi",
        features: [
          "Pelaminan 10 meter",
          "Rangkaian bunga imitasi premium",
          "Lorong masuk",
          "Foto booth",
          "2 kotak uang",
          "2 meja penerima tamu",
          "1 gapura pintu masuk",
          "10 lokal tenda (model menyesuaikan tema)",
          "100 pcs kursi tamu + 100 pcs sarung kursi",
          "1 set alat-alat prasmanan (roll toup) berikut 150 piring rotan & 150 sendok",
          "2 malam lampu penerang + jenset",
          "1 Set meja akad Exclusive",
          "3 kipas blower",
          "Karpet jalan 40 meter",
          "2 meja VIP",
          "2 meja hidangan tambahan"
        ]
      },
      {
        title: "Make-up & Busana",
        features: [
          "1x sepasang busana akad",
          "2x gaun resepsi",
          "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
          "1 set melati fresh",
          "1x makeup pengantin + touch up",
          "1x makeup dan busana ibu hajat + besan",
          "Beskap bapa hajat & besan",
          "6 makeup dan busana pagar ayu",
          "4 makeup keluarga",
          "2 pagar bagus"
        ]
      },
      {
        title: "Dokumentasi",
        features: [
          "Cetak 1 album magazine + file editing (1 flashdisk)",
          "Cetak 1 album magnetik",
          "Video sinematik",
          "Video liputan",
          "Video on flashdisk"
        ]
      },
      {
        title: "Include & Bonus",
        free: true,
        features: [
          "1 MC Akad",
          "4 Crew WO",
          "Pemandu siraman",
          "Softlens pengantin",
          "Henna + nail art pengantin",
          "Makeup dewasa 2",
          "Makeup anak 2",
          "Pelepasan balon"
        ]
      }
    ]
  }
];

// FAQs definition
const faqs = [
  {
    question: "Apakah paket pernikahan bisa disesuaikan kembali?",
    answer: "Ya, tentu saja. Semua paket yang kami tawarkan fleksibel dan dapat disesuaikan kembali dengan konsep impian, kuantitas tamu, maupun anggaran pernikahan Anda. Hubungi kami untuk berkonsultasi secara personal."
  },
  {
    question: "Bagaimana mekanisme pembayaran dan DP di Royani Wedding?",
    answer: "Mekanisme pembayaran sangat mudah dan bertahap. Untuk mengamankan tanggal pernikahan (booking date), Anda cukup membayar Down Payment (DP) awal yang disepakati. Sisa pembayaran dapat dicicil hingga pelunasan menjelang hari H."
  },
  {
    question: "Apakah melayani jasa pernikahan di luar wilayah Majalengka?",
    answer: "Ya, kami melayani wilayah Majalengka serta wilayah sekitar seperti Cirebon, Kuningan, Indramayu, dan daerah sekitarnya. Tergantung lokasi, mungkin terdapat sedikit penyesuaian biaya transportasi."
  },
  {
    question: "Berapa lama persiapan minimal sebelum memesan (booking)?",
    answer: "Waktu ideal adalah 3 hingga 6 bulan sebelum acara pernikahan. Hal ini sangat penting terutama di bulan-bulan padat (wedding season) agar tim dekorasi, MUA, dan logistik kami dapat mempersiapkan segala detailnya dengan matang."
  }
];

export default function Home() {
  // Navigation active links state
  const [activeSection, setActiveSection] = useState("home");
  const [navScrolled, setNavScrolled] = useState(false);
  const [hamburgerActive, setHamburgerActive] = useState(false);

  // Dynamic data from Firestore (with fallbacks)
  const [portfolioItems, setPortfolioItems] = useState(fallbackPortfolioItems);
  const [akadPkgs, setAkadPkgs] = useState<PricingPackage[]>(akadPackages);
  const [lengkapPkgs, setLengkapPkgs] = useState<PricingPackage[]>(lengkapPackages);
  const [faqItems, setFaqItems] = useState(faqs);

  const [heroContent, setHeroContent] = useState({
    subtitle: "WEDDING ORGANIZER",
    title_first: "Royani",
    title_second: "Wedding",
    description: "Mewujudkan hari spesial Anda menjadi sempurna, berkesan, dan elegan lewat layanan profesional kami.",
    cta_text: "Konsultasi Gratis",
    scroll_text: "Scroll untuk melihat galeri",
    bg_image_url: "/images/bg-hero.jpg",
    parallax_image_url: "/images/bg-divider.jpg",
    parallax_quote: "Cinta tidak hanya tentang saling memandang, melainkan bersama-sama melihat ke satu arah yang sama dengan komitmen dan ketulusan abadi."
  });

  const [aboutContent, setAboutContent] = useState({
    tag: "TENTANG KAMI",
    title_first: "Mewujudkan Momen",
    title_highlight: "Paling Berharga",
    paragraph_1: "Royani Wedding adalah mitra wedding organizer profesional di Majalengka yang berdedikasi tinggi untuk mewujudkan konsep pernikahan impian Anda. Kami memadukan nilai artistik dan detail organisasi terbaik demi kenyamanan seluruh rangkaian acara Anda.",
    paragraph_2: "Dari konsep tata rias anggun, dekorasi megah, hingga pengaturan alur acara di lapangan, kami memberikan sentuhan elegan dan perhatian penuh di setiap detiknya.",
    quote: "\"Pernikahan adalah simfoni cinta yang diabadikan dalam janji suci. Kami hadir untuk memastikan simfoni tersebut mengalun sempurna.\"",
    image_url: "/images/hero-1.jpg",
    metrics: [
      { value: "500+", label: "Acara Sukses" },
      { value: "50+", label: "Mitra Vendor Terbaik" },
      { value: "8+", label: "Tahun Pengalaman" }
    ]
  });

  const [contactContent, setContactContent] = useState({
    tag: "KONSULTASI GRATIS",
    title_first: "Mari Rencanakan",
    title_highlight: "Hari Spesial Anda",
    description: "Konsultasikan konsep pernikahan impian Anda bersama tim kami. Kami siap memberikan solusi terbaik sesuai dengan anggaran dan kebutuhan Anda.",
    whatsapp_number: "+62 878 4722 2209",
    address: "Blok Rabu RT.03/RW.02 No.81, Beusi, Ligung, Majalengka",
    maps_url: "https://maps.app.goo.gl/kioYwz4396tGzD8b9",
    maps_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1154.5123991206124!2d108.2721081!3d-6.6669931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ede115166299b%3A0xe54c86e245a4ecb4!2sRoyani%20Wedding!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
    form_tag: "HUBUNGI KAMI",
    form_title: "Tinggalkan Pesan",
    form_description: "Isi form di bawah ini dan tim kami akan segera menghubungi Anda melalui WhatsApp."
  });

  const [socialMedia, setSocialMedia] = useState({
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
  });

  const [footerContent, setFooterContent] = useState({
    description: "Wedding organizer profesional di Majalengka, Cirebon, Indramayu dan sekitarnya. Mewujudkan pernikahan impian dengan sentuhan elegan dan layanan paripurna.",
    copyright: "© 2024 Royani Wedding. Seluruh hak cipta dilindungi.",
    logo_url: ""
  });

  // Fetch data from Firestore
  useEffect(() => {
    async function fetchData() {
      const minDelay = new Promise(resolve => setTimeout(resolve, 1000));
      const dataFetch = (async () => {
        try {
          // Portfolio
        const portQ = query(collection(db, "portfolio_items"), orderBy("sort_order"));
        const portSnap = await getDocs(portQ);
        if (!portSnap.empty) {
          const items = portSnap.docs
            .filter(d => d.data().is_active !== false)
            .map((d, idx) => ({ 
              ...d.data(), 
              id: idx, 
              src: d.data().image_url || fallbackPortfolioItems[idx % fallbackPortfolioItems.length].src, 
              gridClass: d.data().grid_class || "col-6" 
            } as typeof fallbackPortfolioItems[0]));
          if (items.length > 0) setPortfolioItems(items);
        }

        // Pricing packages
        const pkgQ = query(collection(db, "pricing_packages"), orderBy("sort_order"));
        const pkgSnap = await getDocs(pkgQ);
        if (!pkgSnap.empty) {
          const allPkgs = pkgSnap.docs
            .map(d => d.data())
            .filter(p => p.is_active !== false);
          const akad = allPkgs.filter(p => p.type === "akad").map(p => ({
            name: p.name, price: p.price, featured: p.featured || false,
            sections: (p.sections || []).map((s: { title: string; is_bonus: boolean; features: string[] }) => ({ title: s.title, free: s.is_bonus, features: s.features })),
          })) as PricingPackage[];
          const lengkap = allPkgs.filter(p => p.type === "lengkap").map(p => ({
            name: p.name, price: p.price, featured: p.featured || false,
            sections: (p.sections || []).map((s: { title: string; is_bonus: boolean; features: string[] }) => ({ title: s.title, free: s.is_bonus, features: s.features })),
          })) as PricingPackage[];
          if (akad.length > 0) setAkadPkgs(akad);
          if (lengkap.length > 0) setLengkapPkgs(lengkap);
        }

        // FAQs
        const faqQ = query(collection(db, "faqs"), orderBy("sort_order"));
        const faqSnap = await getDocs(faqQ);
        if (!faqSnap.empty) {
          const items = faqSnap.docs
            .map(d => d.data())
            .filter(f => f.is_active !== false)
            .map(f => ({ question: f.question, answer: f.answer }));
          if (items.length > 0) setFaqItems(items);
        }

        // Site Content
        const [heroSnap, aboutSnap, contactSnap, socialSnap, footerSnap, catSnap] = await Promise.all([
          getDoc(doc(db, "site_content", "hero")),
          getDoc(doc(db, "site_content", "about")),
          getDoc(doc(db, "site_content", "contact")),
          getDoc(doc(db, "site_content", "social_media")),
          getDoc(doc(db, "site_content", "footer")),
          getDoc(doc(db, "site_content", "portfolio_categories"))
        ]);

        if (heroSnap.exists()) {
          const data = heroSnap.data();
          setHeroContent(prev => ({ 
            ...prev, 
            ...data,
            bg_image_url: data.bg_image_url || prev.bg_image_url,
            parallax_image_url: data.parallax_image_url || prev.parallax_image_url
          }) as typeof heroContent);
        }
        if (aboutSnap.exists()) {
          const data = aboutSnap.data();
          setAboutContent(prev => ({
            ...prev,
            ...data,
            image_url: data.image_url || prev.image_url
          }) as typeof aboutContent);
        }
        if (contactSnap.exists()) setContactContent(contactSnap.data() as typeof contactContent);
        if (socialSnap.exists()) setSocialMedia(socialSnap.data() as typeof socialMedia);
        if (footerSnap.exists()) setFooterContent(footerSnap.data() as typeof footerContent);
        if (catSnap.exists() && catSnap.data().list) {
          setPortfolioCategories(["Semua", ...catSnap.data().list]);
        }

        } catch (err) {
          console.warn("Firestore fetch failed, using fallback data:", err);
        }
      })();

      await Promise.all([minDelay, dataFetch]);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Pricing tabs
  const [activePriceTab, setActivePriceTab] = useState<"akad" | "lengkap">("akad");
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [portfolioCategories, setPortfolioCategories] = useState<string[]>(["Semua", "Adat", "Resepsi", "Outdoor", "Kimono", "Dekorasi"]);

  const toggleCard = (pkgName: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [pkgName]: !prev[pkgName],
    }));
  };

  // Booking Modal
  const [selectedBookingPackage, setSelectedBookingPackage] = useState<PricingPackage | null>(null);
  const [bookingName, setBookingName] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingLocation, setBookingLocation] = useState("");
  const [bookingAddress, setBookingAddress] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");

  // FAQ states
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactDate, setContactDate] = useState("");
  const [contactPackage, setContactPackage] = useState("");
  const [contactNotes, setContactNotes] = useState("");

  // Preloader loading state
  const [isLoading, setIsLoading] = useState(true);

  // Refs for reveal elements (kept for backward compatibility, but we now use automatic query)
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  // Preloader timer is now handled in the main fetchData useEffect

  // Handle mobile back button for lightbox preview
  useEffect(() => {
    const handlePopState = () => {
      setLightboxIndex(null);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Scroll to top/home on page refresh/load
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Navigation scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setNavScrolled(true);
      } else {
        setNavScrolled(false);
      }

      const sections = ["home", "tentang", "dokumentasi", "harga", "faq", "sosial", "kontak"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reveal observer (Scroll entrance animation - dynamic class query)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -80px 0px" }
    );

    // Automatically observe all elements with .reveal class
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [selectedCategory, portfolioItems, akadPkgs, lengkapPkgs, activePriceTab]);

  // Particles generator (React implementation)
  const [particles, setParticles] = useState<{ left: string; size: string; duration: string; delay: string }[]>([]);
  useEffect(() => {
    const generated = Array.from({ length: 25 }).map(() => ({
      left: Math.random() * 100 + "%",
      size: Math.random() * 3 + 2 + "px",
      duration: Math.random() * 12 + 10 + "s",
      delay: Math.random() * 10 + "s",
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(generated);
  }, []);

  // Filtered portfolio
  const filteredPortfolio = selectedCategory === "Semua"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  // Helper to open lightbox
  const openLightbox = (id: number) => {
    const originalIndex = portfolioItems.findIndex(item => item.id === id);
    if (originalIndex !== -1) {
      setLightboxIndex(originalIndex);
      window.history.pushState({ lightboxOpen: true }, "");
    }
  };

  // Helper to close lightbox
  const closeLightbox = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLightboxIndex(null);
    if (window.history.state?.lightboxOpen) {
      window.history.back();
    }
  };

  const nextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prevIndex) => (prevIndex! + 1) % portfolioItems.length);
    }
  };

  const prevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prevIndex) => (prevIndex! - 1 + portfolioItems.length) % portfolioItems.length);
    }
  };

  // Close booking modal and reset values
  const closeBookingModal = () => {
    setSelectedBookingPackage(null);
    setBookingName("");
    setBookingDate("");
    setBookingLocation("");
    setBookingAddress("");
    setBookingNotes("");
  };

  // Compile WhatsApp booking template
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingPackage) return;

    const formattedMessage = `Halo Royani Wedding, saya ingin memesan paket pernikahan berikut:\n\n` +
      `*Detail Paket:* ${selectedBookingPackage.name} (${selectedBookingPackage.price})\n` +
      `*Nama Lengkap:* ${bookingName}\n` +
      `*Tanggal Acara:* ${bookingDate}\n` +
      `*Lokasi Acara:* ${bookingLocation}\n` +
      `*Alamat Lengkap:* ${bookingAddress}\n` +
      `*Catatan/Permintaan:* ${bookingNotes || "-"}\n\n` +
      `Mohon diinformasikan langkah selanjutnya. Terima kasih!`;

    const parsedWaNumber = contactContent.whatsapp_number.replace(/[^0-9]/g, "").replace(/^0/, "62").startsWith("62") ? contactContent.whatsapp_number.replace(/[^0-9]/g, "").replace(/^0/, "62") : contactContent.whatsapp_number;
    const waUrl = `https://wa.me/${parsedWaNumber}?text=${encodeURIComponent(formattedMessage)}`;
    window.open(waUrl, "_blank");
    closeBookingModal();
  };

  // Compile general contact form submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage = `Halo Royani Wedding, saya ingin bertanya tentang paket pernikahan:\n\n` +
      `*Nama Lengkap:* ${contactName}\n` +
      `*Rencana Tanggal:* ${contactDate || "-"}\n` +
      `*Paket yang Diminati:* ${contactPackage || "-"}\n` +
      `*Pertanyaan/Catatan:* ${contactNotes}\n\n` +
      `Mohon informasinya lebih lanjut. Terima kasih!`;

    const parsedWaNumber = contactContent.whatsapp_number.replace(/[^0-9]/g, "").replace(/^0/, "62").startsWith("62") ? contactContent.whatsapp_number.replace(/[^0-9]/g, "").replace(/^0/, "62") : contactContent.whatsapp_number;
    const waUrl = `https://wa.me/${parsedWaNumber}?text=${encodeURIComponent(formattedMessage)}`;
    window.open(waUrl, "_blank");

    // Reset form
    setContactName("");
    setContactDate("");
    setContactPackage("");
    setContactNotes("");
  };

  // Simple anchor scroll implementation for React
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setHamburgerActive(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* HERO SECTION (PRESERVED) */}
      <section className="hero" id="home">
        <div className="hero-bg">
          <img
            src={heroContent.bg_image_url || "/images/bg-hero.jpg"}
            alt="Royani Wedding Background"
            fetchPriority="high"
            loading="eager"
            onError={(e) => { e.currentTarget.src = "/images/bg-hero.jpg"; }}
          />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-subtitle">{heroContent.subtitle}</p>
          <h1 className="hero-title">
            {heroContent.title_first} <span>{heroContent.title_second}</span>
          </h1>
          <p className="hero-desc">
            {heroContent.description}
          </p>
          <div className="hero-cta">
            <Link
              href="/harga"
              className="btn btn-primary"
            >
              {heroContent.cta_text}
            </Link>
          </div>
        </div>
        {/* Scroll Down Indicator */}
        <a
          href="#tentang"
          onClick={(e) => scrollTo(e, "tentang")}
          className="hero-scroll-indicator"
        >
          <span className="scroll-text">{heroContent.scroll_text}</span>
          <div className="scroll-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="7 13 12 18 17 13" />
              <polyline points="7 6 12 11 17 6" />
            </svg>
          </div>
        </a>
      </section>

      

      {/* ABOUT SECTION (EDITORIAL OVERHAUL) */}
      <section id="tentang">
        <div className="glow-spot" style={{ top: "10%", left: "5%" }} />
        <div className="about-grid">
          <div
            className="about-image-wrapper reveal"
            ref={(el) => { if (el) revealRefs.current[0] = el; }}
          >
            <div className="about-frame">
              <img 
                src={aboutContent.image_url} 
                alt="Royani Wedding Setup" 
                onError={(e) => { e.currentTarget.src = "/images/about.jpg"; }} 
              />
            </div>
            {/* Elegant overlapping quote card */}
            <div className="about-floating-quote">
              <p>&ldquo;{aboutContent.quote}&rdquo;</p>
            </div>
          </div>
          <div
            className="about-text reveal"
            ref={(el) => { if (el) revealRefs.current[1] = el; }}
          >
            <span className="section-tag">{aboutContent.tag}</span>
            <h2 className="section-title">
              {aboutContent.title_first} <span>{aboutContent.title_highlight}</span>
            </h2>
            <p style={{ textAlign: "justify" }}>
              {aboutContent.paragraph_1}
            </p>
            <p style={{ textAlign: "justify" }}>
              {aboutContent.paragraph_2}
            </p>
            <div className="about-metrics">
              {aboutContent.metrics.map((metric, idx) => (
                <div key={idx} className="metric-item reveal" style={{ transitionDelay: `${0.1 * (idx + 1)}s` }}>
                  <div className="metric-num">{metric.value}</div>
                  <div className="metric-label">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARALLAX QUOTE DIVIDER */}
      <div className="parallax-divider">
        <div
          className="parallax-bg"
          style={{ backgroundImage: `url('${heroContent.parallax_image_url || "/images/bg-divider.jpg"}')` }}
        />
        <p>
          &ldquo;{heroContent.parallax_quote || "Cinta tidak hanya tentang saling memandang, melainkan bersama-sama melihat ke satu arah yang sama dengan komitmen dan ketulusan abadi."}&rdquo;
        </p>
      </div>

      

      

      

      {/* FAQ SECTION (LEFT ACCENT ACCORDION) */}
      <section id="faq">
        <div className="glow-spot" style={{ bottom: "10%", right: "10%" }} />
        <div style={{ textAlign: "center" }}>
          <span
            className="section-tag reveal"
            ref={(el) => { if (el) revealRefs.current[20] = el; }}
          >
            Tanya Jawab
          </span>
          <h2
            className="section-title reveal"
            ref={(el) => { if (el) revealRefs.current[21] = el; }}
          >
            Pertanyaan <span>Populer</span>
          </h2>
          <p
            className="section-desc reveal"
            style={{ margin: "0 auto 80px" }}
            ref={(el) => { if (el) revealRefs.current[22] = el; }}
          >
            Berikut adalah tanggapan atas beberapa pertanyaan yang paling sering diajukan calon pengantin kami.
          </p>
        </div>

        <div className="faq-grid">
          {faqItems.map((faq, idx) => (
            <div
              key={idx}
              className="reveal"
              style={{ transitionDelay: `${idx * 0.08}s`, width: "100%" }}
            >
              <div className={`faq-item ${activeFaqIndex === idx ? "active" : ""}`}>
                <button
                  className="faq-question"
                  onClick={() => setActiveFaqIndex(activeFaqIndex === idx ? null : idx)}
                >
                  <span>{faq.question}</span>
                  <div className="faq-icon-wrapper">
                    <svg width="12" height="12" viewBox="0 0 12 12">
                      <path d="M11 5H7V1c0-.55-.45-1-1-1s-1 .45-1 1v4H1c-.55 0-1 .45-1 1s.45 1 1 1h4v4c0 .55.45 1 1 1s1-.45 1-1V7h4c.55 0 1-.45 1-1s-.45-1-1-1z" />
                    </svg>
                  </div>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      

      {/* SOSIAL MEDIA */}
      <section className="sosial-section" id="sosial">
        <span
          className="section-tag reveal"
          ref={(el) => { if (el) revealRefs.current[24] = el; }}
        >
          Sosial Media
        </span>
        <h2
          className="section-title reveal"
          ref={(el) => { if (el) revealRefs.current[25] = el; }}
        >
          {socialMedia.title_first} <span>{socialMedia.title_highlight}</span>
        </h2>
        <p
          className="section-desc reveal"
          style={{ margin: "0 auto 80px" }}
          ref={(el) => { if (el) revealRefs.current[26] = el; }}
        >
          {socialMedia.description}
        </p>

        <div className="sosial-grid">
          {socialMedia.items.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              className="sosial-card reveal"
              style={{ transitionDelay: `${0.1 * (idx + 1)}s` }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="sosial-card-icon-wrapper">
                {item.platform.toLowerCase() === "instagram" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather-icon">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                )}
                {item.platform.toLowerCase() === "tiktok" && (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="feather-icon">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                )}
                {item.platform.toLowerCase() === "facebook" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather-icon">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                )}
                {item.platform.toLowerCase() === "whatsapp" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather-icon">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                )}
              </div>
              <span>{item.platform}</span>
            </a>
          ))}
        </div>
      </section>

      

      {/* CONTACT & DETAILED QUERY FORM (INLINE PREMIUM OVERHAUL) */}
      <section id="kontak">
        <div className="glow-spot" style={{ top: "30%", left: "5%" }} />
        <div className="contact-section-grid">
          <div
            className="contact-info-wrapper reveal"
            ref={(el) => { if (el) revealRefs.current[28] = el; }}
          >
            <span className="section-tag">{contactContent.tag}</span>
            <h2 className="section-title">
              {contactContent.title_first} <span>{contactContent.title_highlight}</span>
            </h2>
            <p className="contact-intro-text">
              {contactContent.description}
            </p>

            <div className="contact-minimal-list">
              <a
                href={contactContent.whatsapp_number.replace(/[^0-9]/g, "").replace(/^0/, "62").startsWith("62") ? `https://wa.me/${contactContent.whatsapp_number.replace(/[^0-9]/g, "").replace(/^0/, "62")}` : `https://wa.me/${contactContent.whatsapp_number}`}
                className="contact-minimal-item reveal"
                style={{ transitionDelay: "0.1s" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="contact-minimal-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <div className="contact-minimal-text">
                  <span className="contact-item-label">WhatsApp Chat</span>
                  <span className="contact-item-value">{contactContent.whatsapp_number}</span>
                </div>
              </a>
              <a
                href={contactContent.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-minimal-item reveal"
                style={{ transitionDelay: "0.2s" }}
              >
                <div className="contact-minimal-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="contact-minimal-text">
                  <span className="contact-item-label">Lokasi Galeri</span>
                  <span className="contact-item-value">{contactContent.address}</span>
                </div>
              </a>
            </div>

            {/* Location Map Premium Wrapper */}
            <div className="contact-map-card reveal" style={{ transitionDelay: "0.3s" }}>
              <div className="map-frame">
                <iframe
                  title="Royani Wedding Gallery Majalengka Map"
                  className="map-premium-iframe"
                  src={contactContent.maps_embed_url}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="map-caption">
                <span className="map-caption-icon">✦</span>
                <span className="map-caption-text">Galeri Utama & Workshop Royani Wedding</span>
              </div>
            </div>
          </div>

          {/* Contact Form Container (INLINE UNDERLINES) */}
          <div
            className="contact-form-premium reveal"
            ref={(el) => { if (el) revealRefs.current[29] = el; }}
          >
            <div className="form-premium-header">
              <span className="form-premium-subtitle">{contactContent.form_tag}</span>
              <h3>{contactContent.form_title}</h3>
              <p>{contactContent.form_description}</p>
            </div>
            <form onSubmit={handleContactSubmit}>
              <div className="form-group-premium">
                <input
                  id="contact-name"
                  type="text"
                  className="form-input-premium"
                  required
                  placeholder=" "
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
                <label htmlFor="contact-name" className="form-label-premium">Nama Lengkap Anda</label>
              </div>
              <div className="form-group-premium">
                <input
                  id="contact-date"
                  type="date"
                  className="form-input-premium"
                  placeholder=" "
                  value={contactDate}
                  onChange={(e) => setContactDate(e.target.value)}
                />
                <label htmlFor="contact-date" className="form-label-premium">Rencana Tanggal Acara</label>
              </div>
              <div className="form-group-premium">
                <select
                  id="contact-select-package"
                  className="form-input-premium"
                  value={contactPackage}
                  onChange={(e) => setContactPackage(e.target.value)}
                  style={{ background: "var(--background)", color: "var(--text-primary)" }}
                >
                  <option value="" disabled hidden></option>
                  <option value="Paket Akad 1 (Rp 2.500.000)">Paket Akad 1 (Rp 2.500.000)</option>
                  <option value="Paket Akad 2 (Rp 1.700.000)">Paket Akad 2 (Rp 1.700.000)</option>
                  <option value="Paket Lengkap Minimalis (Rp 6.000.000)">Paket Lengkap Minimalis (Rp 6.000.000)</option>
                  <option value="Paket Lengkap Ekonomis (Rp 9.500.000)">Paket Lengkap Ekonomis (Rp 9.500.000)</option>
                  <option value="Paket Lengkap Standar 1 (Rp 13.500.000)">Paket Lengkap Standar 1 (Rp 13.500.000)</option>
                  <option value="Paket Lengkap Standar 2 (Rp 15.500.000)">Paket Lengkap Standar 2 (Rp 15.500.000)</option>
                  <option value="Paket Lengkap Silver (Rp 17.500.000)">Paket Lengkap Silver (Rp 17.500.000)</option>
                  <option value="Paket Lengkap Gold (Rp 20.000.000)">Paket Lengkap Gold (Rp 20.000.000)</option>
                  <option value="Paket Lengkap Platinum (Rp 35.000.000)">Paket Lengkap Platinum (Rp 35.000.000)</option>
                  <option value="Paket Lengkap Exclusive (Rp 45.000.000)">Paket Lengkap Exclusive (Rp 45.000.000)</option>
                </select>
                <label htmlFor="contact-select-package" className="form-label-premium">Paket Pernikahan yang Diminati</label>
              </div>
              <div className="form-group-premium">
                <textarea
                  id="contact-msg"
                  className="form-input-premium"
                  rows={3}
                  required
                  placeholder=" "
                  value={contactNotes}
                  onChange={(e) => setContactNotes(e.target.value)}
                  style={{ resize: "none" }}
                />
                <label htmlFor="contact-msg" className="form-label-premium">Detail Impian & Rencana Acara Anda</label>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "12px" }}>
                Kirim via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      </>
  );
}
