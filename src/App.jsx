import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { AppProvider, AppContext } from "./context/AppContext";
import LoanCalculatorDashboard from "./components/LoanCalculatorDashboard";

const App = () => {
  return (
    <AppProvider>
      <AppContext.Consumer>
        {({ darkMode }) => (
          <ThemeProvider
            theme={createTheme({
              palette: { mode: darkMode ? "dark" : "light" },
            })}
          >
            <CssBaseline />
            <LoanCalculatorDashboard />
          </ThemeProvider>
        )}
      </AppContext.Consumer>
    </AppProvider>
  );
};

export default App;
