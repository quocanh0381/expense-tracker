import React, { createContext, useContext, useMemo, useReducer } from 'react'

const ExpenseContext = createContext(null)

const initialState = {
  transactions: [],
  loading: false,
  error: null,
}

function expenseReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload }
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] }
    case 'DELETE_TRANSACTION':
      return { ...state, transactions: state.transactions.filter(t => t.id !== action.payload) }
    default:
      return state
  }
}

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState)

  const income = useMemo(
    () => state.transactions.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount || 0), 0),
    [state.transactions]
  )
  const expense = useMemo(
    () => state.transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount || 0), 0),
    [state.transactions]
  )
  const balance = useMemo(() => income - expense, [income, expense])

  const value = useMemo(() => ({ state, dispatch, income, expense, balance }), [state, income, expense, balance])

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}

export function useExpense() {
  const ctx = useContext(ExpenseContext)
  if (!ctx) throw new Error('useExpense must be used within ExpenseProvider')
  return ctx
}


