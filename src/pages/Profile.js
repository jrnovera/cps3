import { useState, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import ResetPassword from "../components/ResetPassword";
import UpdateProfile from "../components/UpdateProfile";

export default function Profile() {
  const { user } = useContext(UserContext);

  const [details, setDetails] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Set the user states values with the user details upon successful login.
        if (typeof data._id !== "undefined") {
          setDetails(data);
        } else if (data.error === "User not found") {
          Swal.fire({
            title: "User not found",
            icon: "error",
            text: "Something went wrong, kindly contact us for assistance.",
          });
        } else {
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            text: "Something went wrong, kindly contact us for assistance.",
          });
        }
      });
  }, []);

  return (
    // (user.email === null) ?
    // <Navigate to="/courses" />
    // :
    user.id === null && localStorage.getItem("access") === null ? (
      <Navigate to="/products" />
    ) : (
      <>
        <Row>
          <ResetPassword />
        </Row>
        <Row>
          <UpdateProfile userDetails={details} />
        </Row>
      </>
    )
  );
}
