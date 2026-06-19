import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency } from './utils/currency'

const COLORS = [
  'var(--brass)',
  'var(--sage)',
  'var(--rust)',
  'var(--slate)',
  'var(--brass-light)',
  'var(--sage-light)',
  'var(--rust-light)',
]

const axisLineStyle = { stroke: 'var(--border)' }
const axisTickStyle = { fill: 'var(--text-faint)' }

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
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="name"
              tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
              tick={axisTickStyle}
              axisLine={axisLineStyle}
              tickLine={axisLineStyle}
            />
            <YAxis tick={axisTickStyle} axisLine={axisLineStyle} tickLine={axisLineStyle} />
            <Tooltip
              formatter={(value) => formatCurrency(value)}
              contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6 }}
              labelStyle={{ color: 'var(--text)' }}
              itemStyle={{ color: 'var(--text)' }}
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
