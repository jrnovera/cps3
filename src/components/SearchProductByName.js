// SearchProductByName.js
import React, { useState, useRef } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const SearchProductByName = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const lastProductRef = useRef(null);

  const handleSearchByName = () => {
    // Send a request to the server to search for products by name
    fetch(`${process.env.REACT_APP_API_URL}/products/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: searchTerm,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.products.length > 0) {
          Swal.fire({
            title: "Products Found",
            icon: "success",
            text: `${data.products.length} products match the specified criteria.`,
          });
          setProducts(data.products);

          // Scroll to the last product in the list
          lastProductRef.current.scrollIntoView({ behavior: "smooth" });
        } else {
          setProducts([]);
          Swal.fire({
            title: "No products found",
            icon: "info",
            text: "No products match the specified criteria.",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "An error occurred while fetching products. Please try again.",
        });
      });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title>Search Products by Name</Card.Title>
              <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter product name"
                />
              </Form.Group>
              <Button variant="primary" block onClick={handleSearchByName}>
                Search
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        {products.map((product, index) => (
          <Col
            key={product.id}
            lg={4}
            className="mb-3"
            ref={index === products.length - 1 ? lastProductRef : null}>
            <Card>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{product.description}</Card.Text>
                <Card.Subtitle>Price:</Card.Subtitle>
                <Card.Text>${product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchProductByName;
