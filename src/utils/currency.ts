export const formatCurrency = (amount: number | string, currencySymbol = '₹'): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return `${currencySymbol}0`;
  return `${currencySymbol}${num.toLocaleString('en-IN')}`;
};
