import MoneyModel from '../models/money-model';

function TotalAmount(itemsInCart) {
  return itemsInCart.reduce((sum, item) => {
    const { price, quantity } = item;
    const amount = MoneyModel(price).multiply(quantity.quantityNumber).asNumeric();
    return sum + amount;
  }, 0);
}

export default TotalAmount;
