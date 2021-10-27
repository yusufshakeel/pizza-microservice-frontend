import AxiosHttpAction from './axios-http-action';

function PaymentApiHandler({ axiosInstance }) {
  const httpAction = AxiosHttpAction(axiosInstance);

  this.createPaymentIntent = async function createPaymentIntent({ paymentIntent, token }) {
    return await httpAction.post({
      method: 'post',
      url: `/payment/v1/payments/payment-intents`,
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(paymentIntent)
    });
  };

  this.createPaymentIntentMethod = async function createPaymentIntentMethod({
    paymentIntentId,
    paymentIntentMethod,
    token
  }) {
    return await httpAction.post({
      method: 'post',
      url: `/payment/v1/payments/payment-intents/${paymentIntentId}/payment-intent-methods`,
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(paymentIntentMethod)
    });
  };

  this.commitPaymentIntent = async function commitPaymentIntent({ paymentIntentId, token }) {
    return await httpAction.post({
      method: 'post',
      url: `/payment/v1/payments/payment-intents/${paymentIntentId}/commit`,
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({})
    });
  };

  this.chargePaymentIntent = async function chargePaymentIntent({ paymentIntentId, token }) {
    return await httpAction.post({
      method: 'post',
      url: `/payment/v1/payments/payment-intents/${paymentIntentId}/charge`,
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({})
    });
  };
}

export default PaymentApiHandler;
