import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

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
  MDBInputGroupElement,
  MDBCardSubTitle
} from 'mdb-react-ui-kit';

import AppConstants from '../constants/app-constants';
import AlertError from '../components/AlertError';

import ApiHandlers from '../api-handlers';
const apiHandler = new ApiHandlers();

function SignupPage() {
  const history = useHistory();
  const [authToken] = useState(localStorage.getItem(AppConstants.APP_LOGGED_IN_USER));

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    authToken && history.push('/');
  }, [authToken, history]);

  const signUpHandler = async ev => {
    ev.preventDefault();

    setErrorMessage('');

    const emailAvailable = await apiHandler.userApiHandler.isEmailAvailable(email);
    if (!emailAvailable?.data?.isAvailable) {
      setErrorMessage('Email is already registered. Try another.');
      return false;
    }

    const contactPhoneAvailable = await apiHandler.userApiHandler.isContactPhoneAvailable({
      countryCode: '91',
      phoneNumber: phone
    });
    if (!contactPhoneAvailable?.data?.isAvailable) {
      setErrorMessage('Phone is already registered. Try another.');
      return false;
    }

    const userDataforSignUp = {
      firstName,
      lastName,
      emailAddress: email,
      password,
      contactPhone: {
        countryCode: '91',
        phoneNumber: phone
      },
      address: {
        line1,
        line2,
        city,
        state,
        country: 'IND',
        postcode: pincode
      }
    };

    const createdUser = await apiHandler.userApiHandler.signUp(userDataforSignUp);
    if (createdUser?.data?.userId) {
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } else {
      setErrorMessage(createdUser?.errors?.[0]?.message);
      return false;
    }
  };

  return (
    <MDBContainer className="mt-5">
      <MDBRow className="justify-content-center">
        <MDBCol sm={4} md={4}>
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle className="text-center">Sign up</MDBCardTitle>
              <form onSubmit={signUpHandler}>
                <MDBInputGroup size="lg">
                  <MDBInputGroupText>+91</MDBInputGroupText>
                  <MDBInputGroupElement
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    type="text"
                    placeholder="Phone"
                    className="mb-3"
                  />
                </MDBInputGroup>
                <MDBInput
                  required
                  label="Email"
                  id="user-email"
                  type="email"
                  size="lg"
                  className="mb-3"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <MDBInput
                  label="Password"
                  id="user-password"
                  autoComplete="on"
                  type="password"
                  size="lg"
                  className="mb-3"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <MDBInput
                  label="First Name"
                  id="user-firstName"
                  type="text"
                  size="lg"
                  className="mb-3"
                  required
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
                <MDBInput
                  label="Last Name"
                  id="user-lastName"
                  type="text"
                  size="lg"
                  className="mb-3"
                  required
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
                <MDBCardSubTitle className="my-3">Address</MDBCardSubTitle>
                <MDBInput
                  label="Line 1"
                  id="user-address-line1"
                  type="text"
                  size="lg"
                  className="mb-3"
                  required
                  value={line1}
                  onChange={e => setLine1(e.target.value)}
                />
                <MDBInput
                  label="Line 2"
                  id="user-address-line2"
                  type="text"
                  size="lg"
                  className="mb-3"
                  required
                  value={line2}
                  onChange={e => setLine2(e.target.value)}
                />
                <MDBInput
                  label="City"
                  id="user-address-city"
                  type="text"
                  size="lg"
                  className="mb-3"
                  required
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
                <MDBInput
                  label="State"
                  id="user-address-state"
                  type="text"
                  size="lg"
                  className="mb-3"
                  required
                  value={state}
                  onChange={e => setState(e.target.value)}
                />
                <MDBInput
                  label="Pincode"
                  id="user-address-pincode"
                  type="text"
                  size="lg"
                  className="mb-3"
                  required
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                />
                <MDBInput
                  label="Country"
                  id="user-address-country"
                  type="text"
                  size="lg"
                  className="mb-3"
                  readOnly
                  value="India"
                />
                <div className="d-grid gap-2 col-12 mx-auto mb-3">
                  <MDBBtn className="d-block" size="lg">
                    Sign up
                  </MDBBtn>
                </div>
              </form>
              {errorMessage && <AlertError className="my-3" message={errorMessage} />}
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
