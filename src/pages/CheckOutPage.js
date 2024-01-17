// CheckoutPage.js
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import CheckoutAndTotalButton from "../components/CheckOutTOTAL";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Fetch cart items from the server
    fetch(`${process.env.REACT_APP_API_URL}/cart/get-cart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Update state with cart items
        setCartItems(data.items || []);
        setTotalPrice(data.totalPrice || 0);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
        // Handle errors if needed
      });
  }, []);

  return (
    <div>
      <h1>Checkout</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>Product</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.productId}>
              <td>{item.product}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>${item.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-end">
        <h4>Total Price: ${totalPrice}</h4>
        <Link to="/orders">
          <CheckoutAndTotalButton cartItems={cartItems} />
        </Link>
      </div>
    </div>
  );
};

export default CheckoutPage;
