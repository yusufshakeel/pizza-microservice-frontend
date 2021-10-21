import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBCollapse,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink
} from 'mdb-react-ui-kit';
import AppConstants from '../constants/app-constants';

function NavigationBar() {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <MDBNavbar expand="lg" light bgColor="light" sticky>
      <MDBContainer>
        <MDBNavbarBrand tag={Link} to="/">
          {AppConstants.APP_NAME}
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="d-flex justify-content-end">
            <MDBNavbarItem>
              <MDBNavbarLink tag={Link} to="/">
                <MDBIcon icon="home" fas /> Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink tag={Link} to="/cart">
                <MDBIcon icon="shopping-cart" fas /> Cart
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink tag={Link} to="/login">
                <MDBIcon icon="user" fas /> Login
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default NavigationBar;
