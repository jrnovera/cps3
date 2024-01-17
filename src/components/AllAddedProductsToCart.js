import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

const CartProducts = ({ cartData }) => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    // Assuming cartData is an array of products in the user's cart
    const cartProductRows = cartData.map((product) => (
      <tr key={product._id}>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        {/* Add more columns as needed */}
      </tr>
    ));

    setCartProducts(cartProductRows);
  }, [cartData]);

  return (
    <div>
      <h2>Your Cart</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>

        <tbody>{cartProducts}</tbody>
      </Table>
    </div>
  );
};

export default CartProducts;
