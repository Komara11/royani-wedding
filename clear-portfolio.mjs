
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf8');
const match = (key) => {
  const m = env.match(new RegExp(`${key}=(.*)`));
  return m ? m[1].replace(/['"]+/g, '').trim() : undefined;
};

const app = initializeApp({
  apiKey: match('NEXT_PUBLIC_FIREBASE_API_KEY'),
  authDomain: match('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'),
  projectId: match('NEXT_PUBLIC_FIREBASE_PROJECT_ID'),
  storageBucket: match('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: match('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
  appId: match('NEXT_PUBLIC_FIREBASE_APP_ID')
});
const db = getFirestore(app);

async function clearPortfolio() {
  const snap = await getDocs(collection(db, 'portfolio_items'));
  for (const d of snap.docs) {
    await deleteDoc(doc(db, 'portfolio_items', d.id));
    console.log('Deleted', d.id);
  }
  console.log('Portfolio cleared');
  process.exit(0);
}

clearPortfolio().catch(console.error);

