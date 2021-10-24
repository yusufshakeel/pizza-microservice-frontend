import AxiosHttpAction from './axios-http-action';

function ProductApiHandler({ axiosInstance }) {
  const httpAction = AxiosHttpAction(axiosInstance);
  this.fetchAllProducts = async function fetchAllProducts() {
    return await httpAction.get({
      url: `/product/v1/products`
    });
  };
}

export default ProductApiHandler;
