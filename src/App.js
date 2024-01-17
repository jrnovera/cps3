import "./App.css";
import AppNavbar from "./components/AppNavbar";
// import Banner from "./components/Banner";
import Home from "./pages/Home";
import { Container } from "react-bootstrap";
import Product from "./pages/Products";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Error from "./pages/Error";
import ProductView from "./pages/ProductView";
import AddProduct from "./pages/AddProduct";
import Profile from "./pages/Profile";
import Redirect from "./components/Redirect";
import CartPage from "./pages/Cart";
import CheckoutOrders from "./pages/Orders";
// npm install react-router-dom
// react-router-dom is a library for handling navigation and routing in React applications
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserProvider } from "./UserContext";
import CheckoutPage from "./pages/CheckOutPage";

/*
  <Router> serves as a container for the entire routing logic
  <Routes> is a container for organizing multiple <Route> components
  <Route> is used to define a specific route, specifying the path and the component to render when that path is matched
*/
function App() {
  const [user, setUser] = useState({ id: null, isAdmin: null });

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    console.log("State: ");
    console.log(user); // checks the state
    console.log("Local storage");
    console.log(localStorage); // checks the localStorage
  }, [user]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data._id !== "undefined") {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin,
          });
        } else {
          setUser({
            id: null,
            isAdmin: null,
          });
        }
      });
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <Container fluid>
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/products/:productId" element={<ProductView />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/get-cart" element={<CheckoutPage />} />
            <Route path="/redirect" element={<Redirect />} />
            <Route path="/orders" element={<CheckoutOrders />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
