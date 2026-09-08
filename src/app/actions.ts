"use server";

import prisma from "@/lib/prisma";

export async function getHero() {
  const doc = await prisma.siteContent.findUnique({ where: { id: "hero" } });
  return doc?.data || null;
}

export async function getAbout() {
  const doc = await prisma.siteContent.findUnique({ where: { id: "about" } });
  return doc?.data || null;
}

export async function getContact() {
  const doc = await prisma.siteContent.findUnique({ where: { id: "contact" } });
  return doc?.data || null;
}

export async function getSocialLinks() {
  const doc = await prisma.siteContent.findUnique({ where: { id: "social_links" } });
  return doc?.data || null;
}

export async function getPortfolioCategories() {
  const doc = await prisma.siteContent.findUnique({ where: { id: "portfolio_categories" } });
  return doc?.data || null;
}

export async function getPortfolios() {
  return await prisma.portfolio.findMany({ orderBy: { sortOrder: 'asc' } });
}

export async function getPackages() {
  return await prisma.package.findMany({ orderBy: { sortOrder: 'asc' } });
}

export async function getFaqs() {
  return await prisma.faqItem.findMany({ orderBy: { sortOrder: 'asc' } });
}
