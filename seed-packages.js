const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const packages = [
  {
    "name": "Minimalis",
    "price": "Rp 6.000.000",
    "type": "lengkap",
    "featured": false,
    "sortOrder": 1,
    "sections": [
      "Dekorasi Indoor",
      "1x sepasang busana akad",
      "1x gaun resepsi",
      "1x jas resepsi",
      "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
      "1 set melati fresh",
      "1x makeup pengantin + touch up",
      "Cetak 1 album magnetik 70 lembar + file",
      "FREE: Softlent pengantin, Henna + nail art pengantin, Makeup ibu hajat"
    ]
  },
  {
    "name": "Ekonomis",
    "price": "Rp 9.500.000",
    "type": "lengkap",
    "featured": false,
    "sortOrder": 2,
    "sections": [
      "Pelaminan 4\u20135 meter, kursi 3",
      "2 kotak uang standar",
      "1 meja penerima tamu",
      "4 lokal tenda (model menyesuaikan tema)",
      "100 pcs kursi tamu",
      "1 set alat-alat prasmanan berikut 100 piring rotan & 100 sendok",
      "1x sepasang busana akad",
      "1x gaun resepsi",
      "1x jas resepsi",
      "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
      "1 set melati fresh",
      "1x makeup pengantin + touch up",
      "1x makeup dan busana ibu hajat",
      "Beskap bapa hajat",
      "4 makeup dan busana pagar ayu",
      "Cetak 1 album magnetik 70 lembar + file",
      "FREE: Softlent pengantin, Henna + nail art pengantin"
    ]
  },
  {
    "name": "Standar 1",
    "price": "Rp 13.500.000",
    "type": "lengkap",
    "featured": false,
    "sortOrder": 3,
    "sections": [
      "Pelaminan 6 meter, kursi 5",
      "2 kotak uang ukuran standar",
      "1 meja penerima tamu",
      "1 gapura pintu masuk",
      "2 set tenda",
      "100 pcs kursi tamu",
      "1 set alat-alat prasmanan berikut 100 piring rotan & 100 sendok",
      "1x sepasang busana akad",
      "2x gaun resepsi",
      "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
      "1 set melati fresh",
      "1x makeup pengantin + touch up",
      "1x makeup dan busana ibu hajat + besan",
      "Beskap bapa hajat & besan",
      "4 makeup dan busana pagar ayu",
      "1 album wedding magnetik",
      "Cetak foto 70 lembar + file foto",
      "FREE: Softlent pengantin, Henna + nail art khusus pengantin, Makeup anak 2"
    ]
  },
  {
    "name": "Standar 2",
    "price": "Rp 15.500.000",
    "type": "lengkap",
    "featured": true,
    "sortOrder": 4,
    "sections": [
      "Pelaminan 6 meter, kursi 5",
      "Rangkaian bunga imitasi premium",
      "2 kotak uang ukuran standar",
      "1 meja penerima tamu",
      "1 gapura pintu masuk",
      "2 set tenda",
      "100 pcs kursi tamu + 100 pcs sarung kursi",
      "1 set alat-alat prasmanan berikut 100 piring rotan & 100 sendok",
      "2 malam lampu penerang + jenset",
      "Set meja akad",
      "1 kipas blower",
      "1x sepasang busana akad",
      "2x gaun resepsi",
      "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
      "1 set melati fresh",
      "1x makeup pengantin + touch up",
      "1x makeup dan busana ibu hajat + besan",
      "Beskap bapa hajat & besan",
      "4 makeup dan busana pagar ayu",
      "1 album wedding magnetik",
      "Cetak foto 100 lembar + file foto",
      "FREE: Softlent pengantin, Henna + nail art khusus pengantin, Make up anak 2"
    ]
  },
  {
    "name": "Silver",
    "price": "Rp 17.500.000",
    "type": "lengkap",
    "featured": false,
    "sortOrder": 5,
    "sections": [
      "Pelaminan 8 meter, kursi 5",
      "Rangkaian bunga imitasi premium",
      "2 kotak uang",
      "1 meja penerima tamu",
      "1 gapura pintu masuk",
      "7 lokal tenda (model menyesuaikan tema)",
      "100 pcs kursi tamu + 100 pcs sarung kursi",
      "1 set alat-alat prasmanan (roll toup) berikut 100 piring rotan & 100 sendok",
      "2 malam lampu penerang + jenset",
      "Set meja akad",
      "1 kipas blower",
      "1x sepasang busana akad",
      "2x gaun resepsi",
      "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
      "1 set melati fresh",
      "1x makeup pengantin + touch up",
      "1x makeup dan busana ibu hajat + besan",
      "Beskap bapa hajat & besan",
      "4 makeup dan busana pagar ayu",
      "1 album wedding magnetik",
      "Cetak 100 foto + file",
      "FREE: Softlent pengantin, Henna + nail art pengantin, Makeup dewasa 2, Makeup anak 2"
    ]
  },
  {
    "name": "Gold",
    "price": "Rp 20.000.000",
    "type": "lengkap",
    "featured": true,
    "sortOrder": 6,
    "sections": [
      "Pelaminan 8 meter",
      "Rangkaian bunga imitasi premium",
      "Lorong masuk & Foto booth",
      "2 kotak uang",
      "1 meja penerima tamu",
      "1 gapura pintu masuk",
      "8 lokal tenda (model menyesuaikan tema)",
      "100 pcs kursi tamu + 100 pcs sarung kursi",
      "1 set alat-alat prasmanan (roll toup) berikut 100 piring rotan & 100 sendok",
      "2 malam lampu penerang + jenset",
      "Set meja akad",
      "2 kipas blower",
      "Karpet jalan 20 meter",
      "1x sepasang busana akad",
      "2x gaun resepsi",
      "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
      "1 set melati fresh",
      "1x makeup pengantin + touch up",
      "1x makeup dan busana ibu hajat + besan",
      "Beskap bapa hajat & besan",
      "4 makeup dan busana pagar ayu",
      "2 pagar bagus",
      "1 album wedding magnetik",
      "Cetak 100 foto + file",
      "Video liputan 2 disk",
      "FREE: Softlent pengantin, Henna + nail art pengantin, Makeup dewasa 2, Pelepasan balon",
      "INCLUDE: 1 MC Akad"
    ]
  },
  {
    "name": "Platinum",
    "price": "Rp 35.000.000",
    "type": "lengkap",
    "featured": false,
    "sortOrder": 7,
    "sections": [
      "Pelaminan 8 meter",
      "Rangkaian bunga imitasi premium",
      "Lorong masuk & Foto booth",
      "2 kotak uang",
      "2 meja penerima tamu",
      "1 gapura pintu masuk",
      "9 lokal tenda (model menyesuaikan tema)",
      "100 pcs kursi tamu + 100 pcs sarung kursi",
      "1 set alat-alat prasmanan (roll toup) berikut 100 piring rotan & 100 sendok",
      "2 malam lampu penerang + jenset",
      "Set meja akad",
      "2 kipas blower",
      "Karpet merah 30 meter",
      "2 meja VIP",
      "1x sepasang busana akad",
      "2x gaun resepsi",
      "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
      "1 set melati fresh",
      "1x makeup pengantin + touch up",
      "1x makeup dan busana ibu hajat + besan",
      "Beskap bapa hajat & besan",
      "6 makeup dan busana pagar ayu",
      "2 pagar bagus",
      "Cetak 1 album magazine + file editing (1 flashdisk)",
      "Cetak 1 album magnetik",
      "Video sinematik",
      "Video liputan & Video on flashdisk",
      "FREE: Softlent pengantin, Henna + nail art pengantin, Makeup dewasa 2, Makeup anak 2, Pelepasan balon",
      "INCLUDE: 1 MC Akad, 4 Crew WO"
    ]
  },
  {
    "name": "Exclusive",
    "price": "Rp 45.000.000",
    "type": "lengkap",
    "featured": true,
    "sortOrder": 8,
    "sections": [
      "Pelaminan 10 meter",
      "Rangkaian bunga imitasi premium",
      "Lorong masuk & Foto booth",
      "2 kotak uang",
      "2 meja penerima tamu",
      "1 gapura pintu masuk",
      "10 lokal tenda (model menyesuaikan tema)",
      "100 pcs kursi tamu + 100 pcs sarung kursi",
      "1 set alat-alat prasmanan (roll toup) berikut 150 piring rotan & 150 sendok",
      "2 malam lampu penerang + jenset",
      "1 Set meja akad Exclusive",
      "3 kipas blower",
      "Karpet jalan 40 meter",
      "2 meja VIP & 2 meja hidangan tambahan",
      "1x sepasang busana akad",
      "2x gaun resepsi",
      "Sepasang sepatu (akad dan resepsi) pengantin pria & wanita",
      "1 set melati fresh",
      "1x makeup pengantin + touch up",
      "1x makeup dan busana ibu hajat + besan",
      "Beskap bapa hajat & besan",
      "6 makeup dan busana pagar ayu",
      "4 makeup keluarga",
      "2 pagar bagus",
      "Cetak 1 album magazine + file editing (1 flashdisk)",
      "Cetak 1 album magnetik",
      "Video sinematik",
      "Video liputan & Video on flashdisk",
      "FREE: Softlent pengantin, Henna + nail art pengantin, Makeup dewasa 2, Makeup anak 2, Pelepasan balon",
      "INCLUDE: 1 MC Akad, 4 Crew WO, Pemandu siraman"
    ]
  },
  {
    "name": "Paket 1",
    "price": "Rp 2.500.000",
    "type": "akad",
    "featured": true,
    "sortOrder": 1,
    "sections": [
      "Makeup pengantin",
      "Busana akad + acc",
      "Jas pengantin pria",
      "Sepatu pria & wanita",
      "Melati fresh",
      "1 album magnetik 50 lembar + file",
      "FREE: Softlent pengantin, Henna + nail art pengantin"
    ]
  },
  {
    "name": "Paket 2",
    "price": "Rp 1.700.000",
    "type": "akad",
    "featured": false,
    "sortOrder": 2,
    "sections": [
      "Makeup pengantin",
      "Busana akad + acc",
      "Jas pengantin pria",
      "Sepatu pria & wanita",
      "Melati fresh",
      "FREE: Softlent pengantin, Henna + nail art pengantin"
    ]
  }
];

async function main() {
  console.log("Menghapus data paket lama...");
  await prisma.package.deleteMany({});
  
  console.log("Menyimpan data paket baru...");
  for (const p of packages) {
    await prisma.package.create({ data: p });
  }
  
  console.log("Berhasil memperbarui semua paket harga!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
