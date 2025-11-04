import React from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { ExpenseProvider } from './context/ExpenseContext.jsx'

export default function App() {
  return (
    <ExpenseProvider>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: 16 }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0' }}>
          <h1 style={{ margin: 0, fontSize: 24 }}>Expense Tracker</h1>
          <nav style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/">Dashboard</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </ExpenseProvider>
  )
}


