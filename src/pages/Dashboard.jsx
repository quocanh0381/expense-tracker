import React from 'react'
import AddTransactionForm from '../components/AddTransactionForm.jsx'
import TransactionList from '../components/TransactionList.jsx'
import SummaryCard from '../components/SummaryCard.jsx'
import ChartDisplay from '../components/ChartDisplay.jsx'

export default function Dashboard() {
  return (
    <div>
      <SummaryCard />
      <AddTransactionForm />
      <ChartDisplay />
      <TransactionList />
    </div>
  )
}


