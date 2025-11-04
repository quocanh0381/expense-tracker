import React from 'react'
import { useExpense } from '../context/ExpenseContext.jsx'

export default function SummaryCard() {
  const { income, expense, balance } = useExpense()
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, margin: '12px 0' }}>
      <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
        <div>Total Income</div>
        <div style={{ fontSize: 20, color: 'green' }}>{income}</div>
      </div>
      <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
        <div>Total Expense</div>
        <div style={{ fontSize: 20, color: 'crimson' }}>{expense}</div>
      </div>
      <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
        <div>Balance</div>
        <div style={{ fontSize: 20 }}>{balance}</div>
      </div>
    </div>
  )
}


