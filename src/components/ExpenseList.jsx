import { Table, TableBody, TableCell, TableHead, TableContainer, TableRow, Paper} from "@mui/material";
import React from "react";

export const ExpenseList = ({expenses}) => {
  return (
    <div>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Notes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {expenses.map((expense, index) => (
                        <TableRow key={index}>
                            <TableCell>{expense.name}</TableCell>
                            <TableCell align="right">{expense.category}</TableCell>
                            <TableCell align="right">{new Date(expense.date).toLocaleDateString('en-US')}</TableCell>
                            <TableCell align="right">${Number(expense.amount)}</TableCell>
                            <TableCell align="right">{expense.notes}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
             </Table>
        </TableContainer>
    </div>
  );
};