import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBRow
} from 'mdb-react-ui-kit';

import JsonParser from '../functionals/json-parser';
import AppConstants from '../constants/app-constants';
import ApiHandlers from '../api-handlers';
import StripCheckoutForm from '../components/StripeCheckoutForm';

const apiHandler = new ApiHandlers();

const stripePromise = loadStripe(AppConstants.STRIPE_PSP_PUBLIC_KEY);

function PaymentPage() {
  const paymentIntentId = new URLSearchParams(window.location.search).get('pi');
  const authToken = JsonParser(localStorage.getItem(AppConstants.APP_LOGGED_IN_USER));
  const token = authToken?.data?.token;

  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (token && paymentIntentId && !clientSecret.length) {
      (async () => {
        apiHandler.paymentApiHandler
          .commitPaymentIntent({ paymentIntentId, token })
          .then(resp => {
            if (resp.data.pspResponse.clientSecret) {
              setClientSecret(resp.data.pspResponse.clientSecret);
            }
          })
          .catch(e => console.info(e));
      })();
    }
  }, [clientSecret, paymentIntentId, token]);

  const appearance = {
    theme: 'stripe'
  };

  const options = {
    clientSecret,
    appearance
  };

  return (
    <MDBContainer className="mt-5">
      <MDBRow className="justify-content-center">
        <MDBCol sm={12} md={6}>
          <MDBCard>
            <MDBCardHeader>
              <MDBCardTitle className="text-center">Payment</MDBCardTitle>
            </MDBCardHeader>
            <MDBCardBody>
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <StripCheckoutForm
                    clientSecret={clientSecret}
                    paymentIntentId={paymentIntentId}
                  />
                </Elements>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default PaymentPage;
