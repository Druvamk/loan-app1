import React, { useContext } from "react";
import { Typography, Button, Container, TextField, Box } from "@mui/material";
import { AppContext } from "../context/AppContext";
import AmortizationTable from "./AmortizationTable";
import EmiCalculator from "./EmiCalculator";
import Header from "./Header";
// import { useLoanCalculator } from "../hooks/useLoanCalculator";
// import { useLoanCalculator } from "../hooks/useLoanCalculator";

export default function LoanCalculatorDashboard() {
  const {
    currency,
    setCurrency,
    darkMode,
    setDarkMode,
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    years,
    setYears,
    schedule,
    setSchedule,
    emi,
    setEmi,
    convertedEmi,
    setConvertedEmi,
  } = useContext(AppContext);

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
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Container>
        <Typography variant="h4" align="left" gutterBottom mt={4}>
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
        <EmiCalculator
          emi={emi}
          resetTable={resetTable}
          convertedEmi={convertedEmi}
          currency={currency}
          conversionRates={conversionRates}
          handleCurrencyChange={handleCurrencyChange}
          getCurrencySymbol={getCurrencySymbol}
        />
        <AmortizationTable schedule={schedule} currency={currency} />
      </Container>
    </>
  );
}
