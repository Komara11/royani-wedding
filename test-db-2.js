const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const hero = await prisma.siteContent.findUnique({ where: { id: "hero" } });
  console.log("HERO bg:", hero?.data?.bg_image_url || hero?.data?.image_url);
  const pkgs = await prisma.package.findMany({ orderBy: { sortOrder: 'asc' } });
  console.log("PKGS COUNT:", pkgs.length);
  if(pkgs.length > 0) {
    console.log("PKG TYPE:", pkgs[0].type);
    console.log("PKG PRICE:", pkgs[0].price);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
