import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency } from './utils/currency'

const COLORS = ['#C79B4B', '#6FAE7B', '#C97A63', '#7FA8C9', '#D8B36B', '#9FD1AA', '#E0A38C']

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
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.12)" />
            <XAxis
              dataKey="name"
              tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
              tick={{ fill: '#9fb0a3' }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.15)' }}
              tickLine={{ stroke: 'rgba(255, 255, 255, 0.15)' }}
            />
            <YAxis
              tick={{ fill: '#9fb0a3' }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.15)' }}
              tickLine={{ stroke: 'rgba(255, 255, 255, 0.15)' }}
            />
            <Tooltip
              formatter={(value) => formatCurrency(value)}
              contentStyle={{ background: '#1f2f27', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: 6 }}
              labelStyle={{ color: '#ece7d6' }}
              itemStyle={{ color: '#ece7d6' }}
              cursor={{ fill: 'rgba(255, 255, 255, 0.06)' }}
            />
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
