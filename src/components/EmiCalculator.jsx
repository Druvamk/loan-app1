import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Button,
} from "@mui/material";

function EmiCalculator({
  emi,
  resetTable,
  convertedEmi,
  currency,
  conversionRates,
  handleCurrencyChange,
  getCurrencySymbol,
}) {
  return (
    <div>
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
    </div>
  );
}

export default EmiCalculator;
