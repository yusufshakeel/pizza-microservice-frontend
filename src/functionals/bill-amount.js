export default function BillAmount(bill) {
  const { adjustment: firstItemInBill } = bill[0];
  return bill.reduce(
    (sum, entry) => {
      return {
        centAmount:
          sum.centAmount + entry.adjustment.multiplier * entry.adjustment.amount.centAmount,
        fraction: sum.fraction,
        currency: sum.currency
      };
    },
    { ...firstItemInBill.amount, centAmount: 0 }
  );
}
