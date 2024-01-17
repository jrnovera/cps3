import { Row, Col, Card } from "react-bootstrap";

export default function Higlights() {
  return (
    <Row className="mt-3 mb-3">
      <Col xs={12} md={6}>
        <Card className="cardHighlight p-3">
          <Card.Body>
            <Card.Title>
              <h2>About Us</h2>
            </Card.Title>
            <Card.Text>
              We are your go-to destination for the latest and greatest in tech
              gadgets. Our passion for cutting-edge technology drives us to
              curate a diverse selection of high-quality products that
              seamlessly blend style and functionality.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>

      <Col xs={12} md={6}>
        <Card className="cardHighlight p-3">
          <Card.Body>
            <Card.Title>
              <h2> Our Mission</h2>
            </Card.Title>
            <Card.Text>
              Our mission is to make your tech journey straightforward and
              enjoyable. We believe in providing easy access to essential
              gadgets that enhance your daily life. We are dedicated to
              simplifying your tech experience without sacrificing quality.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
