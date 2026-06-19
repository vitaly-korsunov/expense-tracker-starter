import { formatCurrency } from './utils/currency'

function Summary({ totalIncome, totalExpenses, balance }) {
  return (
    <div className="summary">
      <div className="summary-card">
        <h3>Income</h3>
        <p className="income-amount">{formatCurrency(totalIncome)}</p>
      </div>
      <div className="summary-card">
        <h3>Expenses</h3>
        <p className="expense-amount">{formatCurrency(totalExpenses)}</p>
      </div>
      <div className="summary-card summary-card--balance">
        <h3>Balance</h3>
        <p className="balance-amount">{formatCurrency(balance)}</p>
      </div>
    </div>
  );
}

export default Summary
