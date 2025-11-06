import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase.js'
import { isFirebaseConfigured } from '../services/firebase.js'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isFirebaseConfigured || !auth) {
      setError('Auth is not configured. Use Demo mode or add VITE_FIREBASE_* in .env')
      return
    }
    try {
      setError('')
      await createUserWithEmailAndPassword(auth, email, password)
      navigate('/login')
    } catch (err) {
      const msg = err?.message || err?.code || 'Register failed'
      setError(msg)
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-white border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Create account</h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input className="border rounded-md px-3 py-2" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="border rounded-md px-3 py-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div className="text-rose-600 text-sm">{error}</div>}
        <button type="submit" className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500" disabled={!isFirebaseConfigured}>Create account</button>
      </form>
      <p className="mt-3 text-sm text-gray-600">Already have an account? <Link className="text-indigo-600 hover:underline" to="/login">Login</Link></p>
    </div>
  )
}


