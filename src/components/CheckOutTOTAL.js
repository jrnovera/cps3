import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

const CheckoutButton = ({ cartItems, fetchData }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    setLoading(true);

    fetch(`${process.env.REACT_APP_API_URL}/orders/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify({ cartItems }),
    })
      .then((res) => res.json())

      .then((data) => {
        console.log(data);
        if (data.message === "Order created successfully") {
          Swal.fire({
            icon: "success",
            title: "Checkout Successful!",
            text: "Your order has been created successfully.",
          });
          // Fetch updated product data after successful checkout
        } else {
          Swal.fire({
            icon: "error",
            title: "Checkout Failed",
            text: "Failed to create the order. Please try again.",
          });
        }
      });
  };

  return (
    <Button variant="success" onClick={handleCheckout} disabled={loading}>
      {loading ? "Processing..." : "Checkout"}
    </Button>
  );
};

export default CheckoutButton;
