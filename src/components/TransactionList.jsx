import React from 'react'
import { useExpense } from '../context/ExpenseContext.jsx'
import { formatDate } from '../utils/dateUtils.js'

export default function TransactionList() {
  const { state, dispatch } = useExpense()

  function handleDelete(id) {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id })
  }

  if (!state.transactions.length) return <p>No transactions yet.</p>

  return (
    <div style={{ marginTop: 12 }}>
      {state.transactions.map(tx => (
        <div key={tx.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: 8, padding: '8px 0', borderBottom: '1px solid #eee' }}>
          <div>{tx.title}</div>
          <div style={{ color: tx.type === 'income' ? 'green' : 'crimson' }}>
            {tx.type === 'income' ? '+' : '-'}{tx.amount}
          </div>
          <div>{tx.type}</div>
          <div>{formatDate(tx.date)}</div>
          <button onClick={() => handleDelete(tx.id)} style={{ color: 'crimson' }}>Delete</button>
        </div>
      ))}
    </div>
  )
}


