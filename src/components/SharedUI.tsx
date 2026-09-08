"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getContact } from "@/app/actions";

export function Navbar() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const pathname = usePathname();
  const [logoUrl, setLogoUrl] = useState("/logo.png");

  useEffect(() => {
    async function fetchLogo() {
      try {
        const data = await getContact();
        // logo might be in footer content, but we just use default for now
      } catch (e) {
        // ignore
      }
    }
    fetchLogo();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getActiveClass = (path: string) => {
    if (path === "/" && pathname === "/") return "active";
    if (path !== "/" && pathname?.startsWith(path)) return "active";
    return "";
  };

  return (
    <nav className={navScrolled ? "scrolled" : ""}>
      <Link href="/" className="nav-logo" onClick={() => setHamburgerActive(false)}>
        <img src={logoUrl} alt="Royani Wedding Logo" style={{ display: 'block', height: '42px', width: 'auto' }} />
      </Link>
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
        <li><Link href="/" className={getActiveClass("/")} onClick={() => setHamburgerActive(false)}>Beranda</Link></li>
        <li><Link href="/dokumentasi" className={getActiveClass("/dokumentasi")} onClick={() => setHamburgerActive(false)}>Dokumentasi</Link></li>
        <li><Link href="/harga" className={getActiveClass("/harga")} onClick={() => setHamburgerActive(false)}>Harga</Link></li>
      </ul>
    </nav>
  );
}

export function Footer() {
  const [footerContent, setFooterContent] = useState({
    description: "Wedding organizer profesional di Majalengka, Cirebon, Indramayu dan sekitarnya.",
    copyright: "© 2024 Royani Wedding. Seluruh hak cipta dilindungi.",
    logo_url: "/logo.png"
  });
  const [contactContent, setContactContent] = useState({
    whatsapp_number: "+62 878 4722 2209",
    address: "Blok Rabu RT.03/RW.02 No.81, Beusi, Ligung, Majalengka"
  });

  useEffect(() => {
    async function fetchFooterData() {
      try {
        const contactData = await getContact();
        if (contactData) setContactContent(prev => ({ ...prev, ...(contactData as any) }));
      } catch (e) {
        // ignore
      }
    }
    fetchFooterData();
  }, []);

  const parseWa = (num: string) => {
    const p = num.replace(/[^0-9]/g, "").replace(/^0/, "62");
    return p.startsWith("62") ? p : num;
  };

  return (
    <>
      <a
        href={`https://wa.me/${parseWa(contactContent.whatsapp_number)}?text=Halo%20Royani%20Wedding%2C%20saya%20ingin%20berkonsultasi%20mengenai%20rencana%20pernikahan%20saya.`}
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

      <footer className="footer-premium">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" className="nav-logo">
                <img src={footerContent.logo_url || "/logo.png"} alt="Royani Wedding" style={{ display: 'block', height: '48px', width: 'auto' }} />
              </Link>
              <p className="footer-tagline">{footerContent.description}</p>
            </div>

            <div className="footer-links">
              <h4>Navigasi</h4>
              <ul>
                <li><Link href="/">Beranda</Link></li>
                <li><Link href="/dokumentasi">Dokumentasi</Link></li>
                <li><Link href="/harga">Paket Harga</Link></li>
              </ul>
            </div>

            <div className="footer-contact">
              <h4>Hubungi Kami</h4>
              <p>{contactContent.address}</p>
              <p>WhatsApp: {contactContent.whatsapp_number}</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>{footerContent.copyright}</p>
            <p className="footer-attribution">
              Premium Design by{" "}
              <a href="https://www.clovercode.shop" target="_blank" rel="noopener noreferrer">CloverCode</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  if (!isLoading) return null;
  return (
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
  );
}
