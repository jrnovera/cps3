import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Banner({ data }) {
  const { title, content, destination, label } = data;

  return (
    <Row>
      <Col className="p-4 text-center">
        <h1>{title}</h1>
        <p>{content}</p>
        <Link className="btn btn-dark" to={destination}>
          {label}
        </Link>
      </Col>
    </Row>
  );
}
