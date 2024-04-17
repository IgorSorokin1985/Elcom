import React, { useContext } from "react";
import Context from "..";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, MODERATOR_ROUTE, PROFILE_ROUTE, SHOP_ROUTE, CART_ROUTE } from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";

const NavbarPage = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    return (      
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to={SHOP_ROUTE}>ELCOM</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                  <Nav.Link as={NavLink} to={SHOP_ROUTE}>Products</Nav.Link>
              </Nav>
              {user.isAuth ?
                  <Nav className="ml-auto">
                      <Button variant="outline-light" className="mr-2" onClick={() => navigate(CART_ROUTE)}>Cart</Button>
                      <Button variant="outline-light" className="mr-2" onClick={() => navigate(PROFILE_ROUTE)}>Profile Page</Button>
                      <Button variant="outline-light" onClick={() => {
                          user.setIsAuth(false);
                          user.setLastOrderID(null);
                          user.setUserID(null)
                          localStorage.removeItem('login');
                          localStorage.removeItem('password');
                          navigate(LOGIN_ROUTE)
                      }}>Log Out</Button>
                  </Nav>
                  :
                  <Nav className="ml-auto">
                      <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>Sign In</Button>
                  </Nav>
              }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}
)
export default NavbarPage;