import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Card,
  Carousel,
} from "react-bootstrap";

const CountryCard = ({ cName, cRegion }) => {
  return (
    <Col md={6} lg={4} className="mb-3" key={cName}>
      <Card>
        <Card.Body>
          <Card.Title>{cName}</Card.Title>
          <Card.Text>{cRegion}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CountryCard;
