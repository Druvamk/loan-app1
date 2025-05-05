import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const useLoanCalculator = (conversionRates) => {
  const { emi, setEmi, convertedEmi, setConvertedEmi, schedule, setSchedule } =
    useContext(AppContext);

  const calculateSchedule = (loanAmount, interestRate, years, currency) => {
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

  const reset = () => {
    setEmi(null);
    setConvertedEmi(null);
    setSchedule([]);
  };

  return { emi, convertedEmi, schedule, calculateSchedule, reset };
};
