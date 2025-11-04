export function formatDate(isoString) {
  if (!isoString) return ''
  const d = new Date(isoString)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString()
}

export function formatDateShort(isoString) {
  if (!isoString) return ''
  const d = new Date(isoString)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function filterByDateRange(transactions, startIso, endIso) {
  const start = startIso ? new Date(startIso).getTime() : -Infinity
  const end = endIso ? new Date(endIso).getTime() : Infinity
  return transactions.filter(t => {
    const time = new Date(t.date).getTime()
    return time >= start && time <= end
  })
}


