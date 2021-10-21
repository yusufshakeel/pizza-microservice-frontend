import { Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBInput
} from 'mdb-react-ui-kit';

function LoginPage() {
  return (
    <MDBContainer className="mt-5">
      <MDBRow className="justify-content-center">
        <MDBCol sm={4} md={4}>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle className="text-center">Login</MDBCardTitle>
              <MDBInput label="Email" id="user-email" type="email" size="lg" className="mb-3" />
              <MDBInput
                label="Password"
                id="user-password"
                type="password"
                size="lg"
                className="mb-3"
              />
              <div className="d-grid gap-2 col-12 mx-auto mb-3">
                <MDBBtn className="d-block" size="lg">
                  Login
                </MDBBtn>
              </div>
              <MDBCardText className="text-center">
                New customer? <Link to="/signup">Sign up</Link>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginPage;
