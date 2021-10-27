import axios from 'axios';
import UserApiHandler from './user-api-handler';
import ProductApiHandler from './product-api-handler';
import PaymentApiHandler from './payment-api-handler';
import AppConstants from '../constants/app-constants';

const axiosInstanceUser = new axios.create({
  baseURL: AppConstants.API_BASE_URL_USER_DOMAIN
});

const axiosInstanceProduct = new axios.create({
  baseURL: AppConstants.API_BASE_URL_PRODUCT_DOMAIN
});

const axiosInstancePayment = new axios.create({
  baseURL: AppConstants.API_BASE_URL_PAYMENT_DOMAIN
});

function ApiHandlers() {
  this.userApiHandler = new UserApiHandler({ axiosInstance: axiosInstanceUser });
  this.productApiHandler = new ProductApiHandler({ axiosInstance: axiosInstanceProduct });
  this.paymentApiHandler = new PaymentApiHandler({ axiosInstance: axiosInstancePayment });
}

export default ApiHandlers;
