export const calculateTaxBracket = (income: number): string => {
  if (income < 10000) return "0%";
  if (income < 50000) return "10%";
  if (income < 100000) return "15%";
  if (income < 200000) return "25%";
  return "35%";
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};