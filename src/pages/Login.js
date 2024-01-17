import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Key from "@mui/icons-material/Key";
import AccessoriesImages from "../components/Ipad"; // Import the AccessoriesImages component
import { Padding } from "@mui/icons-material";
import UserContext from "../UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  function authenticate(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access) {
          localStorage.setItem("access", data.access);
          retrieveUserDetails(data.access);
          alert(`You are now logged in`);
        } else if (data.error === "No Email Found") {
          alert(`Email not found`);
        } else {
          alert(`${email} does not exist`);
        }
      });

    setEmail("");
    setPassword("");
  }

  const retrieveUserDetails = (token) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
        });
      });
  };

  return user.id !== null ? (
    <Navigate to="/" />
  ) : (
    <div>
      <Form onSubmit={(e) => authenticate(e)}>
        <h1 className="my-5 text-center">Login</h1>
        <Form.Group controlId="userEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Stack
          spacing={0.5}
          sx={{
            "--hue": Math.min(password.length * 10, 120),
          }}>
          <Input
            type="password"
            placeholder="Password"
            startAdornment={<Key />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              "& input": {
                fontSize: "0.8rem",
                padding: "8px",
              },
            }}
          />
          <LinearProgress
            determinate
            size="sm"
            value={Math.min((password.length * 100) / 12, 100)}
            sx={{
              bgcolor: "background.level3",
              color: "hsl(var(--hue) 80% 40%)",
            }}
          />
          <Typography
            variant="body2"
            sx={{
              alignSelf: "flex-end",
              color: "hsl(var(--hue) 80% 30%)",
            }}>
            {password.length < 3 && "Very weak"}
            {password.length >= 3 && password.length < 6 && "Weak"}
            {password.length >= 6 && password.length < 10 && "Strong"}
            {password.length >= 10 && "Very strong"}
          </Typography>
        </Stack>

        {isActive ? (
          <Button variant="primary" type="submit" id="submitBtn">
            Submit
          </Button>
        ) : (
          <Button variant="danger" type="submit" id="submitBtn" disabled>
            Submit
          </Button>
        )}
      </Form>
      <AccessoriesImages />
    </div>
  );
}
