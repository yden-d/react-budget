import './App.css'
import { ExpenseList } from './components/ExpenseList'
import { Income } from './components/Income'
import { ExpenseForm } from './components/ExpenseForm'
import { Budget } from './components/Budget'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material'
import { CssBaseline } from '@mui/material'
import { Button } from '@mui/material'

function App() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);
  const [isNightMode, setIsNightMode] = useState(false);

  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const addIncome = (newIncome) => {
    setIncome(newIncome);
  };

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  const theme = createTheme({
    palette: {
      mode: isNightMode ? 'dark': 'light',
    },
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:3001/expenses");
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: '1em', backgroundColor: isNightMode ? '#303030' : 'white'}}>
        <h1 style={{ color: isNightMode ? 'white' : 'black' }}>React Expense Tracker</h1>
      </div>
      <div style={{ marginBottom: '1em', marginTop: '-2em', marginLeft: '1em'}}>
        <Button variant="contained" onClick={toggleNightMode} color="success">
          {isNightMode ? 'Day Mode' : 'Night Mode'}
        </Button>
      </div>
      <div style={{ padding: '1em'}}>
        <Income setIncome={addIncome} />
        <ExpenseList expenses={expenses} />
        <ExpenseForm addExpense={addExpense}/>
        <Budget expenses={expenses} income={income} />
      </div>
    </ThemeProvider>
  )
}

export default App
