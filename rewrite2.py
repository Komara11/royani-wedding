import os
import re

def patch_file(filepath, logic):
    with open(filepath, 'r') as f:
        content = f.read()
    new_content = logic(content)
    with open(filepath, 'w') as f:
        f.write(new_content)

def update_dokumentasi(content):
    content = re.sub(r'import \{ db \} from "@/lib/firebase";\nimport \{ collection, getDocs, query, orderBy, doc, getDoc \} from "firebase/firestore";',
                     'import prisma from "@/lib/prisma";', content)
    
    fetch_port = """    async function fetchPortfolio() {
      try {
        const portSnap = await prisma.portfolio.findMany({ orderBy: { sortOrder: 'asc' } });
        const catSnap = await prisma.siteContent.findUnique({ where: { id: "portfolio_categories" } });
        
        const items = portSnap.map(d => ({
          id: d.id,
          ...d
        }));
        if (items.length > 0) setPortfolioItems(items);

        if (catSnap?.data) {
          const c = catSnap.data.list || [];
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
    content = re.sub(r'import \{ db \} from "@/lib/firebase";\nimport \{ collection, getDocs, doc, getDoc, query, orderBy \} from "firebase/firestore";',
                     'import prisma from "@/lib/prisma";', content)
    
    fetch_data = """    async function fetchData() {
      try {
        // Fetch Packages
        const packages = await prisma.package.findMany({ orderBy: { sortOrder: 'asc' } });
        const akad = packages.filter(p => p.type === "akad");
        const lengkap = packages.filter(p => p.type === "lengkap");

        if (akad.length > 0) setAkadPkgs(akad);
        if (lengkap.length > 0) setLengkapPkgs(lengkap);

        // Fetch FAQ
        const faqs = await prisma.faqItem.findMany({ orderBy: { sortOrder: 'asc' } });
        if (faqs.length > 0) {
          setFaqItems(faqs);
        }

        // Fetch Contact Content for WhatsApp
        const docRef = await prisma.siteContent.findUnique({ where: { id: "contact" } });
        if (docRef?.data) {
          setContactContent(docRef.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }"""
    content = re.sub(r'    async function fetchData\(\) \{[\s\S]*?    \}', fetch_data, content)
    return content

patch_file('src/app/dokumentasi/page.tsx', update_dokumentasi)
patch_file('src/app/harga/page.tsx', update_harga)
