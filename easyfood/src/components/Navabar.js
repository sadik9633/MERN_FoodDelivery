import React from 'react'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

function Navabar() {

  const location = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentEmail");
    localStorage.removeItem("currentUser");
    location('/login');
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>
            <h4 className='text-warning' style={{ fontFamily: 'cursive', fontWeight: 'bolder', width: '130px' }}>OrderOut</h4>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to={'/'}>
                <h5 className='mt-2 ms-4 fs-5'>Home</h5>
              </Link>
              {(localStorage.getItem('token')) ?
                <Link to={'/Myorder'}>
                  <h5 className='mt-2 ms-4 fs-5'>My Order</h5>
                </Link>
                : ""}
            </Nav>
            <Nav>
              {(!localStorage.getItem('token')) ?
                <Link to={'/login'}>
                  <Button className='text-white ms-3' variant="dark">Login</Button>
                </Link>
                : ""}
              {(!localStorage.getItem('token')) ?
                <Link to={'/signup'}>
                  <Button className='text-white ms-3' variant="success">Register</Button>
                </Link>
                : ""}

              {(localStorage.getItem('token')) ?
                <Link to={'/login'} onClick={handleLogout}>
                  <Button className='text-white ms-3' variant="danger" >Logout</Button>
                </Link>
                : ""}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navabar