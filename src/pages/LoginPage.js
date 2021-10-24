import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
import AppConstants from '../constants/app-constants';
import AlertError from '../components/AlertError';

import ApiHandlers from '../api-handlers';
const apiHandler = new ApiHandlers();

function LoginPage() {
  const history = useHistory();
  const [authToken] = useState(localStorage.getItem(AppConstants.APP_LOGGED_IN_USER));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState(null);

  useEffect(() => {
    authToken && history.push('/');
  }, [authToken, history]);

  const isLoginInputValid = () => {
    if (!email.length) {
      setLoginErrorMessage('Email is required!');
      return false;
    }
    if (!password.length) {
      setLoginErrorMessage('Password is required!');
      return false;
    }
    setLoginErrorMessage(null);
    return true;
  };

  const loginHandler = async event => {
    event.preventDefault();

    setLoginErrorMessage('');

    if (!isLoginInputValid()) {
      return;
    }

    const result = await apiHandler.userApiHandler.login({ email, password });
    if (result?.data?.token) {
      localStorage.setItem(AppConstants.APP_LOGGED_IN_USER, JSON.stringify(result));
      window.location.reload();
    } else {
      setLoginErrorMessage(result?.errors?.[0]?.message);
      return false;
    }
  };

  return (
    <MDBContainer className="mt-5">
      <MDBRow className="justify-content-center">
        <MDBCol sm={4} md={4}>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle className="text-center">Login</MDBCardTitle>
              <form onSubmit={loginHandler}>
                <MDBInput
                  label="Email"
                  id="user-email"
                  type="email"
                  size="lg"
                  className="mb-3"
                  value={email}
                  required
                  onChange={e => setEmail(e.target.value)}
                />
                <MDBInput
                  label="Password"
                  id="user-password"
                  size="lg"
                  className="mb-3"
                  type="password"
                  name="password"
                  autoComplete="on"
                  value={password}
                  required
                  onChange={e => setPassword(e.target.value)}
                />
                <div className="d-grid gap-2 col-12 mx-auto mb-3">
                  <MDBBtn className="d-block" size="lg">
                    Login
                  </MDBBtn>
                </div>
              </form>
              {loginErrorMessage && <AlertError className="my-3" message={loginErrorMessage} />}
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
