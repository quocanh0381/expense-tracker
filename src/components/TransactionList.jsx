import React from 'react'
import { useExpense } from '../context/ExpenseContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { removeTransaction, isFirebaseConfigured } from '../services/firebase.js'
import { formatDate } from '../utils/dateUtils.js'

export default function TransactionList() {
  const { state, dispatch } = useExpense()
  const { user } = useAuth()

  async function handleDelete(id) {
    if (!user) return
    if (isFirebaseConfigured) {
      await removeTransaction(user.uid, id)
    }
    dispatch({ type: 'DELETE_TRANSACTION', payload: id })
  }

  if (!state.transactions.length) return <p className="text-sm text-gray-500">No transactions yet.</p>

  return (
    <div className="mt-2 divide-y">
      {state.transactions.map(tx => (
        <div key={tx.id} className="grid grid-cols-5 gap-2 py-2 items-center">
          <div className="col-span-2 font-medium truncate">{tx.title}</div>
          <div className={tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}>
            {tx.type === 'income' ? '+' : '-'}{tx.amount}
          </div>
          <div className="capitalize text-gray-600">{tx.type}</div>
          <div className="flex items-center justify-end gap-3">
            <span className="text-gray-500 text-sm">{formatDate(tx.date)}</span>
            <button onClick={() => handleDelete(tx.id)} className="px-2 py-1 text-sm rounded-md bg-rose-50 text-rose-700 hover:bg-rose-100">Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}


