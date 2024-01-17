import React, { useState, useEffect, useContext } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import UserContext from "../UserContext";
import AddToCartButton from "../components/AddtoCart";

export default function ProductView() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/products/${productId}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body className="text-center">
              <Card.Title>{product.name}</Card.Title>
              <Card.Subtitle>Description:</Card.Subtitle>
              <Card.Text>{product.description}</Card.Text>
              <Card.Subtitle>Price:</Card.Subtitle>
              <Card.Text>PhP {product.price}</Card.Text>
              {user.id !== null ? (
                <AddToCartButton productId={productId} fetchData={() => {}} />
              ) : (
                <Link className="btn btn-danger btn-block" to="/products">
                  Buy Item
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
