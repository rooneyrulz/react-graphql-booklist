import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';

const AppHeader = ({ auth: { isAuthenticated }, logoutUser }) => {
  const authLinks = (
    <>
      <NavLink exact to='/dashboard' className='nav-link'>
        Dashboard
      </NavLink>
      <NavLink exact to='/my-books' className='nav-link'>
        MyBooks
      </NavLink>
      <Link to='#' className='nav-link' onClick={(e) => logoutUser(e)}>
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
      <NavLink exact to='/auth' className='nav-link'>
        Get In
      </NavLink>
    </>
  );

  return (
    <Navbar variant='dark' expand='md'>
      <Container>
        <Link to='/' className='navbar-brand'>
          Book List
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(AppHeader);
