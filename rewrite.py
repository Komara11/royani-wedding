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
    content = re.sub(r'import \{ db \} from "@/lib/firebase";\nimport \{ collection, getDocs, doc, getDoc, query, orderBy \} from "firebase/firestore";',
                     'import prisma from "@/lib/prisma";', content)
    
    # Replace fetchHero
    fetch_hero = """    async function fetchHero() {
      try {
        const docRef = await prisma.siteContent.findUnique({ where: { id: "hero" } });
        if (docRef?.data) setHeroContent(docRef.data as any);
      } catch (err) {
        console.error("Error fetching hero:", err);
      }
    }"""
    content = re.sub(r'    async function fetchHero\(\) \{[\s\S]*?    \}', fetch_hero, content)

    # Replace fetchAbout
    fetch_about = """    async function fetchAbout() {
      try {
        const docRef = await prisma.siteContent.findUnique({ where: { id: "about" } });
        if (docRef?.data) setAboutContent(docRef.data as any);
      } catch (err) {
        console.error("Error fetching about:", err);
      }
    }"""
    content = re.sub(r'    async function fetchAbout\(\) \{[\s\S]*?    \}', fetch_about, content)

    # Replace fetchContact
    fetch_contact = """    async function fetchContact() {
      try {
        const docRef = await prisma.siteContent.findUnique({ where: { id: "contact" } });
        if (docRef?.data) setContactContent(docRef.data as any);
      } catch (err) {
        console.error("Error fetching contact:", err);
      }
    }"""
    content = re.sub(r'    async function fetchContact\(\) \{[\s\S]*?    \}', fetch_contact, content)

    # Replace fetchSocial
    fetch_social = """    async function fetchSocial() {
      try {
        const docRef = await prisma.siteContent.findUnique({ where: { id: "social_links" } });
        if (docRef?.data) setSocialLinks(docRef.data as any);
      } catch (err) {
        console.error("Error fetching social:", err);
      }
    }"""
    content = re.sub(r'    async function fetchSocial\(\) \{[\s\S]*?    \}', fetch_social, content)

    return content

patch_file('src/app/page.tsx', update_page_tsx)
