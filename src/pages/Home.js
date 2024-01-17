import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Banner from "../components/Banner";
import Highlights from "../components/Highlights";
import FeaturedProduct from "../components/FeaturedProduct";
import RandomGadgetCarousel from "../components/Caurosel";
import Video from "../components/Video";
import OffersCards from "../components/FooterImages";
import MobileFriendlyOutlinedIcon from "@mui/icons-material/MobileFriendlyOutlined";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const data = {
    title: (
      <>
        GadgetCo.
        <MobileFriendlyOutlinedIcon
          fontSize="inherit"
          style={{ marginLeft: "0.5rem" }}
        />
      </>
    ),
    content: "Bringing Innovation to Your Fingertips",
    destination: "/products",
    label: "Buy Now!",
  };

  useEffect(() => {
    // Fetch products from your database/API
    fetch(`${process.env.REACT_APP_API_URL}/products/`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container fluid style={{ padding: 0 }}>
      <Banner data={data} />
      <RandomGadgetCarousel />
      <hr style={{ marginBottom: "2rem" }} />
      <FeaturedProduct />
      <Video />
      <hr style={{ marginBottom: "2rem", color: "white" }} />
      <h2 className="mb-4">
        The GadgetCo experience. Do even more with GadgetCo products and
        services.
      </h2>
      <hr style={{ width: "100%" }} />
      <Row className="mb-4">
        <Col xs={12} lg={12}>
          <OffersCards />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Highlights />
        </Col>
      </Row>
    </Container>
  );
}
