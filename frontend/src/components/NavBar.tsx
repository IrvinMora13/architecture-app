import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [auth, setAuth] = useState(isAuthenticated);

  useEffect(() => {
    setAuth(isAuthenticated); 
  }, [isAuthenticated]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">LogoName</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="col mx-auto justify-content-center">
            <Nav.Link as={Link} to="/" active>Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
          <Nav>
            {auth ? (
              <Button
                variant="outline-danger"
                onClick={() => {
                  logout();
                  navigate("/login"); 
                }}
              >
                Logout
              </Button>
            ) : (
              <Button variant="outline-primary" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
