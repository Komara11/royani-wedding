import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import fs from "fs";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function exportData() {
  const data = {};

  // Export site_content
  data.site_content = {};
  const contents = ["hero", "about", "contact", "social_links", "portfolio_categories"];
  for (const docId of contents) {
    const snap = await getDoc(doc(db, "site_content", docId));
    if (snap.exists()) {
      data.site_content[docId] = snap.data();
    }
  }

  // Export packages
  data.pricing_packages = [];
  const pkgSnap = await getDocs(collection(db, "pricing_packages"));
  pkgSnap.forEach(d => {
    data.pricing_packages.push({ id: d.id, ...d.data() });
  });

  // Export faq_items
  data.faq_items = [];
  const faqSnap = await getDocs(collection(db, "faq_items"));
  faqSnap.forEach(d => {
    data.faq_items.push({ id: d.id, ...d.data() });
  });

  fs.writeFileSync("firebase_export.json", JSON.stringify(data, null, 2));
  console.log("Exported data successfully to firebase_export.json");
  process.exit(0);
}

exportData().catch(console.error);
