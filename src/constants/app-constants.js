const AppConstants = {
  APP_NAME: 'PizzaPizza',
  APP_LOGGED_IN_USER: 'PIZZA_APP_LOGGED_IN_USER',
  APP_USER_CART: 'PIZZA_USER_CART',
  API_BASE_URL_USER_DOMAIN: process.env.API_BASE_URL_USER_DOMAIN || '//127.0.0.1:10101',
  API_BASE_URL_PRODUCT_DOMAIN: process.env.API_BASE_URL_PRODUCT_DOMAIN || '//127.0.0.1:10102'
};

export default AppConstants;
