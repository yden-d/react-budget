import React, { useState } from "react";
import axios from "axios";
import { FormControl, TextField, MenuItem, InputLabel, Button } from "@mui/material";
import Select from '@mui/material/Select';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FormHelperText } from "@mui/material";

export const ExpenseForm = ({addExpense}) => { 
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState('');
    const [amount, setAmount] = useState(0);
    const [formError, setFormError] = useState({});

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const handleAddExpense = async () => {
        try {
            if (!name || !category || !date || !amount) {
                setFormError({
                    name: !name,
                    category: !category,
                    date: !date,
                    amount: !amount
                });
                return;
            }
            const newExpense = {
                name,
                category,
                date,
                notes,
                amount,
            };

            await axios.post("http://localhost:3001/expenses", newExpense);

            setName('');
            setCategory('');
            setDate(new Date());
            setNotes('');
            setAmount(0);
            setFormError({});

            addExpense(newExpense);

            console.log("Expense added successfully!");
        } catch (error) {
            console.error("Error adding expense:", error);
        };
    }

    return (
        <div>
            <h2>Add New Expense</h2>
            <FormControl variant="standard" sx={{display: "flex", flexDirection: "row"}}>
                <TextField 
                    required
                    error={formError.name}
                    helperText={formError.name && "Name is required."}
                    label="Name" 
                    value={name}
                    InputLabelProps={{ shrink: true }} 
                    onChange={(event) => setName(event.target.value)}
                    sx={{ marginLeft: "1em", marginRight: "1em"}}
                />
                <FormControl sx={{marginRight: "1em", minWidth: "120px"}}>
                    <InputLabel id="category-label" required>Category</InputLabel>
                    <Select 
                        required 
                        labelId="category-label"
                        id="demo-simple-select-helper"
                        onChange={handleChange} 
                        value={category} 
                        error={formError.category}
                    >
                        <MenuItem value="">Select a Category</MenuItem>
                        <MenuItem value="Housing">Housing</MenuItem>
                        <MenuItem value="Utilities">Utility</MenuItem>
                        <MenuItem value="Subscriptions">Subscription</MenuItem>
                        <MenuItem value="Entertainment">Entertainment</MenuItem>
                        <MenuItem value="Health and Wellness">Health and Wellness</MenuItem>
                    </Select>
                    <FormHelperText error>{formError.category && "Category is required."}</FormHelperText>
                </FormControl>
                <LocalizationProvider dateAdapter={ AdapterDateFns }>
                    <DatePicker 
                        required
                        error={formError.date}
                        sx={{marginRight: "1em"}} 
                        label="Date" 
                        value={date} 
                        onChange={(d) => setDate(d)}
                    />
                </LocalizationProvider>
                <TextField 
                    required
                    error={formError.amount}
                    helperText={formError.amount && "Amount is required."}
                    label="Amount" 
                    type="number"
                    value={amount}
                    InputLabelProps={{ shrink: true }} 
                    onChange={(event) => setAmount(event.target.value)}
                    sx={{marginRight: "1em"}}
                />
                <TextField 
                    label="Notes" 
                    value={notes}
                    InputLabelProps={{ shrink: true }} 
                    onChange={(event) => setNotes(event.target.value)}
                    sx={{marginRight: "1em"}}
                />
                <Button 
                    variant="contained" 
                    color="success" 
                    onClick={handleAddExpense}
                >
                    Add Expense
                </Button>
            </FormControl>
        </div>
    );
}

