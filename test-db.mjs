import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
});
const db = getFirestore(app);

async function run() {
  const about = await getDoc(doc(db, "site_content", "about"));
  console.log("ABOUT:", about.data().image_url);

  const port = await getDocs(collection(db, "portfolio_items"));
  console.log("PORTFOLIO:");
  port.docs.forEach(d => console.log(d.id, d.data().image_url));
  process.exit(0);
}
run();
