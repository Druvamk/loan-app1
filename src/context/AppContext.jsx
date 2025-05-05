import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [darkMode, setDarkMode] = useState(false);
  const [loanAmount, setLoanAmount] = useState(200000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [years, setYears] = useState(5);
  const [schedule, setSchedule] = useState([]);
  const [emi, setEmi] = useState(null);
  const [convertedEmi, setConvertedEmi] = useState(null);

  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
