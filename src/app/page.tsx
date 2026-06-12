"use client";

import React, { useState, useEffect, useRef } from "react";

// Portfolio definition
const portfolioItems = [
  {
    id: 0,
    src: "/images/porto-1.jpg",
    title: "Pernikahan Andi & Sari",
    category: "Resepsi",
    location: "Grand Ballroom",
    gridClass: "col-4"
  },
  {
    id: 1,
    src: "/images/porto-2.jpg",
    title: "Pernikahan Rian & Dewi",
    category: "Outdoor",
    location: "Outdoor Garden",
    gridClass: "col-8"
  },
  {
    id: 2,
    src: "/images/porto-3.jpg",
    title: "Pernikahan Yoga & Putri",
    category: "Akad",
    location: "Gedung Serbaguna",
    gridClass: "col-6"
  },
  {
    id: 3,
    src: "/images/porto-4.jpg",
    title: "Pernikahan Dimas & Rina",
    category: "Resepsi",
    location: "Hotel Bintang 5",
    gridClass: "col-6"
  }
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
        features: ["Makeup Pengantin", "Busana Akad + Aksesoris", "Jas Pengantin Pria", "Sepatu Pria & Wanita", "Melati Segar"]
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
        features: ["Makeup Pengantin", "Busana Akad + Aksesoris", "Jas Pengantin Pria", "Sepatu Pria & Wanita", "Melati Segar"]
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
        features: ["Dekorasi Pelaminan Indoor"]
      },
      {
        title: "Make-up & Busana",
        features: ["1x Sepasang Busana Akad", "1x Gaun Resepsi Wanita", "1x Jas Resepsi Pria", "Sepasang Sepatu (Akad & Resepsi)", "1 Set Melati Segar", "1x Makeup Pengantin + Touch Up"]
      },
      {
        title: "Dokumentasi",
        features: ["Cetak 1 Album Magnetik 70 Lembar + Semua File Foto"]
      },
      {
        title: "Bonus Free",
        free: true,
        features: ["Softlens Pengantin", "Henna + Nail Art Pengantin", "Makeup Ibu Hajat"]
      }
    ]
  },
  {
    name: "Ekonomis",
    price: "Rp 9.500.000",
    sections: [
      {
        title: "Dekorasi",
        features: ["Pelaminan 4-5 Meter + 3 Kursi", "2 Kotak Uang Standar", "1 Meja Penerima Tamu", "4 Lokal Tenda", "100 Pcs Kursi Tamu", "1 Set Alat Prasmanan (100 Piring & Sendok)"]
      },
      {
        title: "Make-up & Busana",
        features: ["1x Sepasang Busana Akad", "1x Gaun Resepsi Wanita", "1x Jas Resepsi Pria", "Sepasang Sepatu (Akad & Resepsi)", "1 Set Melati Segar", "1x Makeup Pengantin + Touch Up", "1x Makeup & Busana Ibu Hajat", "Beskap Bapa Hajat", "4 Makeup & Busana Pagar Ayu"]
      },
      {
        title: "Dokumentasi",
        features: ["Cetak 1 Album Magnetik 70 Lembar + Semua File Foto"]
      },
      {
        title: "Bonus Free",
        free: true,
        features: ["Softlens Pengantin", "Henna + Nail Art Pengantin"]
      }
    ]
  },
  {
    name: "Standar 1",
    price: "Rp 13.500.000",
    sections: [
      {
        title: "Dekorasi",
        features: ["Pelaminan 6 Meter + 5 Kursi", "2 Kotak Uang Standar", "1 Meja Penerima Tamu", "1 Gapura Pintu Masuk", "2 Set Tenda", "100 Pcs Kursi Tamu", "1 Set Alat Prasmanan"]
      },
      {
        title: "Make-up & Busana",
        features: ["1x Sepasang Busana Akad", "2x Gaun Resepsi Wanita", "Sepasang Sepatu (Akad & Resepsi)", "1 Set Melati Segar", "1x Makeup Pengantin + Touch Up", "1x Makeup & Busana Ibu Hajat + Besan", "Beskap Bapa Hajat & Besan", "4 Makeup & Busana Pagar Ayu"]
      },
      {
        title: "Dokumentasi",
        features: ["1 Album Wedding Magnetik", "Cetak Foto 70 Lembar + File Foto"]
      },
      {
        title: "Bonus Free",
        free: true,
        features: ["Softlens Pengantin", "Henna + Nail Art Pengantin", "Makeup Anak (2 orang)"]
      }
    ]
  },
  {
    name: "Standar 2",
    price: "Rp 15.500.000",
    sections: [
      {
        title: "Dekorasi",
        features: ["Pelaminan 6 Meter + 5 Kursi", "Bunga Imitasi Premium", "2 Kotak Uang Standar", "1 Meja Penerima Tamu", "1 Gapura Pintu Masuk", "2 Set Tenda", "100 Kursi Tamu + Sarung Kursi", "1 Set Alat Prasmanan", "Lampu Penerang + Jenset (2 Malam)", "Set Meja Akad Lengkap", "1 Kipas Blower"]
      },
      {
        title: "Make-up & Busana",
        features: ["1x Sepasang Busana Akad", "2x Gaun Resepsi Wanita", "Sepasang Sepatu (Akad & Resepsi)", "1 Set Melati Segar", "1x Makeup Pengantin + Touch Up", "1x Makeup & Busana Ibu Hajat + Besan", "Beskap Bapa Hajat & Besan", "4 Makeup & Busana Pagar Ayu"]
      },
      {
        title: "Dokumentasi",
        features: ["1 Album Wedding Magnetik", "Cetak 100 Foto + File Foto"]
      },
      {
        title: "Bonus Free",
        free: true,
        features: ["Softlens Pengantin", "Henna + Nail Art Pengantin", "Makeup Anak (2 orang)"]
      }
    ]
  },
  {
    name: "Silver",
    price: "Rp 17.500.000",
    sections: [
      {
        title: "Dekorasi",
        features: ["Pelaminan 8 Meter + 5 Kursi", "Bunga Imitasi Premium", "2 Kotak Uang", "1 Meja Penerima Tamu", "1 Gapura Pintu Masuk", "7 Lokal Tenda", "100 Kursi Tamu + Sarung Kursi", "1 Set Alat Prasmanan Roll Top (100 Pcs)", "Lampu Penerang + Jenset (2 Malam)", "Set Meja Akad Lengkap", "1 Kipas Blower"]
      },
      {
        title: "Make-up & Busana",
        features: ["1x Sepasang Busana Akad", "2x Gaun Resepsi Wanita", "Sepasang Sepatu (Akad & Resepsi)", "1 Set Melati Segar", "1x Makeup Pengantin + Touch Up", "1x Makeup & Busana Ibu Hajat + Besan", "Beskap Bapa Hajat & Besan", "4 Makeup & Busana Pagar Ayu"]
      },
      {
        title: "Dokumentasi",
        features: ["1 Album Wedding Magnetik", "Cetak 100 Foto + File Foto"]
      },
      {
        title: "Bonus Free",
        free: true,
        features: ["Softlens Pengantin", "Henna + Nail Art Pengantin", "Makeup Dewasa (2 orang)", "Makeup Anak (2 orang)"]
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
        features: ["Pelaminan 8 Meter", "Bunga Imitasi Premium", "Lorong Masuk + Photo Booth", "2 Kotak Uang", "1 Meja Penerima Tamu", "1 Gapura Pintu Masuk", "8 Lokal Tenda", "100 Kursi Tamu + Sarung Kursi", "1 Set Alat Prasmanan Roll Top (100 Pcs)", "Lampu Penerang + Jenset (2 Malam)", "Set Meja Akad Lengkap", "2 Kipas Blower", "Karpet Jalan 20 Meter"]
      },
      {
        title: "Make-up & Busana",
        features: ["1x Sepasang Busana Akad", "2x Gaun Resepsi Wanita", "Sepasang Sepatu (Akad & Resepsi)", "1 Set Melati Segar", "1x Makeup Pengantin + Touch Up", "1x Makeup & Busana Ibu Hajat + Besan", "Beskap Bapa Hajat & Besan", "4 Makeup & Busana Pagar Ayu", "2 Pagar Bagus"]
      },
      {
        title: "Dokumentasi",
        features: ["1 Album Wedding Magnetik", "Cetak 100 Foto + File Foto", "Video Liputan 2 Disk"]
      },
      {
        title: "Include & Bonus",
        free: true,
        features: ["1 MC Akad", "Softlens Pengantin", "Henna + Nail Art Pengantin", "Makeup Dewasa (2 orang)", "Pelepasan Balon"]
      }
    ]
  },
  {
    name: "Platinum",
    price: "Rp 35.000.000",
    sections: [
      {
        title: "Dekorasi",
        features: ["Pelaminan 8 Meter", "Bunga Imitasi Premium", "Lorong Masuk + Photo Booth", "2 Kotak Uang", "2 Meja Penerima Tamu", "1 Gapura Pintu Masuk", "9 Lokal Tenda", "100 Kursi Tamu + Sarung Kursi", "1 Set Alat Prasmanan Roll Top (100 Pcs)", "Lampu Penerang + Jenset (2 Malam)", "Set Meja Akad Lengkap", "2 Kipas Blower", "Karpet Merah 30 Meter", "2 Meja VIP"]
      },
      {
        title: "Make-up & Busana",
        features: ["1x Sepasang Busana Akad", "2x Gaun Resepsi Wanita", "Sepasang Sepatu (Akad & Resepsi)", "1 Set Melati Segar", "1x Makeup Pengantin + Touch Up", "1x Makeup & Busana Ibu Hajat + Besan", "Beskap Bapa Hajat & Besan", "6 Makeup & Busana Pagar Ayu", "2 Pagar Bagus"]
      },
      {
        title: "Dokumentasi",
        features: ["Cetak 1 Album Magazine + File (Flashdisk)", "Cetak 1 Album Magnetik", "Video Sinematik", "Video Liputan", "Video di Flashdisk"]
      },
      {
        title: "Include & Bonus",
        free: true,
        features: ["1 MC Akad", "4 Crew WO", "Softlens Pengantin", "Henna + Nail Art Pengantin", "Makeup Dewasa (2 orang)", "Makeup Anak (2 orang)", "Pelepasan Balon"]
      }
    ]
  },
  {
    name: "Exclusive",
    price: "Rp 45.000.000",
    sections: [
      {
        title: "Dekorasi",
        features: ["Pelaminan 10 Meter", "Bunga Imitasi Premium", "Lorong Masuk + Photo Booth", "2 Kotak Uang", "2 Meja Penerima Tamu", "1 Gapura Pintu Masuk", "10 Lokal Tenda", "100 Kursi Tamu + Sarung Kursi", "1 Set Alat Prasmanan Roll Top (150 Pcs)", "Lampu Penerang + Jenset (2 Malam)", "Set Meja Akad Exclusive", "3 Kipas Blower", "Karpet Jalan 40 Meter", "2 Meja VIP", "2 Meja Hidangan Tambahan"]
      },
      {
        title: "Make-up & Busana",
        features: ["1x Sepasang Busana Akad", "2x Gaun Resepsi Wanita", "Sepasang Sepatu (Akad & Resepsi)", "1 Set Melati Segar", "1x Makeup Pengantin + Touch Up", "1x Makeup & Busana Ibu Hajat + Besan", "Beskap Bapa Hajat & Besan", "6 Makeup & Busana Pagar Ayu", "4 Makeup Keluarga", "2 Pagar Bagus"]
      },
      {
        title: "Dokumentasi",
        features: ["Cetak 1 Album Magazine + File (Flashdisk)", "Cetak 1 Album Magnetik", "Video Sinematik", "Video Liputan", "Video di Flashdisk"]
      },
      {
        title: "Include & Bonus",
        free: true,
        features: ["1 MC Akad", "4 Crew WO", "Pemandu Acara Siraman", "Softlens Pengantin", "Henna + Nail Art Pengantin", "Makeup Dewasa (2 orang)", "Makeup Anak (2 orang)", "Pelepasan Balon"]
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
    question: "Apakah melayani jasa pernikahan di luar wilayah Cirebon?",
    answer: "Ya, kami melayani wilayah Cirebon Raya (Kota & Kabupaten) serta wilayah sekitar seperti Kuningan, Majalengka, Indramayu (CIAYUMAJAKUNING), dan daerah sekitarnya. Tergantung lokasi, mungkin terdapat sedikit penyesuaian biaya transportasi."
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

  // Portfolio filters and states
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Pricing tabs
  const [activePriceTab, setActivePriceTab] = useState<"akad" | "lengkap">("akad");
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

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

  // Preloader timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1s loading display for smooth premium feeling
    return () => clearTimeout(timer);
  }, []);

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
  }, []);

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
      `*Catatan/Permintaan:* ${bookingNotes || "-"}\n\n` +
      `Mohon diinformasikan langkah selanjutnya. Terima kasih!`;

    const waUrl = `https://wa.me/6287847222209?text=${encodeURIComponent(formattedMessage)}`;
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

    const waUrl = `https://wa.me/6287847222209?text=${encodeURIComponent(formattedMessage)}`;
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
      {/* PRELOADER */}
      <div className={`preloader ${!isLoading ? "fade-out" : ""}`}>
        <div className="preloader-content">
          <div className="preloader-logo">
            <img src="/logo.png" alt="Royani Wedding Logo" />
          </div>
          <div className="preloader-title">Royani Wedding</div>
          <div className="preloader-spinner">
            <div className="spinner-line" />
          </div>
        </div>
      </div>

      {/* BACKGROUND FLOATING PARTICLES */}
      <div className="particles">
        {particles.map((p, idx) => (
          <div
            key={idx}
            className="particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animation: `floatParticle ${p.duration} linear ${p.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* NAVIGATION BAR */}
      <nav className={navScrolled ? "scrolled" : ""}>
        <a href="#" onClick={(e) => scrollTo(e, "home")} className="nav-logo">
          <img src="/logo.png" alt="Royani Wedding" style={{ display: 'block', height: '42px', width: 'auto' }} />
        </a>
        <button
          className={`hamburger ${hamburgerActive ? "active" : ""}`}
          onClick={() => setHamburgerActive(!hamburgerActive)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`nav-links ${hamburgerActive ? "active" : ""}`}>
          <li>
            <a
              href="#home"
              onClick={(e) => scrollTo(e, "home")}
              className={activeSection === "home" ? "active" : ""}
            >
              Beranda
            </a>
          </li>
          <li>
            <a
              href="#tentang"
              onClick={(e) => scrollTo(e, "tentang")}
              className={activeSection === "tentang" ? "active" : ""}
            >
              Tentang
            </a>
          </li>
          <li>
            <a
              href="#dokumentasi"
              onClick={(e) => scrollTo(e, "dokumentasi")}
              className={activeSection === "dokumentasi" ? "active" : ""}
            >
              Dokumentasi
            </a>
          </li>
          <li>
            <a
              href="#harga"
              onClick={(e) => scrollTo(e, "harga")}
              className={activeSection === "harga" ? "active" : ""}
            >
              Harga
            </a>
          </li>
          <li>
            <a
              href="#faq"
              onClick={(e) => scrollTo(e, "faq")}
              className={activeSection === "faq" ? "active" : ""}
            >
              FAQ
            </a>
          </li>
          <li>
            <a
              href="#sosial"
              onClick={(e) => scrollTo(e, "sosial")}
              className={activeSection === "sosial" ? "active" : ""}
            >
              Sosial Media
            </a>
          </li>
          <li>
            <a
              href="#kontak"
              onClick={(e) => scrollTo(e, "kontak")}
              className={activeSection === "kontak" ? "active" : ""}
            >
              Kontak
            </a>
          </li>
        </ul>
      </nav>

      {/* HERO SECTION (PRESERVED) */}
      <section className="hero" id="home">
        <div className="hero-bg">
          <img
            src="/images/bg-hero.jpg"
            alt="Royani Wedding Background"
            fetchPriority="high"
            loading="eager"
          />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-subtitle">Wedding Organizer</p>
          <h1 className="hero-title">
            Royani <span>Wedding</span>
          </h1>
          <p className="hero-desc">
            Mewujudkan hari spesial Anda menjadi sempurna, berkesan, dan elegan lewat layanan profesional kami.
          </p>
          <div className="hero-cta">
            <a
              href="#harga"
              onClick={(e) => scrollTo(e, "harga")}
              className="btn btn-primary"
            >
              Daftar Harga
            </a>
          </div>
        </div>

      </section>

      {/* SECTION DIVIDER ♦ */}
      <div className="gold-divider">
        <span>♦</span>
      </div>

      {/* ABOUT SECTION (EDITORIAL OVERHAUL) */}
      <section id="tentang">
        <div className="glow-spot" style={{ top: "10%", left: "5%" }} />
        <div className="about-grid">
          <div
            className="about-image-wrapper reveal"
            ref={(el) => { if (el) revealRefs.current[0] = el; }}
          >
            <div className="about-frame">
              <img src="/images/about.jpg" alt="Royani Wedding Setup" />
            </div>
            {/* Elegant overlapping quote card */}
            <div className="about-floating-quote">
              <p>&ldquo;Hari terindah adalah ketika janji suci terucap dan disaksikan oleh semesta dengan keanggunan abadi.&rdquo;</p>
              <span>— Rian & Dewi</span>
            </div>
          </div>
          <div
            className="about-text reveal"
            ref={(el) => { if (el) revealRefs.current[1] = el; }}
          >
            <span className="section-tag">Tentang Kami</span>
            <h2 className="section-title">
              Menciptakan Momen <span>Abadi</span>
            </h2>
            <p>
              Royani Wedding adalah mitra wedding organizer profesional di Cirebon yang berdedikasi tinggi untuk mewujudkan konsep pernikahan impian Anda. Kami memadukan nilai artistik dan detail organisasi terbaik demi kenyamanan seluruh rangkaian acara Anda.
            </p>
            <p>
              Dari konsep tata rias anggun, dekorasi megah, hingga pengaturan alur acara di lapangan, kami memberikan sentuhan elegan dan perhatian penuh di setiap detiknya.
            </p>
            <div className="about-metrics">
              <div className="metric-item reveal" style={{ transitionDelay: "0.1s" }}>
                <div className="metric-num">500+</div>
                <div className="metric-label">Acara Sukses</div>
              </div>
              <div className="metric-item reveal" style={{ transitionDelay: "0.2s" }}>
                <div className="metric-num">8+</div>
                <div className="metric-label">Tahun Kerja</div>
              </div>
              <div className="metric-item reveal" style={{ transitionDelay: "0.3s" }}>
                <div className="metric-num">99%</div>
                <div className="metric-label">Rating Puas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARALLAX QUOTE DIVIDER */}
      <div className="parallax-divider">
        <div
          className="parallax-bg"
          style={{ backgroundImage: "url('/images/bg-divider.jpg')" }}
        />
        <p>
          &ldquo;Cinta tidak hanya tentang saling memandang, melainkan bersama-sama melihat ke satu arah yang sama dengan komitmen dan ketulusan abadi.&rdquo;
        </p>
      </div>

      {/* SECTION DIVIDER ♦ */}
      <div className="gold-divider">
        <span>♦</span>
      </div>

      {/* PORTFOLIO SECTION (EDITORIAL MASONRY OVERHAUL) */}
      <section id="dokumentasi">
        <div className="glow-spot" style={{ top: "30%", right: "5%" }} />
        <span
          className="section-tag reveal"
          ref={(el) => { if (el) revealRefs.current[2] = el; }}
        >
          Dokumentasi
        </span>
        <h2
          className="section-title reveal"
          ref={(el) => { if (el) revealRefs.current[3] = el; }}
        >
          Karya & <span>Inspirasi</span>
        </h2>
        <p
          className="section-desc reveal"
          ref={(el) => { if (el) revealRefs.current[4] = el; }}
        >
          Tiap pernikahan menyimpan cerita unik. Berikut adalah beberapa momen penuh sukacita dan keindahan yang berhasil kami abadikan.
        </p>

        {/* Minimalist filters */}
        <div
          className="portfolio-filters reveal"
          ref={(el) => { if (el) revealRefs.current[5] = el; }}
        >
          {["Semua", "Akad", "Resepsi", "Outdoor"].map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div
          className="portfolio-grid"
        >
          {filteredPortfolio.map((item, idx) => (
            <div
              key={item.id}
              className={`portfolio-item ${item.gridClass} reveal`}
              style={{ transitionDelay: `${idx * 0.1}s` }}
              onClick={() => openLightbox(item.id)}
            >
              <img src={item.src} alt={item.title} />
              <div className="portfolio-overlay">
                <span className="portfolio-overlay-tag">{item.category}</span>
                <h4>{item.title}</h4>
                <p>{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <svg viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            Kembali
          </button>
          <button className="lightbox-nav prev" onClick={prevLightbox}>
            <svg viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={portfolioItems[lightboxIndex].src}
              alt={portfolioItems[lightboxIndex].title}
              className="lightbox-image"
            />
            <div className="lightbox-info">
              <h3>{portfolioItems[lightboxIndex].title}</h3>
              <p>{portfolioItems[lightboxIndex].category} &bull; {portfolioItems[lightboxIndex].location}</p>
            </div>
          </div>
          <button className="lightbox-nav next" onClick={nextLightbox}>
            <svg viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>
      )}

      {/* SECTION DIVIDER ♦ */}
      <div className="gold-divider">
        <span>♦</span>
      </div>

      {/* PRICING SECTION (BROCHURE OVERHAUL) */}
      <section className="pricing" id="harga" style={{ maxWidth: "100%" }}>
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
            {akadPackages.map((pkg, idx) => {
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
            {lengkapPackages.map((pkg, idx) => {
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

      {/* SECTION DIVIDER ♦ */}
      <div className="gold-divider">
        <span>♦</span>
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
          {faqs.map((faq, idx) => (
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

      {/* SECTION DIVIDER ♦ */}
      <div className="gold-divider">
        <span>♦</span>
      </div>

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
          Kunjungi Galeri <span>Digital</span>
        </h2>
        <p
          className="section-desc reveal"
          style={{ margin: "0 auto 80px" }}
          ref={(el) => { if (el) revealRefs.current[26] = el; }}
        >
          Ikuti akun sosial media resmi kami untuk info update, tips pranikah, dan portofolio harian terlengkap.
        </p>

        <div
          className="sosial-grid"
        >
          <a
            href="https://www.instagram.com/royani_wedding2"
            className="sosial-card reveal"
            style={{ transitionDelay: "0.1s" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="sosial-card-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather-icon">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
            <span>Instagram</span>
          </a>
          <a
            href="https://www.tiktok.com/@ceuroy"
            className="sosial-card reveal"
            style={{ transitionDelay: "0.2s" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="sosial-card-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="currentColor" className="feather-icon">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </div>
            <span>TikTok</span>
          </a>
          <a
            href="https://www.facebook.com/ceu.roy"
            className="sosial-card reveal"
            style={{ transitionDelay: "0.3s" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="sosial-card-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather-icon">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </div>
            <span>Facebook</span>
          </a>
        </div>
      </section>

      {/* SECTION DIVIDER ♦ */}
      <div className="gold-divider">
        <span>♦</span>
      </div>

      {/* CONTACT & DETAILED QUERY FORM (INLINE PREMIUM OVERHAUL) */}
      <section id="kontak">
        <div className="glow-spot" style={{ top: "30%", left: "5%" }} />
        <div className="contact-section-grid">
          <div
            className="contact-info-wrapper reveal"
            ref={(el) => { if (el) revealRefs.current[28] = el; }}
          >
            <span className="section-tag">Hubungi Kami</span>
            <h2 className="section-title">
              Mulai Konsultasi <span>Pernikahan Anda</span>
            </h2>
            <p className="contact-intro-text">
              Kami percaya setiap detail menceritakan kisah cinta unik Anda. Ceritakan konsep pernikahan impian Anda, dan mari kita wujudkan hari bahagia Anda menjadi kenyataan yang anggun dan tak terlupakan.
            </p>

             <div className="contact-minimal-list">
              <a
                href="https://wa.me/6287847222209"
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
                  <span className="contact-item-value">+62 878-4722-2209</span>
                </div>
              </a>

              <a
                href="mailto:royaniwedding2026@gmail.com"
                className="contact-minimal-item reveal"
                style={{ transitionDelay: "0.2s" }}
              >
                <div className="contact-minimal-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="contact-minimal-text">
                  <span className="contact-item-label">Surel / Email</span>
                  <span className="contact-item-value">royaniwedding2026@gmail.com</span>
                </div>
              </a>

              <div className="contact-minimal-item reveal" style={{ transitionDelay: "0.3s" }}>
                <div className="contact-minimal-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="contact-minimal-text">
                  <span className="contact-item-label">Lokasi Galeri</span>
                  <span className="contact-item-value">Cirebon, Jawa Barat, Indonesia</span>
                </div>
              </div>
            </div>

            {/* Location Map Premium Wrapper */}
            <div className="contact-map-card reveal" style={{ transitionDelay: "0.4s" }}>
              <div className="map-frame">
                <iframe
                  title="Royani Wedding Location Cirebon Map"
                  className="map-premium-iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.5862788339!2d108.47895055000002!3d-6.722622749999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2b68e1da415bd347%3A0xa193d0f0c0ae2f12!2sCirebon%2C%20Cirebon%20City%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
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
              <span className="form-premium-subtitle">Rencana Hari Bahagia</span>
              <h3>Kirim Pesan</h3>
              <p>Rencanakan konsep pernikahan impian Anda bersama konsultan wedding planner kami.</p>
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
                  style={{ background: "#0f0f0f", color: "var(--text-primary)" }}
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

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/6287847222209?text=Halo%20Royani%20Wedding%2C%20saya%20ingin%20berkonsultasi%20mengenai%20rencana%20pernikahan%20saya."
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label="WhatsApp Chat"
      >
        <span className="wa-tooltip">Chat WhatsApp</span>
        <svg viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* FOOTER */}
      <footer className="footer-premium">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" onClick={(e) => scrollTo(e, "home")} className="nav-logo">
                <img src="/logo.png" alt="Royani Wedding" style={{ display: 'block', height: '48px', width: 'auto' }} />
              </a>
              <p className="footer-tagline">
                Mewujudkan hari spesial Anda menjadi kenangan indah yang sempurna, berkesan, dan elegan lewat layanan profesional kami.
              </p>
            </div>
            
            <div className="footer-links">
              <h4>Navigasi</h4>
              <ul>
                <li><a href="#home" onClick={(e) => scrollTo(e, "home")}>Beranda</a></li>
                <li><a href="#tentang" onClick={(e) => scrollTo(e, "tentang")}>Tentang</a></li>
                <li><a href="#dokumentasi" onClick={(e) => scrollTo(e, "dokumentasi")}>Dokumentasi</a></li>
                <li><a href="#harga" onClick={(e) => scrollTo(e, "harga")}>Paket Harga</a></li>
              </ul>
            </div>

            <div className="footer-contact">
              <h4>Hubungi Kami</h4>
              <p>Cirebon, Jawa Barat, Indonesia</p>
              <p>WhatsApp: +62 878-4722-2209</p>
              <p>Email: royaniwedding2026@gmail.com</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Royani Wedding. Hak Cipta Dilindungi.</p>
            <p className="footer-attribution">
              Premium Design by{" "}
              <a
                href="https://www.clovercode.shop"
                target="_blank"
                rel="noopener noreferrer"
              >
                CloverCode
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
