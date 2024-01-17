import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const RandomGadgetCarousel = () => {
  // Example gadget images
  const gadgetImages = [
    "https://cdn.wccftech.com/wp-content/uploads/2023/01/Apple-Trade-In.jpg",
    "https://www.apple.com/v/macbook-air/q/images/meta/macbook-air_overview__fugeevgwjuie_og.png?202312121840",
    "https://static.toiimg.com/thumb/msid-102403522,width-800,resizemode-4,imgsize-8022/share.jpg",
    // Add more image URLs as needed
  ];

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        className="my-carousel">
        {gadgetImages.map((image, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100"
              src={image}
              alt={`Gadget ${idx + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default RandomGadgetCarousel;
