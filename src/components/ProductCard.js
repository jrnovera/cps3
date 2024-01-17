import React from "react";

const ProductCard = ({ product, fetchData }) => {
  const { _id, name, description, price } = product;

  const getImageUrl = () => {
    if (name.toLowerCase().includes("phone")) {
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToEYFIrrmdMAepM8oi_tSa3IJqem6-wIOwIw&usqp=CAU";
    } else if (name.toLowerCase().includes("laptop")) {
      return "https://images-na.ssl-images-amazon.com/images/I/71qKfFqgEiL.jpg";
    } else {
      // Default image or handle other cases
      return "https://example.com/default-image.jpg";
    }
  };

  return (
    <div className="product-card">
      <img src={getImageUrl()} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>${price}</p>
        <button onClick={() => fetchData(_id)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
