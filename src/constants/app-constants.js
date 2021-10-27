// for local kubernetes
const API_BASE_URL = 'https://pizza.localdev';
const STRIPE_PUBLIC_KEY = 'public-key';

const AppConstants = {
  APP_NAME: 'PizzaPizza',
  APP_LOGGED_IN_USER: 'PIZZA_APP_LOGGED_IN_USER',
  APP_USER_CART: 'PIZZA_USER_CART',
  API_BASE_URL_USER_DOMAIN: API_BASE_URL || '//127.0.0.1:10101',
  API_BASE_URL_PRODUCT_DOMAIN: API_BASE_URL || '//127.0.0.1:10102',
  API_BASE_URL_PAYMENT_DOMAIN: API_BASE_URL || '//127.0.0.1:10104',
  STRIPE_PSP_PUBLIC_KEY: STRIPE_PUBLIC_KEY
};

export default AppConstants;
