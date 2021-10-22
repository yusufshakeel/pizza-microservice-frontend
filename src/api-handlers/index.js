import axios from 'axios';
import UserApiHandler from './user-api-handler';
import ProductApiHandler from './product-api-handler';
import AppConstants from '../constants/app-constants';

const axiosInstanceUser = new axios.create({
  baseURL: AppConstants.API_BASE_URL_USER_DOMAIN
});

const axiosInstanceProduct = new axios.create({
  baseURL: AppConstants.API_BASE_URL_PRODUCT_DOMAIN
});

function ApiHandlers() {
  this.userApiHandler = new UserApiHandler({ axiosInstance: axiosInstanceUser });
  this.productApiHandler = new ProductApiHandler({ axiosInstance: axiosInstanceProduct });
}

export default ApiHandlers;
