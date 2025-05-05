import React, { useState } from "react";
import "./App.css";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  Container,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

export default function LoanCalculatorDashboard() {
  const [loanAmount, setLoanAmount] = useState(200000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [years, setYears] = useState(5);
  const [schedule, setSchedule] = useState([]);
  const [emi, setEmi] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [convertedEmi, setConvertedEmi] = useState(null);

  const conversionRates = {
    USD: 1,
    INR: 83.2,
    EUR: 0.93,
    GBP: 0.8,
    JPY: 154.6,
    AUD: 1.52,
    CAD: 1.36,
  };

  const getCurrencySymbol = (curr) => {
    switch (curr) {
      case "INR":
        return "₹";
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      case "JPY":
        return "¥";
      case "AUD":
        return "A$";
      case "CAD":
        return "C$";
      default:
        return "$";
    }
  };

  const calculateSchedule = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const N = years * 12;

    const EMI = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    setEmi(EMI.toFixed(2));
    const rate = conversionRates[currency];
    setConvertedEmi((EMI * rate).toFixed(2));

    let balance = P;
    const newSchedule = [];

    for (let i = 1; i <= N; i++) {
      const interest = balance * r;
      const principalPaid = EMI - interest;
      balance -= principalPaid;

      newSchedule.push({
        month: i,
        emi: (EMI * rate).toFixed(2),
        interest: (interest * rate).toFixed(2),
        principal: (principalPaid * rate).toFixed(2),
        balance: balance > 0 ? (balance * rate).toFixed(2) : "0.00",
      });
    }

    setSchedule(newSchedule);
  };

  const resetTable = () => {
    setSchedule([]);
    setEmi(null);
    setConvertedEmi(null);
  };

  const handleCurrencyChange = (e) => {
    const selected = e.target.value;
    const newRate = conversionRates[selected];
    const oldRate = conversionRates[currency];

    setCurrency(selected);

    if (emi) {
      setConvertedEmi((parseFloat(emi) * newRate).toFixed(2));

      const updatedSchedule = schedule.map((row) => ({
        ...row,
        emi: (parseFloat(emi) * newRate).toFixed(2),
        interest: ((parseFloat(row.interest) / oldRate) * newRate).toFixed(2),
        principal: ((parseFloat(row.principal) / oldRate) * newRate).toFixed(2),
        balance: ((parseFloat(row.balance) / oldRate) * newRate).toFixed(2),
      }));

      setSchedule(updatedSchedule);
    }
  };

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

      <Container>
        <Typography variant="h4" align="center" gutterBottom mt={4}>
          Loan Calculator Dashboard
        </Typography>

        <Box mb={3}>
          <Box display="flex" gap={2} mb={2}>
            <TextField
              label="Loan Amount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
            <TextField
              label="Interest Rate (%)"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
            <TextField
              label="Term (Years)"
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={calculateSchedule}
            >
              CALCULATE
            </Button>
          </Box>
        </Box>

        {emi && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={2}
            mb={3}
          >
            <Typography variant="h6">
              Monthly EMI: {getCurrencySymbol(currency)}
              {convertedEmi}
            </Typography>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Box display="flex" alignItems="center" gap={2}>
                <FormControl size="small">
                  <InputLabel>Currency</InputLabel>
                  <Select value={currency} onChange={handleCurrencyChange}>
                    {Object.keys(conversionRates).map((cur) => (
                      <MenuItem key={cur} value={cur}>
                        {cur}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Typography>
                  Converted EMI: {convertedEmi} {currency}
                </Typography>
              </Box>

              <Button variant="outlined" color="secondary" onClick={resetTable}>
                RESET TABLE
              </Button>
            </Box>
          </Box>
        )}

        {schedule.length > 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              Amortization Schedule ({currency})
            </Typography>
            <Paper style={{ maxHeight: 400, overflow: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Month</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Principal</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Interest</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Remaining Balance</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {schedule.map((row) => (
                    <TableRow key={row.month}>
                      <TableCell>{row.month}</TableCell>
                      <TableCell align="right">
                        {row.principal} {currency}
                      </TableCell>
                      <TableCell align="right">
                        {row.interest} {currency}
                      </TableCell>
                      <TableCell align="right">
                        {row.balance} {currency}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </>
        )}
      </Container>
    </>
  );
}
