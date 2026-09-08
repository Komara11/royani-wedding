import os
import re

def patch_file(filepath, logic):
    with open(filepath, 'r') as f:
        content = f.read()
    new_content = logic(content)
    with open(filepath, 'w') as f:
        f.write(new_content)

# 1. Update src/app/page.tsx
def update_page_tsx(content):
    content = content.replace('import prisma from "@/lib/prisma";', 'import { getHero, getAbout, getContact, getSocialLinks } from "@/app/actions";')
    
    fetch_hero = """    async function fetchHero() {
      try {
        const data = await getHero();
        if (data) setHeroContent(data as any);
      } catch (err) {
        console.error("Error fetching hero:", err);
      }
    }"""
    content = re.sub(r'    async function fetchHero\(\) \{[\s\S]*?    \}', fetch_hero, content)

    fetch_about = """    async function fetchAbout() {
      try {
        const data = await getAbout();
        if (data) setAboutContent(data as any);
      } catch (err) {
        console.error("Error fetching about:", err);
      }
    }"""
    content = re.sub(r'    async function fetchAbout\(\) \{[\s\S]*?    \}', fetch_about, content)

    fetch_contact = """    async function fetchContact() {
      try {
        const data = await getContact();
        if (data) setContactContent(data as any);
      } catch (err) {
        console.error("Error fetching contact:", err);
      }
    }"""
    content = re.sub(r'    async function fetchContact\(\) \{[\s\S]*?    \}', fetch_contact, content)

    fetch_social = """    async function fetchSocial() {
      try {
        const data = await getSocialLinks();
        if (data) setSocialLinks(data as any);
      } catch (err) {
        console.error("Error fetching social:", err);
      }
    }"""
    content = re.sub(r'    async function fetchSocial\(\) \{[\s\S]*?    \}', fetch_social, content)

    return content

def update_dokumentasi(content):
    content = content.replace('import prisma from "@/lib/prisma";', 'import { getPortfolios, getPortfolioCategories } from "@/app/actions";')
    
    fetch_port = """    async function fetchPortfolio() {
      try {
        const items = await getPortfolios();
        const catData = await getPortfolioCategories();
        
        if (items.length > 0) setPortfolioItems(items as any);

        if (catData) {
          const c = (catData as any).list || [];
          setCategories(["All", ...c]);
        }
      } catch (err) {
        console.error("Error fetching portfolio:", err);
      } finally {
        setLoading(false);
      }
    }"""
    content = re.sub(r'    async function fetchPortfolio\(\) \{[\s\S]*?    \}', fetch_port, content)
    return content

def update_harga(content):
    content = content.replace('import prisma from "@/lib/prisma";', 'import { getPackages, getFaqs, getContact } from "@/app/actions";')
    
    fetch_data = """    async function fetchData() {
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
        setLoading(false);
      }
    }"""
    content = re.sub(r'    async function fetchData\(\) \{[\s\S]*?    \}', fetch_data, content)
    return content

patch_file('src/app/page.tsx', update_page_tsx)
patch_file('src/app/dokumentasi/page.tsx', update_dokumentasi)
patch_file('src/app/harga/page.tsx', update_harga)
