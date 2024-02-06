import { Navbar, Nav } from 'react-bootstrap';
import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/TTRLOGO.png';


const Header = () => {

  useEffect(() => {
    window.onscroll = function() {
      scrollFunction();
    };

    function scrollFunction() {
      if (document.documentElement.scrollTop > 50) {
        document.getElementById("img").style.width = '50px';
        document.getElementById("img").style.height = '50px';
      
      } else {
        document.getElementById("img").style.width = '100px';
        document.getElementById("img").style.height = '100px';
      }
    }
  }, []);

  return (
    <header id='header'>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <LinkContainer to='/'>
          <Navbar.Brand className='mx-3'>
            <img id='img' src={logo} alt="TimeToRete" />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto mx-5'>
            <LinkContainer to='/login'>
              <Nav.Link>Log In</Nav.Link>
            </LinkContainer>

            <LinkContainer to='/signup'>
              <Nav.Link>Sign Up</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};
export default Header;