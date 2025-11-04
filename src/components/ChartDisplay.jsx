import React, { useMemo } from 'react'
import { useExpense } from '../context/ExpenseContext.jsx'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { formatDateShort } from '../utils/dateUtils.js'

export default function ChartDisplay() {
  const { state } = useExpense()

  const chartData = useMemo(() => {
    const byDate = new Map()
    state.transactions.forEach(tx => {
      const key = (tx.date || '').slice(0, 10)
      const prev = byDate.get(key) || { date: key, income: 0, expense: 0 }
      if (tx.type === 'income') prev.income += Number(tx.amount || 0)
      if (tx.type === 'expense') prev.expense += Number(tx.amount || 0)
      byDate.set(key, prev)
    })
    return Array.from(byDate.values()).sort((a, b) => a.date.localeCompare(b.date)).map(d => ({ ...d, label: formatDateShort(d.date) }))
  }, [state.transactions])

  if (!chartData.length) return null

  return (
    <div style={{ height: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} />
          <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}


