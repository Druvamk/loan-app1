import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from "@mui/material";

function AmortizationTable({ schedule, currency }) {
  return (
    <>
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
    </>
  );
}

export default AmortizationTable;
