import { useContext } from 'react';
import { Link } from 'react-router-dom';
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
import AppContext from '../contexts/app-context';
import MoneyModel from '../models/money-model';
import TotalAmount from '../functionals/total-amount';

function CartPage() {
  const { cart } = useContext(AppContext);

  const total = () => {
    return cart.items?.length && TotalAmount(cart.items);
  };

  return (
    <MDBContainer className="mt-5">
      <MDBRow className="justify-content-center">
        <MDBCol sm={12} md={6}>
          <MDBCard>
            <MDBCardBody>
              <p>Min order amount &#x20B9; 300</p>
            </MDBCardBody>
          </MDBCard>
          <MDBCard>
            <MDBCardHeader>
              <MDBCardTitle>Cart</MDBCardTitle>
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
