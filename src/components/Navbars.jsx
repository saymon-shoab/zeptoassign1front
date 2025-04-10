import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';



const Navbars = () => {
  return (
<Navbar expand="lg" className="bg-body-tertiary">
  <Container>
    <Navbar.Brand as={Link} to="/">Zepto-Assign-1</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/">Font List</Nav.Link>
        <Nav.Link as={Link} to="/fontgroup">Font Group</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>



  );
};

export default Navbars;
