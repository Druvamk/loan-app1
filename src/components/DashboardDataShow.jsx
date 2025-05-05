import { Box, Button, TextField } from "@mui/material";

function DashboardDataShow({
  loanAmount,
  setLoanAmount,
  interestRate,
  setInterestRate,
  setYears,
  years,
  calculateSchedule,
}) {
  return (
    <div>
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
    </div>
  );
}

export default DashboardDataShow;
