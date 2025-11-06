import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { useAuth } from './AuthContext.jsx'
import { listTransactions } from '../services/firebase.js'
import { isFirebaseConfigured } from '../services/firebase.js'

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
  const { user } = useAuth()

  useEffect(() => {
    async function load() {
      try {
        dispatch({ type: 'SET_LOADING', payload: true })
        dispatch({ type: 'SET_ERROR', payload: null })
        if (!user) {
          dispatch({ type: 'SET_TRANSACTIONS', payload: [] })
          return
        }
        if (isFirebaseConfigured) {
          const items = await listTransactions(user.uid)
          dispatch({ type: 'SET_TRANSACTIONS', payload: items })
        } else {
          const raw = localStorage.getItem('demo-transactions') || '[]'
          const items = JSON.parse(raw)
          dispatch({ type: 'SET_TRANSACTIONS', payload: items })
        }
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load transactions' })
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }
    load()
  }, [user])

  useEffect(() => {
    if (!isFirebaseConfigured) {
      localStorage.setItem('demo-transactions', JSON.stringify(state.transactions))
    }
  }, [state.transactions])

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


