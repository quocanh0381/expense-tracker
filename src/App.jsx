import React from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { ExpenseProvider } from './context/ExpenseContext.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'

function Layout() {
  const { user, initializing } = useAuth()
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-indigo-600 text-white grid place-items-center font-semibold">ET</div>
            <h1 className="m-0 text-xl font-semibold">Expense Tracker</h1>
          </div>
          <nav className="ml-auto flex items-center gap-2">
            {!user && (
              <>
                <Link className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100" to="/login">Login</Link>
                <Link className="px-3 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500" to="/register">Register</Link>
              </>
            )}
            {user && (
              <>
                <Link className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100" to="/">Dashboard</Link>
                <LogoutButton />
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-6">
        {initializing ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
            <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </main>
    </div>
  )
}

function LogoutButton() {
  const { logout } = useAuth()
  return (
    <button className="px-3 py-2 rounded-md text-sm font-medium bg-gray-900 text-white hover:bg-gray-800" onClick={logout}>Logout</button>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <Layout />
      </ExpenseProvider>
    </AuthProvider>
  )
}


