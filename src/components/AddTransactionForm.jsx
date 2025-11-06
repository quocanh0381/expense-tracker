import React, { useState } from 'react'
import { useExpense } from '../context/ExpenseContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { createTransaction, isFirebaseConfigured } from '../services/firebase.js'

export default function AddTransactionForm() {
  const { dispatch } = useExpense()
  const { user } = useAuth()
  const [form, setForm] = useState({ title: '', amount: '', date: '', type: 'expense' })

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.title || !form.amount || !user) return
    const txData = {
      title: form.title,
      amount: Number(form.amount),
      date: form.date || new Date().toISOString(),
      type: form.type,
    }
    if (isFirebaseConfigured) {
      const saved = await createTransaction(user.uid, txData)
      dispatch({ type: 'ADD_TRANSACTION', payload: saved })
    } else {
      // demo mode: local-only
      const local = { id: crypto.randomUUID(), ...txData }
      dispatch({ type: 'ADD_TRANSACTION', payload: local })
    }
    setForm({ title: '', amount: '', date: '', type: 'expense' })
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-3">
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="md:col-span-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input name="amount" placeholder="Amount" type="number" value={form.amount} onChange={handleChange} className="md:col-span-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      <input name="date" type="date" value={form.date} onChange={handleChange} className="md:col-span-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      <select name="type" value={form.type} onChange={handleChange} className="md:col-span-1 border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button type="submit" className="md:col-span-1 inline-flex items-center justify-center px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50" disabled={!user}>Add</button>
    </form>
  )
}


