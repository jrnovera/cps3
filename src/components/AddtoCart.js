// AddToCartButton.js
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const AddToCartButton = ({ productId, fetchData }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Send a request to add the product to the cart
    fetch(`${process.env.REACT_APP_API_URL}/cart/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify({
        productId,
        quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.message) {
          Swal.fire({
            icon: "success",
            title: data.message,
          });

          // Fetch updated cart data
          fetchData();
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
          });
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleAddToCart}>
        <AddShoppingCartIcon />
      </Button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
      />
    </>
  );
};

export default AddToCartButton;
