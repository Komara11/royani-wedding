import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import fs from "fs";

// Read env from .env.local
const envContent = fs.readFileSync(".env.local", "utf8");
const getEnv = (key) => {
  const match = envContent.match(new RegExp(`${key}=(.*)`));
  return match ? match[1].trim() : undefined;
};

const app = initializeApp({
  apiKey: getEnv("NEXT_PUBLIC_FIREBASE_API_KEY"),
  authDomain: getEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  projectId: getEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: getEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  appId: getEnv("NEXT_PUBLIC_FIREBASE_APP_ID")
});
const db = getFirestore(app);

async function backup() {
  const data = { site_content: {}, portfolio_items: [], pricing_packages: [], faqs: [] };

  // Site content
  const sections = ["hero", "about", "contact", "social_media", "footer", "portfolio_categories"];
  for (const s of sections) {
    const snap = await getDoc(doc(db, "site_content", s));
    if (snap.exists()) data.site_content[s] = snap.data();
  }

  // Collections
  const portSnap = await getDocs(collection(db, "portfolio_items"));
  portSnap.forEach(d => data.portfolio_items.push({ id: d.id, ...d.data() }));

  const pkgSnap = await getDocs(collection(db, "pricing_packages"));
  pkgSnap.forEach(d => data.pricing_packages.push({ id: d.id, ...d.data() }));

  const faqSnap = await getDocs(collection(db, "faqs"));
  faqSnap.forEach(d => data.faqs.push({ id: d.id, ...d.data() }));

  fs.writeFileSync("backup.json", JSON.stringify(data, null, 2));
  console.log("Backup complete! Saved to backup.json");
  process.exit(0);
}
backup().catch(console.error);
