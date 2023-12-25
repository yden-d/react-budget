import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts";
import { TableContainer, Paper, Table, TableBody, TableHead, TableCell, TableRow } from "@mui/material";

export const Budget = ({ expenses, income }) => {
  const [totalExpenses, setTotalExpenses] = useState([]);

  useEffect(() => {
    const updatedTotalExpenses = calculateTotalExpenses();
    setTotalExpenses(updatedTotalExpenses);
  }, [expenses]);

  const calculateTotalExpenses = () => {
    const totalExpenses = {};

    expenses.forEach((expense) => {
      const { category, amount } = expense;
      totalExpenses[category] = (totalExpenses[category] || 0) + Number(amount);
    });

    return Object.entries(totalExpenses).map(([category, amount]) => ({
      label: category,
      value: Number(amount),
    }));
  };

  const disposableIncome = income - totalExpenses.reduce((total, entry) => total + entry.value, 0);

  return (
    <div>
      <h2>Your Budget Report</h2>
      <div style={{ display: "flex", alignItems: "flex-start"}}>
      <TableContainer component={Paper} sx={{maxWidth: "30%"}}>
          <Table>
              <TableHead>
                  <TableRow>
                      <TableCell>Category</TableCell>
                      <TableCell>Total</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {totalExpenses.map((entry) => (
                      <TableRow key={entry.label}>
                          <TableCell>{entry.label}</TableCell>
                          <TableCell>${entry.value}</TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
      </TableContainer>
      <div style={{ width: "60%" }}>
        <PieChart
            series={[
            {
                data: totalExpenses,
                cx: 200,
                cy: 100,
                innerRadius: 40,
                outerRadius: 80,
            },
            ]}
            height={300}
            slotProps={{
            }}
        />
      </div>
      </div>
      <h2 color="red" style={{ marginTop: "0em"}}>Disposable income: ${disposableIncome} </h2>
    </div>
  );
};
