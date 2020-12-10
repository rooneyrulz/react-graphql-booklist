import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const AppHeader = () => {
  return (
    <Navbar bg='light' expand='md'>
      <Container>
        <Link to='/' className='navbar-brand'>
          Book List
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <NavLink exact to='/register' className='nav-link'>
              Register
            </NavLink>
            <NavLink exact to='/login' className='nav-link'>
              Login
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppHeader;
