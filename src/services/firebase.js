// Firebase setup and minimal CRUD stubs
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

export async function createTransaction(userId, data) {
  const ref = collection(db, 'users', userId, 'transactions')
  const result = await addDoc(ref, data)
  return { id: result.id, ...data }
}

export async function listTransactions(userId) {
  const ref = collection(db, 'users', userId, 'transactions')
  const snap = await getDocs(ref)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function removeTransaction(userId, id) {
  const ref = doc(db, 'users', userId, 'transactions', id)
  await deleteDoc(ref)
}


