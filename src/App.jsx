import React from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
} from "@mui/material";
import { AppProvider, AppContext } from "./context/AppContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoanCalculatorDashboard from "./components/LoanCalculatorDashboard";
import Header from "./components/Header";
import About from "./components/About";
import Error from "./components/Error";

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
            <Router>
              <Header />
              <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Routes>
                  <Route path="/" element={<LoanCalculatorDashboard />} />
                  <Route path="/calculator" element={<>calculator</>} />
                  <Route path="/exchange" element={<>exchange</>} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<Error />} />
                </Routes>
              </Container>
            </Router>
          </ThemeProvider>
        )}
      </AppContext.Consumer>
    </AppProvider>
  );
};

export default App;
