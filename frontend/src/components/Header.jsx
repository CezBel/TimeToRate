import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../assets/TTRLOGO.png';


const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
          <Navbar.Brand className='mx-3' href='/'>
            <img src={logo} alt="TimeToRete" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav'/>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto mx-5'>
              <Nav.Link href='/login'>Log In</Nav.Link>
              <Nav.Link href='/signup'>Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </header>
  );
};
export default Header;