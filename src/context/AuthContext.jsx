import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth, isFirebaseConfigured, demoMode } from '../services/firebase.js'
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      if (demoMode) {
        setUser({ uid: 'demo-user', email: 'demo@local' })
      } else {
        setUser(null)
      }
      setInitializing(false)
      return
    }
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u)
      setInitializing(false)
    })
    return () => unsub()
  }, [])

  async function logout() {
    if (isFirebaseConfigured && auth) {
      await firebaseSignOut(auth)
    } else {
      setUser(null)
    }
  }

  const value = useMemo(() => ({ user, initializing, logout }), [user, initializing])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


