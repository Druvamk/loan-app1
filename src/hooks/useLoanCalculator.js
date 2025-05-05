export const useLoanCalculator = (conversionRates) => {
  const calculateSchedule = (loanAmount, interestRate, years, currency) => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const N = years * 12;

    const EMI = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    const convertedEmi = (EMI * conversionRates[currency]).toFixed(2);

    let balance = P;
    const newSchedule = [];

    for (let i = 1; i <= N; i++) {
      const interest = balance * r;
      const principalPaid = EMI - interest;
      balance -= principalPaid;

      newSchedule.push({
        month: i,
        emi: convertedEmi,
        interest: (interest * conversionRates[currency]).toFixed(2),
        principal: (principalPaid * conversionRates[currency]).toFixed(2),
        balance:
          balance > 0
            ? (balance * conversionRates[currency]).toFixed(2)
            : "0.00",
      });
    }

    return {
      emi: EMI.toFixed(2),
      convertedEmi,
      schedule: newSchedule,
    };
  };

  const convertSchedule = (schedule, oldRate, newRate, baseEmi) => {
    const newConvertedEmi = (parseFloat(baseEmi) * newRate).toFixed(2);
    const updated = schedule.map((row) => ({
      ...row,
      emi: newConvertedEmi,
      interest: ((parseFloat(row.interest) / oldRate) * newRate).toFixed(2),
      principal: ((parseFloat(row.principal) / oldRate) * newRate).toFixed(2),
      balance: ((parseFloat(row.balance) / oldRate) * newRate).toFixed(2),
    }));
    return { convertedEmi: newConvertedEmi, updated };
  };

  return { calculateSchedule, convertSchedule };
};
