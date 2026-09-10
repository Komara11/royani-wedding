"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getContact } from "@/app/actions";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════
   NAVBAR — Fixed sticky with glass morphism
   ═══════════════════════════════════════════ */
export function Navbar() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = hamburgerActive ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [hamburgerActive]);

  const getActiveClass = (path: string) => {
    if (path === "/" && pathname === "/") return "active";
    if (path !== "/" && pathname?.startsWith(path)) return "active";
    return "";
  };

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/#tentang", label: "Tentang" },
    { href: "/#layanan", label: "Layanan" },
    { href: "/harga", label: "Paket Harga" },
    { href: "/dokumentasi", label: "Dokumentasi" },
    { href: "/#testimoni", label: "Testimoni" },
    { href: "/#kontak", label: "Kontak" },
  ];

  return (
    <nav className={navScrolled ? "scrolled" : ""}>
      <div className="nav-container">
        <Link href="/" className="nav-logo" onClick={() => setHamburgerActive(false)}>
          <img src="/logo.png" alt="Royani Wedding" loading="eager" decoding="async" />
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links-desktop">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={getActiveClass(link.href)}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://wa.me/6287847222209?text=Halo%20Royani%20Wedding%2C%20saya%20ingin%20berkonsultasi%20mengenai%20rencana%20pernikahan%20saya."
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
            >
              Konsultasi
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className={`hamburger ${hamburgerActive ? "active" : ""}`}
          onClick={() => setHamburgerActive(!hamburgerActive)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {hamburgerActive && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul
              className="mobile-nav-links"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 + i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    className={getActiveClass(link.href)}
                    onClick={() => setHamburgerActive(false)}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <a
                  href="https://wa.me/6287847222209?text=Halo%20Royani%20Wedding%2C%20saya%20ingin%20berkonsultasi."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-cta"
                  onClick={() => setHamburgerActive(false)}
                >
                  Konsultasi Gratis
                </a>
              </motion.li>
            </motion.ul>

            <div className="mobile-nav-footer">
              <p>WhatsApp: +62 878 4722 2209</p>
              <p>Majalengka, Jawa Barat</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   FOOTER — 4-Column Premium Layout
   ═══════════════════════════════════════════ */
export function Footer() {
  const [contactContent, setContactContent] = useState({
    whatsapp_number: "+62 878 4722 2209",
    address: "Blok Rabu RT.03/RW.02 No.81, Beusi, Ligung, Majalengka",
  });

  useEffect(() => {
    async function fetchFooterData() {
      try {
        const contactData = await getContact();
        if (contactData) setContactContent((prev) => ({ ...prev, ...(contactData as any) }));
      } catch {
        // ignore
      }
    }
    fetchFooterData();
  }, []);

  const parseWa = (num: string) => {
    const p = num.replace(/[^0-9]/g, "").replace(/^0/, "62");
    return p.startsWith("62") ? p : num;
  };

  const waLink = `https://wa.me/${parseWa(contactContent.whatsapp_number)}?text=Halo%20Royani%20Wedding%2C%20saya%20ingin%20berkonsultasi%20mengenai%20rencana%20pernikahan%20saya.`;

  return (
    <>
      {/* Floating WhatsApp */}
      <a href={waLink} target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="WhatsApp Chat">
        <span className="wa-tooltip">Chat WhatsApp</span>
        <svg viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <footer className="footer-premium">
        <div className="footer-container">
          {/* Top: Brand + Tagline */}
          <div className="footer-top">
            <Link href="/" className="footer-logo-link">
              <img src="/logo.png" alt="Royani Wedding" className="footer-logo-img" loading="lazy" decoding="async" />
            </Link>
            <p className="footer-motto">Mewujudkan Hari Sempurna Anda</p>
          </div>

          <div className="footer-divider" />

          {/* Grid: 4 Columns */}
          <div className="footer-grid">
            <div className="footer-col">
              <h4>Tentang</h4>
              <p className="footer-desc">
                Wedding organizer profesional di Majalengka, Cirebon, Indramayu dan sekitarnya. Mewujudkan pernikahan impian dengan sentuhan elegan.
              </p>
            </div>

            <div className="footer-col">
              <h4>Navigasi</h4>
              <ul>
                <li><Link href="/">Beranda</Link></li>
                <li><Link href="/#tentang">Tentang</Link></li>
                <li><Link href="/#layanan">Layanan</Link></li>
                <li><Link href="/dokumentasi">Dokumentasi</Link></li>
                <li><Link href="/#kontak">Kontak</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Layanan</h4>
              <ul>
                <li>Rias & Busana</li>
                <li>Dekorasi Pelaminan</li>
                <li>Dokumentasi Foto & Video</li>
                <li>Entertainment & MC</li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Kontak</h4>
              <p>{contactContent.address}</p>
              <p style={{ marginTop: 8 }}>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="footer-wa-link">
                  {contactContent.whatsapp_number}
                </a>
              </p>
            </div>
          </div>

          <div className="footer-divider" />

          {/* Bottom */}
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Royani Wedding. Seluruh hak cipta dilindungi.</p>
            <p className="footer-attribution">
              Designed by{" "}
              <a href="https://www.clovercode.shop" target="_blank" rel="noopener noreferrer">
                CloverCode
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ═══════════════════════════════════════════
   PRELOADER — Elegant Fade-in/out
   ═══════════════════════════════════════════ */
export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`preloader ${!isLoading ? "fade-out" : ""}`}>
      <div className="preloader-content">
        <div className="preloader-logo">
          <img src="/logo.png" alt="Royani Wedding" loading="eager" decoding="async" />
        </div>
        <div className="preloader-title">Royani Wedding</div>
        <div className="preloader-subtitle">Wedding Organizer</div>
        <div className="preloader-spinner">
          <div className="spinner-line" />
        </div>
      </div>
    </div>
  );
}
