import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

import AddToCartButton from "../components/AddtoCart";
import ClearCartButton from "./ClearCartButton";

const imageMap = {
  Ipad: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-pink-wifi_AV1_FMT_WHH?wid=1280&hei=720&fmt=p-jpg&qlt=95&.v=1670856073973",
  MacBook:
    "https://www.apple.com/newsroom/images/live-action/wwdc-2023/standard/macbook-air-15-in/Apple-WWDC23-MacBook-Air-15-in-hero-230605_big.jpg.large.jpg",
  iphone:
    "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-black?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923781972",
  Mouse:
    "https://powermaccenter.com/cdn/shop/files/A042000x2000_c55d1c7f-f161-4c25-853f-115f6b28cbea_823x.jpg?v=1691109822",
  Speaker:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4F5XCj0IqPx_y2taAE7SSRaFwE8MQwoj4rssPQuUrwlE9Rj8oO4ZR0o5SqQakesKImIs&usqp=CAU",
  watch:
    "https://www.apple.com/newsroom/images/product/watch/standard/Apple_watch-series7_hero_09142021_big.jpg.slideshow-medium_2x.jpg",
  airPods:
    "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/airpods-max-select-pink-202011_FMT_WHH?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1604615276000",
  airBuds:
    "https://dynamic.zacdn.com/GMvQ0Rxg_kJtWaSxuOHEebEhKQg=/filters:quality(70):format(webp)/https://static-ph.zacdn.com/p/wiwu-3160-6462713-1.jpg",
  iMac: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/imac-24-purple-cto-hero-202310?wid=1254&hei=1132&fmt=jpeg&qlt=90&.v=1697301230058",
  AppleTV:
    "https://m.media-amazon.com/images/I/617YFuvIAxL._AC_UF1000,1000_QL80_.jpg",
  iPhone15:
    "https://imageio.forbes.com/specials-images/imageserve/641397e79f04500b85460b8f/Apple--iPhone-15--iPhone-15-Pro-Max--iPhone-15-Pro--iPhone-15-Pro-design--iPhone-15/0x0.jpg?format=jpg&crop=923,692,x364,y0,safe&width=960",
};

export default function UsersView({ productData, fetchData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productCards = productData.map((product) => (
      <ProductCard key={product._id} product={product} fetchData={fetchData} />
    ));

    setProducts(productCards);
  }, [productData, fetchData]);

  return (
    <>
      <h1 className="text-center my-4">My Products</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
        {products}
      </div>

      <div className="text-center mt-3">
        <ClearCartButton />
      </div>
    </>
  );
}

const ProductCard = ({ product, fetchData }) => {
  const { _id, name, description, price } = product;

  // Use the image constant based on the product name
  const imageUrl = imageMap[name] || ""; // Use an empty string if the name is not found in the imageMap

  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Body>
        {/* Use the image constant directly */}
        {imageUrl && <Card.Img variant="top" src={imageUrl} alt={name} />}
        <Card.Title>{name}</Card.Title>
        <Card.Text>ID: {_id}</Card.Text>
        <Card.Text>Description: {description}</Card.Text>
        <Card.Text>Price: ${price}</Card.Text>
        <div className="text-center">
          <AddToCartButton productId={_id} fetchData={fetchData} />
        </div>
      </Card.Body>
    </Card>
  );
};
