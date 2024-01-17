import React from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RemoveFromCartButton = ({ productId, fetchData }) => {
  const navigate = useNavigate();
  const handleRemoveFromCart = async () => {
    try {
      console.log("Removing product with ID:", productId);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/cart/${productId}/remove-from-cart`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.message) {
        Swal.fire({
          icon: "success",
          title: data.message,
        });

        navigate("/redirect");
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
        });
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
      });
    }
  };

  return (
    <Button variant="danger" onClick={handleRemoveFromCart}>
      Remove from Cart
    </Button>
  );
};

export default RemoveFromCartButton;
