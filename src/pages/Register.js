import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Register() {
  // state hooks to store the values of input fields for Registration
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // state of the button
  const [isActive, setIsActive] = useState(false);

  // states
  console.log(firstName);
  console.log(lastName);
  console.log(email);
  console.log(mobileNo);
  console.log(password);
  console.log(confirmPassword);

  // useEffect() will only run once the firstName, lastName, email, mobileNo, password, confirmPassword state has been changed.
  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      mobileNo !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      mobileNo.length >= 10 &&
      password === confirmPassword
    ) {
      // enables the button
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

  function registerUser(event) {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Request body
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Registered Successfully") {
          setFirstName("");
          setLastName("");
          setEmail("");
          setMobileNo("");
          setPassword("");
          setConfirmPassword("");

          // Use SweetAlert2 to show a success message
          Swal.fire({
            icon: "success",
            title: "Registration Successful",
            confirmButtonText: "OK",
          }).then(() => {
            // Navigate to the login page
            window.location.href = "/login";
          });
        } else {
          // Use SweetAlert2 to show an error message
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: "Please try again later.",
            confirmButtonText: "OK",
          });
        }
      });
  }

  return (
    <div className="container" style={{ maxWidth: "600px" }}>
      <div className="mx-auto">
        <Form onSubmit={(event) => registerUser(event)}>
          <h1 className="my-5 text-center">Register</h1>
          <Form.Group>
            <Form.Label>First Name: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              required
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              required
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>MobileNo: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter MobileNo"
              required
              onChange={(event) => {
                setMobileNo(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              required
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              required
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password: </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              required
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
          </Form.Group>
          {isActive === true ? (
            <Button variant="primary" type="submit" id="submitBtn">
              Submit
            </Button>
          ) : (
            <Button variant="danger" type="submit" id="submitBtn" disabled>
              Submit
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
}
