// import got from 'got';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardFooter,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBIcon,
  MDBBtn,
  MDBInput
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

import pizzaImg from '../assets/products/p-1.jpg';
import cheezeDipImg from '../assets/products/p-5.jpg';
import garlicBreadImg from '../assets/products/p-7.jpg';
import pepsi500MlImg from '../assets/products/p-8.jpg';
import bottle7Up500MlImg from '../assets/products/p-9.jpg';
import chocolateLavaCakeImg from '../assets/products/p-10.jpg';
import redVelvetCakeImg from '../assets/products/p-11.jpg';
const productsImage = {
  'p-1': pizzaImg,
  'p-2': pizzaImg,
  'p-3': pizzaImg,
  'p-4': pizzaImg,
  'p-5': cheezeDipImg,
  'p-7': garlicBreadImg,
  'p-8': pepsi500MlImg,
  'p-9': bottle7Up500MlImg,
  'p-10': chocolateLavaCakeImg,
  'p-11': redVelvetCakeImg
};

function HomePage() {
  return (
    <MDBContainer className="mt-5">
      <MDBRow>
        <MDBCol sm={12} md={3}>
          <MDBCard>
            <MDBCardHeader>
              <MDBCardTitle>Menu</MDBCardTitle>
            </MDBCardHeader>
            <MDBCardBody>
              <p>Cart is empty!</p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol sm={12} md={5}>
          <MDBRow>
            <MDBCol>
              <MDBCard className="mb-3">
                <MDBCardHeader>
                  <MDBCardTitle>Items</MDBCardTitle>
                </MDBCardHeader>
                <MDBCardBody>
                  <MDBInput label="Search" id="item-search-input" type="text" size="lg" />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol sm={12} md={12}>
              <MDBCard className="mb-3">
                <MDBRow>
                  <MDBCol md="4">
                    <MDBCardImage src={productsImage['p-1']} alt="..." fluid />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="px-0 py-2">
                      <MDBCardTitle>Veg Pizza</MDBCardTitle>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>

            <MDBCol sm={12} md={12}>
              <MDBCard className="mb-3">
                <MDBRow>
                  <MDBCol md="4">
                    <MDBCardImage src={productsImage['p-5']} alt="..." fluid />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="px-0 py-2">
                      <MDBCardTitle>Cheese Dip</MDBCardTitle>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>

            <MDBCol sm={12} md={12}>
              <MDBCard className="mb-3">
                <MDBRow>
                  <MDBCol md="4">
                    <MDBCardImage src={productsImage['p-7']} alt="..." fluid />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="px-0 py-2">
                      <MDBCardTitle>Garlic Bread</MDBCardTitle>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>

            <MDBCol sm={12} md={12}>
              <MDBCard className="mb-3">
                <MDBRow>
                  <MDBCol md="4">
                    <MDBCardImage src={productsImage['p-8']} alt="..." fluid />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="px-0 py-2">
                      <MDBCardTitle>Pepsi (500ml)</MDBCardTitle>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>

            <MDBCol sm={12} md={12}>
              <MDBCard className="mb-3">
                <MDBRow>
                  <MDBCol md="4">
                    <MDBCardImage src={productsImage['p-9']} alt="..." fluid />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="px-0 py-2">
                      <MDBCardTitle>7Up (500ml)</MDBCardTitle>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>

            <MDBCol sm={12} md={12}>
              <MDBCard className="mb-3">
                <MDBRow>
                  <MDBCol md="4">
                    <MDBCardImage src={productsImage['p-10']} alt="..." fluid />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="px-0 py-2">
                      <MDBCardTitle>Chocolate Lava Cake</MDBCardTitle>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>

            <MDBCol sm={12} md={12}>
              <MDBCard className="mb-3">
                <MDBRow>
                  <MDBCol md="4">
                    <MDBCardImage src={productsImage['p-11']} alt="..." fluid />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="px-0 py-2">
                      <MDBCardTitle>Red Velvet Cake</MDBCardTitle>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
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
                <MDBBtn tag={Link} to="/cart">
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
