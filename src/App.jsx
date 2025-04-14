import React, { useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseTable from './components/ExpenseTable'
import SearchBar from './components/SearchBar'

function App() {
  const [expenses, setExpenses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortKey, setSortKey] = useState(null)

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense])
  }

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id))
  }

  const filteredExpenses = expenses
    .filter((expense) =>
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortKey) return 0
      return a[sortKey].localeCompare(b[sortKey])
    })

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseTable
        expenses={filteredExpenses}
        onDelete={handleDeleteExpense}
        onSort={setSortKey}
      />
    </div>
  )
}

export default App
