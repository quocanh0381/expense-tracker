import React from 'react'
import { useExpense } from '../context/ExpenseContext.jsx'

export default function SummaryCard() {
  const { income, expense, balance } = useExpense()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white border rounded-lg p-4">
        <div className="text-sm text-gray-500">Total Income</div>
        <div className="text-2xl font-semibold text-emerald-600">{income}</div>
      </div>
      <div className="bg-white border rounded-lg p-4">
        <div className="text-sm text-gray-500">Total Expense</div>
        <div className="text-2xl font-semibold text-rose-600">{expense}</div>
      </div>
      <div className="bg-white border rounded-lg p-4">
        <div className="text-sm text-gray-500">Balance</div>
        <div className="text-2xl font-semibold">{balance}</div>
      </div>
    </div>
  )
}


