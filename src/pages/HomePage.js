import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardFooter,
  MDBCardBody,
  MDBCardTitle,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import ApiHandlers from '../api-handlers';

import ProductCard from '../components/ProductCard';
import AppConstants from '../constants/app-constants';
const apiHandler = new ApiHandlers();

function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoggedIn] = useState(localStorage.getItem(AppConstants.APP_LOGGED_IN_USER) ?? false);

  useEffect(() => {
    async function fetchAllProducts() {
      const fetchedProducts = await apiHandler.productApiHandler.fetchAllProducts();
      if (fetchedProducts.data.products.length) {
        setProducts(fetchedProducts.data.products);
      }
    }
    fetchAllProducts();
  }, []);

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
            <MDBCardBody>
              <p>Cart is empty!</p>
            </MDBCardBody>
            <MDBCardFooter>
              <div className="d-grid gap-2 col-12 mx-auto">
                <MDBBtn
                  outline
                  disabled={!isLoggedIn}
                  className="btn btn-outline-primary"
                  size="lg"
                  tag={Link}
                  to="/cart"
                >
                  <MDBIcon icon="shopping-cart" fas /> Checkout
                </MDBBtn>
              </div>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default HomePage;
