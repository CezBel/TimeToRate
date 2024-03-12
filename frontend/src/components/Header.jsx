import { Navbar, Nav, DropdownButton, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/usersApiSlice';
import logo from '../assets/TTRLOGO.png';
import SearchBox from './SearchBox';
import { logout } from '../slices/authSlice';
import { toast } from 'react-toastify';


const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [logoutUser] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // shrink header on scroll
  window.onscroll = function () {
    scrollFunction();
  };

  const scrollFunction = () => {
    if (document.documentElement.scrollTop > 50) {
      document.getElementById("img").style.width = '50px';
      document.getElementById("img").style.height = '50px';

    } else {
      document.getElementById("img").style.width = '100px';
      document.getElementById("img").style.height = '100px';
    }
  };

  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate('/');
      toast.success('Successfully Logged out');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

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
            <div>
              <SearchBox />
            </div>
            {userInfo ? (
              <DropdownButton className='mx-4' title={userInfo.name} id="username">
                <LinkContainer to='/profile'>
                  <Dropdown.Item>Profile</Dropdown.Item>
                </LinkContainer>

                <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
              </DropdownButton>
            ) : (
              <>
                <LinkContainer to='/login'>
                  <Nav.Link>Log In</Nav.Link>
                </LinkContainer>

                <LinkContainer to='/register'>
                  <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
              </>
            )}
            {userInfo && userInfo.isAdmin && (
              <DropdownButton className='me-4' title='Admin' id='adminmenu'>
                <LinkContainer to='/admin/users'>
                  <Dropdown.Item>Users</Dropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/businesses'>
                  <Dropdown.Item>Businesses</Dropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/reviews'>
                  <Dropdown.Item>Reviews</Dropdown.Item>
                </LinkContainer>
              </DropdownButton>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header >
  );
};
export default Header;