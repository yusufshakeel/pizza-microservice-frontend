import { useContext } from 'react';
import PropTypes from 'prop-types';

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCol,
  MDBIcon,
  MDBRow
} from 'mdb-react-ui-kit';

import pizzaImg from '../assets/products/p-1.jpg';
import cheezeDipImg from '../assets/products/p-5.jpg';
import garlicBreadImg from '../assets/products/p-7.jpg';
import pepsi500MlImg from '../assets/products/p-8.jpg';
import bottle7Up500MlImg from '../assets/products/p-9.jpg';
import chocolateLavaCakeImg from '../assets/products/p-10.jpg';
import redVelvetCakeImg from '../assets/products/p-11.jpg';

import MoneyModel from '../models/money-model';
import AppContext from '../contexts/app-context';
import AppConstants from '../constants/app-constants';

const productsImage = {
  'p-1': pizzaImg,
  'p-2': pizzaImg,
  'p-3': pizzaImg,
  'p-4': pizzaImg,
  'p-5': cheezeDipImg,
  'p-6': garlicBreadImg,
  'p-7': garlicBreadImg,
  'p-8': pepsi500MlImg,
  'p-9': bottle7Up500MlImg,
  'p-10': chocolateLavaCakeImg,
  'p-11': redVelvetCakeImg
};

function ProductCard(props) {
  const { cart, setCart } = useContext(AppContext);
  const { productId, productName, productGroup, price } = props.product;

  const isVeg = group => {
    const match = [
      { type: 'VEG', color: '#008000' },
      { type: 'NON VEG', color: '#ad4720' }
    ].find(record => record.type === group);

    return (
      <span
        style={{
          color: match.color,
          border: `1px solid ${match.color}`,
          padding: '2px',
          fontSize: '10px'
        }}
      >
        <MDBIcon icon="circle" fas />
      </span>
    );
  };

  const removeItemFromCartHandler = item => {
    const { cardId } = item.target.dataset;
    const updatedCart = {
      updatedAt: new Date().getTime(),
      items: cart.items.filter(({ _cardId }) => _cardId !== cardId)
    };
    setCart(updatedCart);
    localStorage.setItem(AppConstants.APP_USER_CART, JSON.stringify(updatedCart));
  };

  return (
    <MDBCol sm={12} md={12}>
      <MDBCard className="mb-3">
        <MDBRow>
          <MDBCol md="4">
            <MDBCardImage src={productsImage[productId]} alt={productName} fluid />
          </MDBCol>
          <MDBCol md="8">
            <MDBCardBody className="px-0 py-2">
              <div>
                {isVeg(productGroup)}
                <MDBBtn
                  onClick={removeItemFromCartHandler}
                  data-card-id={props.cardId}
                  className="float-end m-1 px-2 py-1 btn btn-outline-dark"
                  outline
                  size="sm"
                >
                  <MDBIcon fas icon="times" />
                </MDBBtn>
              </div>
              <MDBCardTitle>{productName}</MDBCardTitle>
              <p className="text-right">&#x20B9; {MoneyModel(price).asNumeric()}</p>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBCol>
  );
}

ProductCard.propTypes = {
  cardId: PropTypes.string,
  product: PropTypes.shape({
    productId: PropTypes.string,
    productName: PropTypes.string,
    productGroup: PropTypes.string,
    price: PropTypes.shape({
      centAmount: PropTypes.number,
      fraction: PropTypes.number,
      currency: PropTypes.string
    }),
    quantity: PropTypes.shape({
      quantityNumber: PropTypes.number,
      quantityUnit: PropTypes.string
    })
  })
};

export default ProductCard;
