import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRjPuGk_WZyYVE2uqVlshT-suSrkFhoik",
  authDomain: "dasantech-app.firebaseapp.com",
  projectId: "dasantech-app",
  storageBucket: "dasantech-app.firebasestorage.app",
  messagingSenderId: "1087937676128",
  appId: "1:1087937676128:web:1c441793edfa5cc895d405",
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

function getFirebaseApp() {
  if (typeof window === "undefined") return undefined;
  if (!app) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return app;
}

function getFirebaseAuth() {
  if (!auth) {
    const firebaseApp = getFirebaseApp();
    if (firebaseApp) {
      auth = getAuth(firebaseApp);
    }
  }
  return auth;
}

function getFirebaseDb() {
  if (!db) {
    const firebaseApp = getFirebaseApp();
    if (firebaseApp) {
      db = getFirestore(firebaseApp);
    }
  }
  return db;
}

export { getFirebaseAuth as auth, getFirebaseDb as db };
export default getFirebaseApp;
