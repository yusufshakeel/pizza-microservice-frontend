import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBInputGroup,
  MDBInputGroupText,
  MDBInputGroupElement
} from 'mdb-react-ui-kit';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppConstants from '../constants/app-constants';

function SignupPage() {
  const history = useHistory();
  const [authToken] = useState(localStorage.getItem(AppConstants.APP_LOGGED_IN_USER));

  useEffect(() => {
    authToken && history.push('/');
  }, [authToken, history]);

  return (
    <MDBContainer className="mt-5">
      <MDBRow className="justify-content-center">
        <MDBCol sm={4} md={4}>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle className="text-center">Sign up</MDBCardTitle>
              <MDBInputGroup size="lg">
                <MDBInputGroupText>+91</MDBInputGroupText>
                <MDBInputGroupElement type="text" placeholder="Phone" className="mb-3" />
              </MDBInputGroup>
              <MDBInput label="Email" id="user-email" type="email" size="lg" className="mb-3" />
              <MDBInput
                label="Password"
                id="user-password"
                type="password"
                size="lg"
                className="mb-3"
              />
              <MDBInput
                label="First Name"
                id="user-firstName"
                type="text"
                size="lg"
                className="mb-3"
              />
              <MDBInput
                label="Last Name"
                id="user-lastName"
                type="text"
                size="lg"
                className="mb-3"
              />
              <div className="d-grid gap-2 col-12 mx-auto mb-3">
                <MDBBtn className="d-block" size="lg">
                  Sign up
                </MDBBtn>
              </div>
              <MDBCardText className="text-center">
                Already have an account? <Link to="/login">Login</Link>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default SignupPage;
