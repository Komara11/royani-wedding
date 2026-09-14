require('dotenv').config({ path: '../royani-admin/.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

const fallbackPortfolios = [
  { imageUrl: "/images/porto-1.jpg", title: "Pernikahan Andi & Sari", category: "Resepsi", location: "Majalengka", sortOrder: 1 },
  { imageUrl: "/images/porto-2.jpg", title: "Pernikahan Rian & Dewi", category: "Outdoor", location: "Cirebon", sortOrder: 2 },
  { imageUrl: "/images/porto-3.jpg", title: "Pernikahan Yoga & Putri", category: "Adat", location: "Indramayu", sortOrder: 3 },
  { imageUrl: "/images/porto-4.jpg", title: "Pernikahan Dimas & Rina", category: "Resepsi", location: "Majalengka", sortOrder: 4 },
];

const fallbackFaqs = [
  { sortOrder: 1, question: "Apakah paket pernikahan bisa disesuaikan kembali?", answer: "Ya, tentu saja. Semua paket yang kami tawarkan fleksibel dan dapat disesuaikan kembali dengan konsep impian, kuantitas tamu, maupun anggaran pernikahan Anda." },
  { sortOrder: 2, question: "Bagaimana mekanisme pembayaran dan DP di Royani Wedding?", answer: "Mekanisme pembayaran sangat mudah dan bertahap. Untuk mengamankan tanggal pernikahan (booking date), Anda cukup membayar Down Payment (DP) awal yang disepakati. Sisa pembayaran dapat dicicil." },
  { sortOrder: 3, question: "Apakah melayani jasa pernikahan di luar wilayah Majalengka?", answer: "Ya, kami melayani wilayah Majalengka serta wilayah sekitar seperti Cirebon, Kuningan, Indramayu, dan daerah sekitarnya. Tergantung lokasi, mungkin terdapat sedikit penyesuaian biaya transportasi." },
  { sortOrder: 4, question: "Berapa lama persiapan minimal sebelum memesan (booking)?", answer: "Waktu ideal adalah 3 hingga 6 bulan sebelum acara pernikahan. Hal ini sangat penting terutama di bulan-bulan padat (wedding season) agar tim kami dapat mempersiapkan segala detailnya dengan matang." }
];

async function main() {
  console.log("Deleting existing Portfolios and FAQs to prevent duplicates...");
  await prisma.portfolio.deleteMany({});
  await prisma.faqItem.deleteMany({});

  console.log("Seeding Portfolios...");
  for (const p of fallbackPortfolios) {
    await prisma.portfolio.create({ data: p });
  }
  
  console.log("Seeding FAQs...");
  for (const f of fallbackFaqs) {
    await prisma.faqItem.create({ data: f });
  }
  
  console.log("Seeding complete.");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
