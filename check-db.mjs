import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf8');
const match = (key) => {
  const m = env.match(new RegExp(`${key}=(.*)`));
  return m ? m[1].trim() : undefined;
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

getDoc(doc(db, 'site_content', 'hero')).then(snap => {
  console.log(snap.data());
  process.exit(0);
}).catch(console.error);
