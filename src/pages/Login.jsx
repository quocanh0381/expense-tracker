import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError('')
      // TODO: integrate with Firebase auth signIn
      navigate('/')
    } catch (err) {
      setError('Login failed')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', maxWidth: 360, gap: 8 }}>
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div style={{ color: 'crimson' }}>{error}</div>}
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: 8 }}>No account? <Link to="/register">Register</Link></p>
    </div>
  )
}


