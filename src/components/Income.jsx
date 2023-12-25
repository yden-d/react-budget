import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

export const Income = ({setIncome}) => {
    const [formError, setFormError] = useState({});
    const [amount, setAmount] = useState(0);
    
    const handleAddIncome = () => {
        if (!amount) {
            setFormError({
                amount: !amount
            });
            return;
        }
        const newIncome = amount
        setIncome(newIncome);
        
        setAmount(amount);
        setFormError({});
    };
    return (
        <div style={{ margin: "1em" }}>
            <TextField
                required
                error={formError.amount}
                helperText={formError.amount && "Amount is required."}
                label="Income" 
                type="number" 
                value={amount}
                InputLabelProps={{ shrink: true }}
                onChange={(event) => setAmount(event.target.value)}
            />
            <Button 
                variant="contained" 
                color="success" 
                sx={{ marginLeft: "1em", marginTop: "0.5em"}}
                onClick={handleAddIncome}
                >Set Income
            </Button>
        </div>
    );
}