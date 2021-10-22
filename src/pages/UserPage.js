import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardFooter,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';
import AppConstants from '../constants/app-constants';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

function UserPage() {
  const history = useHistory();
  const [authToken] = useState(localStorage.getItem(AppConstants.APP_LOGGED_IN_USER));

  useEffect(() => {
    !authToken && history.push('/');
  }, [authToken, history]);

  const logoutHandler = () => {
    localStorage.removeItem(AppConstants.APP_LOGGED_IN_USER);
    window.location.reload();
  };

  return (
    <MDBContainer className="mt-5">
      <MDBRow className="justify-content-center">
        <MDBCol sm={4} md={4}>
          <MDBCard>
            <MDBCardHeader>
              <MDBCardTitle>User</MDBCardTitle>
            </MDBCardHeader>
            <MDBCardBody>Card body</MDBCardBody>
            <MDBCardFooter className="d-flex justify-content-end">
              <MDBBtn onClick={logoutHandler} outline className="btn btn-outline-dark" size="lg">
                Logout
              </MDBBtn>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default UserPage;
