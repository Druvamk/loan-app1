import React from "react";
import "./App.css";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  Box,
} from "@mui/material";

export default function LoanCalculatorDashboard() {
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Loan Calculator
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Button color="inherit">HOME</Button>
            <Button color="inherit">EXCHANGE RATES (LIVE)</Button>
            <Button color="inherit">ABOUT</Button>
            <Button color="inherit">ERROR PAGE</Button>
            <Switch />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
