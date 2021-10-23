import { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow
} from 'mdb-react-ui-kit';

import ApiHandlers from '../api-handlers';

import ProductCard from '../components/ProductCard';
import AppConstants from '../constants/app-constants';
import AppContext from '../contexts/app-context';
import CartProductCard from '../components/CartProductCard';
import MoneyModel from '../models/money-model';

const apiHandler = new ApiHandlers();

function HomePage() {
  const { cartItems } = useContext(AppContext);

  console.info(new Date(), 'HomePage', 'entered');

  const [itemsInCart, setItemsInCart] = useState(cartItems);
  const [products, setProducts] = useState([]);
  const [isLoggedIn] = useState(localStorage.getItem(AppConstants.APP_LOGGED_IN_USER) ?? false);

  const getItemsInCart = useCallback(() => {
    return cartItems.reduce((result, cartItem) => {
      const matchingCartItem = result.find(item => item.productId === cartItem.productId);
      if (matchingCartItem) {
        const enrichedResult = result.filter(item => item.productId !== matchingCartItem.productId);
        return [
          ...enrichedResult,
          {
            ...matchingCartItem,
            quantity: {
              quantityNumber: matchingCartItem.quantity.quantityNumber + 1,
              quantityUnit: 'unit'
            }
          }
        ];
      } else {
        return [...result, cartItem];
      }
    }, []);
  }, [cartItems]);

  useEffect(() => {
    console.info(new Date(), 'HomePage', 'useEffect', 'entered');
    console.info(new Date(), 'HomePage', 'useEffect', 'cartItems', cartItems);
    !products.length &&
      (async () => {
        console.info(new Date(), 'HomePage', 'useEffect', 'fetch products...');
        // TODO: can save the product in localStorage
        const fetchedProducts = await apiHandler.productApiHandler.fetchAllProducts();
        if (fetchedProducts.data.products.length) {
          setProducts(fetchedProducts.data.products);
        }
      })();

    const items = getItemsInCart();
    setItemsInCart(items);

    console.info(new Date(), 'HomePage', 'useEffect', 'exited');
  }, [products, cartItems, getItemsInCart]);

  const totalAmount = () => {
    return itemsInCart.reduce((sum, item) => {
      const { price, quantity } = item;
      const amount = MoneyModel(price).multiply(quantity.quantityNumber).asNumeric();
      return sum + amount;
    }, 0);
  };

  return (
    <MDBContainer className="mt-5">
      <MDBRow>
        <MDBCol sm={12} md={8}>
          <MDBRow>
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </MDBRow>
        </MDBCol>

        <MDBCol sm={12} md={4}>
          <MDBCard>
            <MDBCardHeader>
              <MDBCardTitle>Cart</MDBCardTitle>
            </MDBCardHeader>
            <MDBCardBody style={{ maxHeight: '300px', overflow: 'scroll' }}>
              {itemsInCart.length ? (
                itemsInCart.map((item, index) => <CartProductCard key={index} product={item} />)
              ) : (
                <div className="text-center">
                  <MDBIcon icon="shopping-cart" fas style={{ fontSize: '2em' }} />
                </div>
              )}
            </MDBCardBody>
            <MDBCardFooter>
              <div className="py-3">
                <p>Total &#x20B9; {totalAmount()}</p>
              </div>
              <div className="d-grid gap-2 col-12 mx-auto">
                {!isLoggedIn ? (
                  <MDBBtn
                    outline
                    className="btn btn-outline-primary"
                    size="lg"
                    tag={Link}
                    to="/login"
                  >
                    <MDBIcon icon="user" fas /> Login
                  </MDBBtn>
                ) : (
                  <MDBBtn
                    outline
                    disabled={!itemsInCart.length}
                    className="btn btn-outline-primary"
                    size="lg"
                    tag={Link}
                    to="/cart"
                  >
                    Checkout
                  </MDBBtn>
                )}
              </div>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default HomePage;
