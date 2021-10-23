export default function MoneyModel({ centAmount, fraction, currency }) {
  const asNumeric = () => {
    return Number(centAmount / fraction);
  };

  const multiply = multiplier => {
    return MoneyModel({
      centAmount: centAmount * multiplier,
      fraction,
      currency
    });
  };

  const toJSON = () => {
    return { centAmount, fraction, currency };
  };

  return { asNumeric, toJSON, multiply };
}
