import { useState } from 'react'
import { formatCurrency } from './utils/currency'

function TransactionList({ transactions, categories, onDeleteTransaction }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      onDeleteTransaction(id);
    }
  };

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr className="empty-row">
                <td colSpan={5}>No transactions match these filters.</td>
              </tr>
            ) : (
              filteredTransactions.map(t => (
                <tr key={t.id}>
                  <td className="cell-date">{t.date}</td>
                  <td>{t.description}</td>
                  <td className="cell-category">{t.category}</td>
                  <td className={t.type === "income" ? "income-amount" : "expense-amount"}>
                    {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDeleteClick(t.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionList
