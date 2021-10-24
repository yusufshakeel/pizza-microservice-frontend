import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

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
        console.info(new Date(), 'UserPage', 'useEffect', 'fetch user...');
        const fetchedProducts = await apiHandler.userApiHandler.fetchUserDetail({
          token: authToken.data.token
        });
        console.info(new Date(), 'UserPage', 'useEffect', 'fetch user...', fetchedProducts);
        if (fetchedProducts?.data?.userId) {
          console.info(new Date(), 'UserPage', 'useEffect', 'user found!', fetchedProducts);
          setUserDetail(fetchedProducts.data);
        } else {
          console.info(new Date(), 'UserPage', 'useEffect', 'auth failed!', fetchedProducts);
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
