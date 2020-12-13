import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const AppHeader = () => {
  const [isAuth, setIsAuth] = React.useState(null);

  const onLogIn = (e) => setIsAuth((prev) => true);
  const onLogOut = (e) => setIsAuth((prev) => false);

  const authLinks = (
    <>
      <NavLink exact to='/dashboard' className='nav-link'>
        Dashboard
      </NavLink>
      <NavLink exact to='/my-books' className='nav-link'>
        MyBooks
      </NavLink>
      <Link to='#' className='nav-link' onClick={(e) => onLogOut(e)}>
        Logout
      </Link>
    </>
  );

  const guestLinks = (
    <>
      <NavLink exact to='/' className='nav-link'>
        Home
      </NavLink>
      <NavLink exact to='/books' className='nav-link'>
        Books
      </NavLink>
      <NavLink exact to='/register' className='nav-link'>
        Register
      </NavLink>
      <NavLink
        exact
        to='/login'
        className='nav-link'
        onClick={(e) => onLogIn(e)}
      >
        Login
      </NavLink>
    </>
  );

  return (
    <Navbar bg='light' expand='md'>
      <Container>
        <Link to='/' className='navbar-brand'>
          Book List
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>{isAuth ? authLinks : guestLinks}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppHeader;
