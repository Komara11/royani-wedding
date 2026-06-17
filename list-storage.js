import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const listRef = ref(storage, 'content');

listAll(listRef)
  .then(async (res) => {
    for (const itemRef of res.items) {
      const url = await getDownloadURL(itemRef);
      console.log(itemRef.name);
      console.log(url);
    }
    process.exit(0);
  }).catch((error) => {
    console.error(error);
    process.exit(1);
  });
