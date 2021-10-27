import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCardFooter,
  MDBBtn
} from 'mdb-react-ui-kit';

import ApiHandlers from '../api-handlers';

import AppContext from '../contexts/app-context';
import MoneyModel from '../models/money-model';
import TotalAmount from '../functionals/total-amount';

import JsonParser from '../functionals/json-parser';
import AppConstants from '../constants/app-constants';
import { toast } from 'react-toastify';

const apiHandler = new ApiHandlers();

function CartPage() {
  const history = useHistory();
  const authToken = JsonParser(localStorage.getItem(AppConstants.APP_LOGGED_IN_USER));
  const { cart } = useContext(AppContext);

  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    if (!authToken?.data?.token) {
      history.push('/');
    } else {
      !userDetail?.userId &&
        (async () => {
          const fetchedProducts = await apiHandler.userApiHandler.fetchUserDetail({
            token: authToken?.data?.token
          });
          if (fetchedProducts?.data?.userId) {
            setUserDetail(fetchedProducts.data);
          } else if (fetchedProducts?.errors?.[0]?.code === 'USER_DOMAIN_AUTH_TOKEN_ERROR') {
            toast.error('Session expired!', {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: false,
              progress: undefined
            });
            localStorage.removeItem(AppConstants.APP_LOGGED_IN_USER);
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          }
        })();
    }
  }, [authToken, history, userDetail.userId]);

  const total = () => {
    return cart.items?.length && TotalAmount(cart.items);
  };

  const payHandler = () => {};

  return (
    <MDBContainer className="mt-5">
      <MDBRow className="justify-content-center">
        <MDBCol sm={12} md={6}>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Delivery Address</MDBCardTitle>
              {userDetail?.address && userDetail?.contactPhone && (
                <React.Fragment>
                  <p>
                    {userDetail.address.line1} {userDetail.address.line2} <br />
                    {userDetail.address.city} {userDetail.address.state}{' '}
                    {userDetail.address.postcode}
                  </p>
                  <p>Contact Phone: {userDetail.contactPhone.phoneNumber}</p>
                </React.Fragment>
              )}
            </MDBCardBody>
          </MDBCard>
          <MDBCard>
            <MDBCardHeader>
              <MDBCardTitle>Cart</MDBCardTitle>
              <p>Min order amount &#x20B9; 300</p>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBTable>
                <MDBTableHead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Price</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {cart.items.map(item => {
                    return (
                      <tr key={item._cardId}>
                        <td>{item.productName}</td>
                        <td>&#x20B9; {MoneyModel(item.price).asNumeric()}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td>Total</td>
                    <td>&#x20B9; {total()}</td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
              {total() < 300 && (
                <p>
                  Still need &#x20B9; {300 - total()} to place an order.{' '}
                  <Link to="/">Continue shopping.</Link>
                </p>
              )}
            </MDBCardBody>
            <MDBCardFooter>
              <div className="d-grid gap-2 col-12 mx-auto">
                <MDBBtn
                  disabled={!cart.items.length || total() < 300}
                  className="btn btn-success"
                  size="lg"
                  onClick={payHandler}
                >
                  Pay
                </MDBBtn>
              </div>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default CartPage;
