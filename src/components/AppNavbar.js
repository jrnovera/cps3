import React, { useContext } from "react";
import {
  Container,
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import UserContext from "../UserContext";
import MobileFriendlyOutlinedIcon from "@mui/icons-material/MobileFriendlyOutlined";
export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar expand="lg" bg="dark" variant="dark" style={{ padding: "20px" }}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          GadgetCo.
          <MobileFriendlyOutlinedIcon />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products">
              Product
            </Nav.Link>
            {user.id !== null ? (
              user.isAdmin === true ? (
                <>
                  <Nav.Link as={NavLink} to="/addProduct">
                    AddProduct
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/profile">
                    Profile
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/logout">
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/profile">
                    Profile
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/cart">
                    <ShoppingCartIcon />
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/logout">
                    Logout
                  </Nav.Link>
                </>
              )
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
          <Form className="d-flex">
            {/* <FormControl type="text" placeholder="Search" className="mr-2" />
            <Button variant="outline-success">Search</Button> */}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
