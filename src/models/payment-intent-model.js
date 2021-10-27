import MoneyModel from './money-model';
import { v4 as uuidV4 } from 'uuid';

export default function PaymentIntentModel({ cart, userDetail }) {
  const toJSON = () => {
    const bill = [
      ...cart.items.map(item => {
        return {
          group: 'PRODUCTS',
          productId: item.productId,
          adjustment: {
            multiplier: 1,
            amount: MoneyModel(item.price).multiply(item.quantity.quantityNumber).toJSON()
          }
        };
      })
    ];

    const order = cart.items.map(item => {
      return {
        productId: item.productId,
        productName: item.productName,
        productCustomInfo: [],
        productGroup: item.productGroup,
        productCategory: item.productCategory,
        unitPrice: item.price,
        quantity: item.quantity
      };
    });

    return {
      data: {
        cartId: uuidV4(),
        buyer: {
          firstName: userDetail.firstName,
          lastName: userDetail.lastName
        },
        contactPhone: userDetail.contactPhone,
        shippingAddress: userDetail.address,
        order,
        bill
      }
    };
  };

  return { toJSON };
}
