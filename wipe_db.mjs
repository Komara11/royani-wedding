import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function wipePortfolio() {
  await signInWithEmailAndPassword(auth, "admin@royaniwedding.com", "admin123");
  const querySnapshot = await getDocs(collection(db, "portfolio_items"));
  const deletePromises = [];
  querySnapshot.forEach((document) => {
    deletePromises.push(deleteDoc(doc(db, "portfolio_items", document.id)));
  });
  await Promise.all(deletePromises);
  console.log(`Deleted ${deletePromises.length} portfolio items.`);
  process.exit(0);
}

wipePortfolio().catch(console.error);
