import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch orders when the component mounts
    fetch(`${process.env.REACT_APP_API_URL}/orders/my-orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleHomeClick = () => {
    // Navigate to the home page
    navigate("/");
  };

  const handleProductsClick = () => {
    // Navigate to the products page
    navigate("/products");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Your Orders History</h1>
      <hr></hr>
      <h3>Your parcel is Shipping</h3>
      {orders.map((order) => (
        <Card key={order._id}>
          <Card.Body>
            <h5>Order ID: {order._id}</h5>
            <p>Total Price: ${order.totalPrice.toFixed(2)}</p>

            {/* Add more details as needed */}
          </Card.Body>
        </Card>
      ))}
      <div style={{ marginTop: "20px" }}>
        <Button onClick={handleHomeClick} style={{ marginRight: "10px" }}>
          HOME
        </Button>
        <Button onClick={handleProductsClick}>PRODUCTS</Button>
      </div>
    </div>
  );
};

export default Orders;
