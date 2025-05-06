import React from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

function About() {
  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          About This Application
        </Typography>

        <Typography variant="body1" paragraph>
          This Loan Calculator helps users estimate their monthly EMI (Equated
          Monthly Installment) based on the loan amount, interest rate, and loan
          term. It also provides an amortization schedule and supports live
          currency conversion for multiple international currencies.
        </Typography>

        <Typography variant="body1" paragraph>
          The application is built using modern frontend technologies and
          follows modular coding practices with state management handled via
          React's Context API and custom hooks.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Key Features
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText primary="Real-time EMI and amortization schedule calculation" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Multi-currency support with conversion on the fly" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Dark mode toggle using Context API" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Modular structure with custom React hooks" />
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom>
          Tech Stack
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText primary="React.js (Functional Components with Hooks)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Material UI (MUI) for UI components and theming" />
          </ListItem>
          <ListItem>
            <ListItemText primary="React Context API for global state management (currency & theme)" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Custom React Hook (`useLoanCalculator`) for EMI and schedule logic" />
          </ListItem>
          <ListItem>
            <ListItemText primary="exchangerate.host (optional) for live currency rates" />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}

export default About;
