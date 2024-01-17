// ClearCartButton.js
import React from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

const ClearCartButton = ({ removeAll }) => {
  const handleClearCart = () => {
    fetch(`${process.env.REACT_APP_API_URL}/cart/clear-cart`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.message) {
          Swal.fire({
            icon: "success",
            title: data.message,
          });
          window.location.reload();

          removeAll();
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
          });
        }
      })
      .catch((error) => {
        console.error("Error clearing cart:", error);
      });
  };

  return (
    <Button
      variant="danger"
      onClick={handleClearCart}
      style={{
        // Align to the right
        margin: "10px 55px",
        padding: "25px 100px",
      }}>
      Clear Cart
    </Button>
  );
};

export default ClearCartButton;
