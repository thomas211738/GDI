import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import gymData from "../data/gym_occupancy_2026.json" with { type: "json" };
import { config } from "dotenv";

config({ path: new URL("../../.env", import.meta.url).pathname });

const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY,
  authDomain: process.env.VITE_AUTH_DOMAIN,
  projectId: process.env.VITE_PROJECT_ID,
  storageBucket: process.env.VITE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_APP_ID,
  measurementId: process.env.VITE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function upload() {
  const entries = Object.entries(gymData);
  console.log(`Uploading ${entries.length} dates...`);

  for (const [date, hours] of entries) {
    await setDoc(doc(db, "gym_occupancy", date), { hours });
    console.log(`Uploaded ${date}`);
  }

  console.log("Done!");
}

upload();