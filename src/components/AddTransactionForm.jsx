import React, { useState } from 'react'
import { useExpense } from '../context/ExpenseContext.jsx'

export default function AddTransactionForm() {
  const { dispatch } = useExpense()
  const [form, setForm] = useState({ title: '', amount: '', date: '', type: 'expense' })

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title || !form.amount) return
    const newTx = {
      id: crypto.randomUUID(),
      title: form.title,
      amount: Number(form.amount),
      date: form.date || new Date().toISOString(),
      type: form.type,
    }
    dispatch({ type: 'ADD_TRANSACTION', payload: newTx })
    setForm({ title: '', amount: '', date: '', type: 'expense' })
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr 1fr 1fr auto' }}>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
      <input name="amount" placeholder="Amount" type="number" value={form.amount} onChange={handleChange} />
      <input name="date" type="date" value={form.date} onChange={handleChange} />
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button type="submit">Add</button>
    </form>
  )
}


