import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const results: Record<string, any> = {};
  
  // Test 1: Can we connect?
  try {
    await prisma.$connect();
    results.connection = "OK";
  } catch (e: any) {
    results.connection = `FAIL: ${e.message}`;
    return NextResponse.json(results);
  }
  
  // Test 2: Read SiteContent
  try {
    const docs = await prisma.siteContent.findMany();
    results.siteContent = { count: docs.length, ids: docs.map(d => d.id) };
  } catch (e: any) {
    results.siteContent = `FAIL: ${e.message}`;
  }
  
  // Test 3: Read hero specifically
  try {
    const hero = await prisma.siteContent.findUnique({ where: { id: "hero" } });
    results.hero = hero ? { hasData: !!hero.data, keys: hero.data ? Object.keys(hero.data as any) : [] } : "NOT FOUND";
  } catch (e: any) {
    results.hero = `FAIL: ${e.message}`;
  }
  
  // Test 4: Read about
  try {
    const about = await prisma.siteContent.findUnique({ where: { id: "about" } });
    results.about = about ? { hasData: !!about.data, imageUrl: (about.data as any)?.image_url || "none" } : "NOT FOUND";
  } catch (e: any) {
    results.about = `FAIL: ${e.message}`;
  }
  
  // Test 5: Count tables
  try {
    const [pkgCount, faqCount, portCount] = await Promise.all([
      prisma.package.count(),
      prisma.faqItem.count(),
      prisma.portfolio.count(),
    ]);
    results.counts = { packages: pkgCount, faqs: faqCount, portfolios: portCount };
  } catch (e: any) {
    results.counts = `FAIL: ${e.message}`;
  }
  
  // Test 6: DATABASE_URL (masked)
  const dbUrl = process.env.DATABASE_URL || "NOT SET";
  results.databaseUrl = dbUrl.replace(/:([^@]+)@/, ":***@");
  
  return NextResponse.json(results);
}
