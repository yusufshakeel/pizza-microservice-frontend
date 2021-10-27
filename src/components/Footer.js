import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

function NavigationBar() {
  return (
    <MDBContainer
      fluid
      style={{ marginTop: '50px', padding: '10px', height: '200px' }}
      className="bg-light"
    >
      <MDBRow>
        <MDBCol>
          <div className="text-center">
            <p>PizzaPizza</p>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default NavigationBar;
