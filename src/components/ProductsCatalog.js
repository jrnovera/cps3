import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import AddToCartButton from "./AddtoCart"; // Update the path based on your project structure

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all active products
    fetch(`${process.env.REACT_APP_API_URL}/products/`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      <h2>Product Catalog</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const { id, name, price, description, imageSrc } = product;

  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Img
        variant="top"
        src={imageSrc || "https://via.placeholder.com/150"}
        alt={name}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Price: ${price}</Card.Text>
        <AddToCartButton productId={id} />
      </Card.Body>
    </Card>
  );
};

export default ProductCatalog;
