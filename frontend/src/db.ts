import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
 

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL, 
};

 const app = initializeApp(firebaseConfig);

 const rtdb = getDatabase(app);

 export { rtdb };