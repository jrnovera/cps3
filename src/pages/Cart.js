import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import RemoveFromCartButton from "../components/RemoveFromCartButton";

import ClearCartButton from "../components/ClearCartButton";
import { NavLink } from "react-router-dom";
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/get-cart`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching cart items");
      }

      const data = await response.json();
      console.log(data);
      setCartItems(data.items || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      // Handle errors if needed
    }
  };

  useEffect(() => {
    // Initial fetch when component mounts
    fetchData();
  }, []);
  console.log(cartItems);

  return (
    <div>
      <h1>Your Cart</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>Id</th>
            <th>Product</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.product}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.subtotal}</td>
              <td>
                <RemoveFromCartButton
                  productId={item._id}
                  fetchData={fetchData}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <ClearCartButton cartItems={cartItems} />

        <Button
          className="btn btn-success"
          style={{
            color: "white",
            fontSize: "30px",
            padding: "15px",
            textDecoration: "none",
          }}>
          {" "}
          <NavLink as={NavLink} to="/get-cart">
            Checkout
          </NavLink>
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
