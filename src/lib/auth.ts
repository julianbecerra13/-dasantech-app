import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export async function registerUser(email: string, password: string, name: string) {
  const firebaseAuth = auth();
  if (!firebaseAuth) throw new Error("Firebase no inicializado");
  const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  await updateProfile(userCredential.user, { displayName: name });
  // Guardar datos extra en Firestore (no bloquea el registro si falla)
  try {
    const firebaseDb = db();
    if (firebaseDb) {
      await setDoc(doc(firebaseDb, "users", userCredential.user.uid), {
        name,
        email,
        createdAt: new Date().toISOString(),
      });
    }
  } catch (e) {
    console.warn("No se pudo guardar en Firestore:", e);
  }
  return userCredential.user;
}

export async function loginUser(email: string, password: string) {
  const firebaseAuth = auth();
  if (!firebaseAuth) throw new Error("Firebase no inicializado");
  const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
  return userCredential.user;
}

export async function logoutUser() {
  const firebaseAuth = auth();
  if (!firebaseAuth) return;
  await signOut(firebaseAuth);
}

export function getDisplayName(user: User | null): string {
  return user?.displayName || user?.email?.split("@")[0] || "Usuario";
}
