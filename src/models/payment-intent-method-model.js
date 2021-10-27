import MoneyModel from './money-model';

export default function PaymentIntentMethodModel({ requestedAmount }) {
  const toJSON = () => {
    return {
      data: {
        paymentServiceProviderId: '86daccee-b5ea-428b-896a-74e0bb55ea4b',
        paymentOptionId: '600be2d4-128f-424e-9850-9f215d614eb8',
        requestedAmount: MoneyModel(requestedAmount).toJSON()
      }
    };
  };

  return { toJSON };
}
