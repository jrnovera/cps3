// import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function ArchiveProducts({ productId, fetchData, isActive }) {
  function archiveToggle() {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchData();
        // Show success message for the corresponding action
        Swal.fire({
          icon: "success",
          title: `Success`,
          text: `Product successfully Archived`,
        });
      })
      .catch((error) => {
        console.error(error);
        // Show error message with SweetAlert
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred. Please try again.",
        });
      });
  }

  function activateToggle() {
    fetch(`http://localhost:4000/products/${productId}/activate`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchData();
        // Show success message for the corresponding action
        Swal.fire({
          icon: "success",
          title: `Success`,
          text: `Product successfully Activated`,
        });
      })
      .catch((error) => {
        console.error(error);
        // Show error message with SweetAlert
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred. Please try again.",
        });
      });
  }

  return (
    <>
      {isActive ? (
        <Button variant="danger" size="sm" onClick={archiveToggle}>
          Archive Products
        </Button>
      ) : (
        <Button variant="success" size="sm" onClick={activateToggle}>
          Activate Products
        </Button>
      )}
    </>
  );
}
