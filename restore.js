import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const originalUrl = "https://firebasestorage.googleapis.com/v0/b/royani-weding.firebasestorage.app/o/content%2F1781607573225_WhatsAppImage20260612at9.54.27PM3.jpeg?alt=media&token=a0251585-37df-40ed-99b6-7c8d5f67f862";

updateDoc(doc(db, "site_content", "hero"), {
  bg_image_url: originalUrl
}).then(() => {
  console.log("Restored successfully");
  process.exit(0);
}).catch(console.error);
