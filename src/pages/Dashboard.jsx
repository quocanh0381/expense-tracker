import React from 'react'
import AddTransactionForm from '../components/AddTransactionForm.jsx'
import TransactionList from '../components/TransactionList.jsx'
import SummaryCard from '../components/SummaryCard.jsx'
import ChartDisplay from '../components/ChartDisplay.jsx'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <SummaryCard />
      <div className="bg-white border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Add Transaction</h2>
        <AddTransactionForm />
      </div>
      <div className="bg-white border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Overview</h2>
        <ChartDisplay />
      </div>
      <div className="bg-white border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
        <TransactionList />
      </div>
    </div>
  )
}


