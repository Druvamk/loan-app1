import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AppContext.Provider
      value={{ currency, setCurrency, darkMode, setDarkMode }}
    >
      {children}
    </AppContext.Provider>
  );
};
