const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const hero = await prisma.siteContent.findUnique({ where: { id: "hero" } });
  console.log("HERO:", JSON.stringify(hero, null, 2));
  const pkgs = await prisma.package.findMany({ orderBy: { sortOrder: 'asc' } });
  console.log("PKGS:", JSON.stringify(pkgs.slice(0,2), null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
