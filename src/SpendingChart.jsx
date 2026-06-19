import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency } from './utils/currency'

const COLORS = ['#B68A3B', '#4F7858', '#9C4A36', '#3E5A4E', '#D8B36B', '#7FA487', '#C17A63']

function SpendingChart({ transactions }) {
  const data = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const existing = acc.find(d => d.name === t.category)
      if (existing) {
        existing.value += t.amount
      } else {
        acc.push({ name: t.category, value: t.amount })
      }
      return acc
    }, [])

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p>No expenses to show yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)} />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Bar dataKey="value">
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default SpendingChart
