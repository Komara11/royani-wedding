"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getPackages, getFaqs, getContact } from "@/app/actions";

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
      try {
        // Fetch Packages
        const packages = await getPackages();
        const akad = packages.filter(p => p.type === "akad");
        const lengkap = packages.filter(p => p.type === "lengkap");

        if (akad.length > 0) setAkadPkgs(akad as any);
        if (lengkap.length > 0) setLengkapPkgs(lengkap as any);

        // Fetch FAQ
        const faqs = await getFaqs();
        if (faqs.length > 0) {
          setFaqItems(faqs);
        }

        // Fetch Contact Content for WhatsApp
        const contactData = await getContact();
        if (contactData) {
          setContactContent(contactData as any);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
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
      

      

      

      {/* PRICING SECTION (BROCHURE OVERHAUL) */}
      <section className="pricing page-top-padding" id="harga" style={{ maxWidth: "100%" }}>
        <div className="glow-spot" style={{ top: "20%", left: "20%" }} />
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0" }}>
          <div
            className="pricing-header reveal"
            ref={(el) => { if (el) revealRefs.current[7] = el; }}
          >
            <span className="section-tag">Daftar Paket</span>
            <h2 className="section-title">
              Investasi Hari <span>Bahagia</span>
            </h2>
            <p className="section-desc">
              Pilih paket penawaran terbaik kami yang sesuai dengan visi acara Anda. Tiap paket fleksibel dan dapat di-custom.
            </p>
          </div>

          {/* Pricing Tabs */}
          <div
            className="pricing-tabs reveal"
            ref={(el) => { if (el) revealRefs.current[8] = el; }}
          >
            <button
              className={`pricing-tab ${activePriceTab === "akad" ? "active" : ""}`}
              onClick={() => setActivePriceTab("akad")}
            >
              Paket Akad
            </button>
            <button
              className={`pricing-tab ${activePriceTab === "lengkap" ? "active" : ""}`}
              onClick={() => setActivePriceTab("lengkap")}
            >
              Paket Lengkap
            </button>
          </div>

          {/* Akad Grid */}
          <div className={`pricing-grid pricing-grid-akad ${activePriceTab === "akad" ? "active" : ""}`}>
            {akadPkgs.map((pkg, idx) => {
              const isExpanded = !!expandedCards[pkg.name];
              const totalFeaturesCount = pkg.sections.flatMap((s) => s.features).length;
              return (
                <div
                  key={idx}
                  className="price-card reveal"
                  ref={(el) => { if (el) revealRefs.current[9 + idx] = el; }}
                >
                  <div className="price-cat">Paket Akad</div>
                  <h3 className="price-name">{pkg.name}</h3>
                  <div className="price-amount">{pkg.price}</div>

                  {/* Highlights (visible when collapsed) */}
                  <div className={`price-highlights ${isExpanded ? "hidden" : ""}`}>
                    <ul className="price-features highlight-list">
                      {pkg.sections
                        .flatMap((s) => s.features)
                        .slice(0, 3)
                        .map((feat, fIdx) => (
                          <li key={fIdx}>
                            {feat}
                          </li>
                        ))}
                      {totalFeaturesCount > 3 && (
                        <li className="more-features-text">
                          + {totalFeaturesCount - 3} fasilitas lainnya
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Full Details (visible when expanded) */}
                  <div className={`price-details ${isExpanded ? "expanded" : ""}`}>
                    {pkg.sections.map((sec, sIdx) => (
                      <div key={sIdx} className="price-section">
                        <h4 className="price-section-title">{sec.title}</h4>
                        <ul className="price-features">
                          {sec.features.map((feat, fIdx) => (
                            <li key={fIdx} className={sec.free ? "free" : ""}>
                              {feat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Toggle Button */}
                  <button
                    className="btn-toggle-details"
                    onClick={() => toggleCard(pkg.name)}
                  >
                    {isExpanded ? (
                      <>
                        Sembunyikan Detail
                        <svg className="chevron-icon up" viewBox="0 0 24 24">
                          <path d="M7 14l5-5 5 5H7z" />
                        </svg>
                      </>
                    ) : (
                      <>
                        Lihat Detail Paket
                        <svg className="chevron-icon" viewBox="0 0 24 24">
                          <path d="M7 10l5 5 5-5H7z" />
                        </svg>
                      </>
                    )}
                  </button>

                  <button
                    className="btn-price"
                    onClick={() => setSelectedBookingPackage(pkg)}
                  >
                    Pilih Paket
                  </button>
                </div>
              );
            })}
          </div>

          {/* Lengkap Grid */}
          <div className={`pricing-grid pricing-grid-lengkap ${activePriceTab === "lengkap" ? "active" : ""}`}>
            {lengkapPkgs.map((pkg, idx) => {
              const isExpanded = !!expandedCards[pkg.name];
              const totalFeaturesCount = pkg.sections.flatMap((s) => s.features).length;
              return (
                <div
                  key={idx}
                  className={`price-card ${pkg.featured ? "featured" : ""} reveal`}
                  ref={(el) => { if (el) revealRefs.current[11 + idx] = el; }}
                >
                  <div className="price-cat">Paket Lengkap</div>
                  <h3 className="price-name">{pkg.name}</h3>
                  <div className="price-amount">{pkg.price}</div>

                  {/* Highlights (visible when collapsed) */}
                  <div className={`price-highlights ${isExpanded ? "hidden" : ""}`}>
                    <ul className="price-features highlight-list">
                      {pkg.sections
                        .flatMap((s) => s.features)
                        .slice(0, 3)
                        .map((feat, fIdx) => (
                          <li key={fIdx}>
                            {feat}
                          </li>
                        ))}
                      {totalFeaturesCount > 3 && (
                        <li className="more-features-text">
                          + {totalFeaturesCount - 3} fasilitas lainnya
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Full Details (visible when expanded) */}
                  <div className={`price-details ${isExpanded ? "expanded" : ""}`}>
                    {pkg.sections.map((sec, sIdx) => (
                      <div key={sIdx} className="price-section">
                        <h4 className="price-section-title">{sec.title}</h4>
                        <ul className="price-features">
                          {sec.features.map((feat, fIdx) => (
                            <li key={fIdx} className={sec.free ? "free" : ""}>
                              {feat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Toggle Button */}
                  <button
                    className="btn-toggle-details"
                    onClick={() => toggleCard(pkg.name)}
                  >
                    {isExpanded ? (
                      <>
                        Sembunyikan Detail
                        <svg className="chevron-icon up" viewBox="0 0 24 24">
                          <path d="M7 14l5-5 5 5H7z" />
                        </svg>
                      </>
                    ) : (
                      <>
                        Lihat Detail Paket
                        <svg className="chevron-icon" viewBox="0 0 24 24">
                          <path d="M7 10l5 5 5-5H7z" />
                        </svg>
                      </>
                    )}
                  </button>

                  <button
                    className="btn-price"
                    onClick={() => setSelectedBookingPackage(pkg)}
                  >
                    Pilih Paket
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOOKING MODAL */}
      {selectedBookingPackage && (
        <div className="booking-modal-backdrop" onClick={closeBookingModal}>
          <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
            <button className="booking-modal-close" onClick={closeBookingModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <h3>Booking {selectedBookingPackage.name}</h3>
            <p>Konfirmasi pilihan Anda ({selectedBookingPackage.price}) dengan mengisi form detail acara berikut.</p>
            <form onSubmit={handleBookingSubmit}>
              <div className="form-group-premium">
                <input
                  id="modal-name"
                  type="text"
                  className="form-input-premium"
                  required
                  placeholder=" "
                  value={bookingName}
                  onChange={(e) => setBookingName(e.target.value)}
                />
                <label htmlFor="modal-name" className="form-label-premium">Nama Lengkap Anda</label>
              </div>
              <div className="form-group-premium">
                <input
                  id="modal-date"
                  type="date"
                  className="form-input-premium"
                  required
                  placeholder=" "
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />
                <label htmlFor="modal-date" className="form-label-premium">Rencana Tanggal Acara</label>
              </div>
              <div className="form-group-premium">
                <input
                  id="modal-location"
                  type="text"
                  className="form-input-premium"
                  required
                  placeholder=" "
                  value={bookingLocation}
                  onChange={(e) => setBookingLocation(e.target.value)}
                />
                <label htmlFor="modal-location" className="form-label-premium">Lokasi Rencana Acara</label>
              </div>
              <div className="form-group-premium">
                <textarea
                  id="modal-address"
                  className="form-input-premium"
                  required
                  rows={2}
                  placeholder=" "
                  value={bookingAddress}
                  onChange={(e) => setBookingAddress(e.target.value)}
                  style={{ resize: "none" }}
                />
                <label htmlFor="modal-address" className="form-label-premium">Alamat Lengkap Anda</label>
              </div>
              <div className="form-group-premium">
                <textarea
                  id="modal-notes"
                  className="form-input-premium"
                  rows={2}
                  placeholder=" "
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  style={{ resize: "none" }}
                />
                <label htmlFor="modal-notes" className="form-label-premium">Catatan Kustomisasi (Opsional)</label>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "10px" }}>
                Kirim Booking ke WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

      

      

      

      </>
  );
}
