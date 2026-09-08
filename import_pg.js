const { Client } = require('ssh2');
const fs = require('fs');

const conn = new Client();
const exportData = fs.readFileSync('firebase_export.json', 'utf8');

const importScript = `
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();
const data = JSON.parse(fs.readFileSync('/tmp/firebase_export.json', 'utf8'));

async function importData() {
  console.log("Importing Site Content...");
  for (const [key, value] of Object.entries(data.site_content)) {
    await prisma.siteContent.upsert({
      where: { id: key },
      update: { data: value },
      create: { id: key, data: value }
    });
  }

  console.log("Importing Packages...");
  for (const pkg of data.pricing_packages) {
    const { id, name, price, type, featured, sort_order, is_active, sections } = pkg;
    await prisma.package.upsert({
      where: { id },
      update: {
        name, price, type, featured: !!featured, sortOrder: sort_order || 0, isActive: !!is_active, sections
      },
      create: {
        id, name, price, type, featured: !!featured, sortOrder: sort_order || 0, isActive: !!is_active, sections
      }
    });
  }

  console.log("Importing FAQs...");
  for (const faq of data.faq_items) {
    const { id, question, answer, sort_order } = faq;
    await prisma.faqItem.upsert({
      where: { id },
      update: { question, answer, sortOrder: sort_order || 0 },
      create: { id, question, answer, sortOrder: sort_order || 0 }
    });
  }

  console.log("Creating default Admin...");
  // Create admin user: admin@royaniwedding.com / admin123
  // Since we haven't implemented bcrypt yet in the main app, we can just hash it now or later.
  // We'll store it as plain text or basic hash for now and implement bcrypt in auth.
  // Actually, wait, Next.js can't use bcrypt easily in Edge, but it can in Node.
  // We will hash the password later in the admin rewrite.
  await prisma.admin.upsert({
    where: { email: 'admin@royaniwedding.com' },
    update: {},
    create: { email: 'admin@royaniwedding.com', password: 'plain:admin123' }
  });

  console.log("Data import complete!");
  process.exit(0);
}

importData().catch(e => { console.error(e); process.exit(1); });
`;

conn.on('ready', () => {
  conn.sftp((err, sftp) => {
    if (err) throw err;
    const writeStream1 = sftp.createWriteStream('/tmp/firebase_export.json');
    writeStream1.on('close', () => {
      const writeStream2 = sftp.createWriteStream('/tmp/import_pg.js');
      writeStream2.on('close', () => {
        conn.exec('cd /var/www/royani-wedding && node /tmp/import_pg.js', (err, stream) => {
          stream.on('close', () => conn.end());
          stream.on('data', (d) => process.stdout.write(d));
          stream.stderr.on('data', (d) => process.stderr.write(d));
        });
      });
      writeStream2.write(importScript);
      writeStream2.end();
    });
    writeStream1.write(exportData);
    writeStream1.end();
  });
}).connect({
  host: '103.169.206.236',
  port: 22,
  username: 'root',
  password: 'Royaniwedding1#'
});
