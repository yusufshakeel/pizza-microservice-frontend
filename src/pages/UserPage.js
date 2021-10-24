import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBTable,
  MDBTableBody
} from 'mdb-react-ui-kit';

import ApiHandlers from '../api-handlers';
import AppConstants from '../constants/app-constants';
import JsonParser from '../functionals/json-parser';

const apiHandler = new ApiHandlers();

function UserPage() {
  const history = useHistory();
  const [authToken] = useState(JsonParser(localStorage.getItem(AppConstants.APP_LOGGED_IN_USER)));
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    if (!authToken?.data?.token) {
      history.push('/');
    } else {
      (async () => {
        const fetchedProducts = await apiHandler.userApiHandler.fetchUserDetail({
          token: authToken.data.token
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
  }, [authToken, history]);

  const logoutHandler = () => {
    localStorage.removeItem(AppConstants.APP_LOGGED_IN_USER);
    window.location.reload();
  };

  return (
    <MDBContainer className="mt-5">
      <MDBRow className="justify-content-center">
        <MDBCol sm={12} md={6}>
          <MDBCard>
            <MDBCardHeader>
              <MDBCardTitle>
                User
                <MDBBtn
                  onClick={logoutHandler}
                  outline
                  className="btn btn-outline-dark float-end"
                  size="lg"
                >
                  Logout
                </MDBBtn>
              </MDBCardTitle>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBTable>
                <MDBTableBody>
                  {userDetail?.firstName && (
                    <React.Fragment>
                      <tr>
                        <td>First Name</td>
                        <td>{userDetail.firstName}</td>
                      </tr>
                      <tr>
                        <td>Last Name</td>
                        <td>{userDetail.lastName}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{userDetail.emailAddress}</td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td>
                          {userDetail.contactPhone.countryCode}{' '}
                          {userDetail.contactPhone.phoneNumber}
                        </td>
                      </tr>
                    </React.Fragment>
                  )}
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
          </MDBCard>

          <MDBCard>
            <MDBCardHeader>
              <MDBCardTitle>Address</MDBCardTitle>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBTable>
                <MDBTableBody>
                  {userDetail?.address && (
                    <React.Fragment>
                      <tr>
                        <td>Line 1</td>
                        <td>{userDetail.address.line1}</td>
                      </tr>
                      <tr>
                        <td>Line 2</td>
                        <td>{userDetail.address.line2}</td>
                      </tr>
                      <tr>
                        <td>City</td>
                        <td>{userDetail.address.city}</td>
                      </tr>
                      <tr>
                        <td>State</td>
                        <td>{userDetail.address.state}</td>
                      </tr>
                      <tr>
                        <td>Pincode</td>
                        <td>{userDetail.address.postcode}</td>
                      </tr>
                      <tr>
                        <td>Country</td>
                        <td>{userDetail.address.country}</td>
                      </tr>
                    </React.Fragment>
                  )}
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default UserPage;
