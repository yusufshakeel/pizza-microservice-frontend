import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink
} from 'mdb-react-ui-kit';
import AppConstants from '../constants/app-constants';

function NavigationBar() {
  return (
    <MDBNavbar expand="lg" light bgColor="light" sticky>
      <MDBContainer>
        <MDBNavbarBrand href="/">{AppConstants.APP_NAME}</MDBNavbarBrand>
        <MDBNavbarNav className="d-flex w-auto">
          <MDBNavbarItem>
            <MDBNavbarLink href="/">
              <MDBIcon icon="home" fas /> Home
            </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink href="/cart">
              <MDBIcon icon="shopping-cart" fas /> Cart
            </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink href="/login">Log in</MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink href="/signup">Sign up</MDBNavbarLink>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default NavigationBar;
