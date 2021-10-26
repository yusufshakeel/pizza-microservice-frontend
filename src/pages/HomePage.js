import { useContext, useEffect, useState } from 'react';
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
import TotalAmount from '../functionals/total-amount';

const apiHandler = new ApiHandlers();

function HomePage() {
  const { cart } = useContext(AppContext);

  console.info(new Date(), 'HomePage', 'entered');

  const [itemsInCart, setItemsInCart] = useState(cart);
  const [products, setProducts] = useState([]);
  const isLoggedIn = localStorage.getItem(AppConstants.APP_LOGGED_IN_USER) || false;

  useEffect(() => {
    console.info(new Date(), 'HomePage', 'useEffect', 'entered');
    console.info(new Date(), 'HomePage', 'useEffect', 'cart', cart);
    !products.length &&
      (async () => {
        console.info(new Date(), 'HomePage', 'useEffect', 'fetch products...');
        const fetchedProducts = await apiHandler.productApiHandler.fetchAllProducts();
        if (fetchedProducts.data.products.length) {
          setProducts(fetchedProducts.data.products);
        }
      })();

    setItemsInCart(cart);

    console.info(new Date(), 'HomePage', 'useEffect', 'exited');
  }, [products, cart.updatedAt, cart]);

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
              {itemsInCart.items.length ? (
                itemsInCart.items.map((item, index) => {
                  return <CartProductCard cardId={item._cardId} key={index} product={item} />;
                })
              ) : (
                <div className="text-center">
                  <MDBIcon icon="shopping-cart" fas style={{ fontSize: '2em' }} />
                </div>
              )}
            </MDBCardBody>
            <MDBCardFooter>
              <div className="py-3">
                <h5>Subtotal &#x20B9; {TotalAmount(itemsInCart.items)}</h5>
                <p>
                  <small>Price may change.</small>
                </p>
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
                    disabled={!itemsInCart.items.length}
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
