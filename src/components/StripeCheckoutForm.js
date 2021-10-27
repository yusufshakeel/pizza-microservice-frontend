import React, { useState, useEffect, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import { MDBBtn } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import AppConstants from '../constants/app-constants';
import AppContext from '../contexts/app-context';
import ApiHandlers from '../api-handlers';
import JsonParser from '../functionals/json-parser';
import { useHistory } from 'react-router-dom';

const apiHandler = new ApiHandlers();

export default function StripCheckoutForm(props) {
  const history = useHistory();
  const { cart, setCart } = useContext(AppContext);

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);

  const { clientSecret, paymentIntentId } = props;
  const authToken = JsonParser(localStorage.getItem(AppConstants.APP_LOGGED_IN_USER));
  const token = authToken?.data?.token;

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {}, []);

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  };

  const handleChange = async event => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);

      toast.success('Payment successful!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
      });
      localStorage.removeItem(AppConstants.APP_USER_CART);
      setCart({ ...cart, items: [] });

      await apiHandler.paymentApiHandler.chargePaymentIntent({ paymentIntentId, token });
      setTimeout(() => {
        history.push('/');
      }, 5000);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <div className="d-grid gap-2 col-12 mx-auto">
        <MDBBtn
          className="my-3 btn btn-primary"
          size="lg"
          disabled={processing || disabled || succeeded}
          id="submit"
        >
          <span id="button-text">{processing ? 'Processing...' : 'Pay now'}</span>
        </MDBBtn>
      </div>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? 'd-block' : 'd-none'}>Thank you for placing the order!</p>
    </form>
  );
}

StripCheckoutForm.propTypes = {
  clientSecret: PropTypes.string,
  paymentIntentId: PropTypes.string
};
