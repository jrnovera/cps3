import React from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

const DeleteProductButton = ({ productId, fetchData }) => {
  const handleDelete = () => {
    // You can show a confirmation modal or directly delete the product
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your API to delete the product
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire(
                "Deleted!",
                "Your product has been deleted.",
                "success"
              );
              fetchData(); // Fetch updated product data after deletion
            } else {
              Swal.fire("Error", "Failed to delete the product.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
            Swal.fire("Error", "Failed to delete the product.", "error");
          });
      }
    });
  };

  return (
    <>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
    </>
  );
};

export default DeleteProductButton;
