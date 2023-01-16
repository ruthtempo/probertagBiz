import Card from "react-bootstrap/Card";
import { Col } from "react-bootstrap";

export const WohnungCard = ({ wohnungen }) => {
  return wohnungen.map((flat, i) => (
    <Col className="d-flex align-items-stretch" key={i}>
      <Card className="m-3 flex-fill ">
        {/* todo: image */}
        <Card.Body className="d-flex flex-column">
          <Card.Title className="flex-fill">{flat.title}</Card.Title>
          <Card.Text>
            Price: {flat.price}€<br />
            m2: {flat.sqm} <br />
            Price / m2 :{Math.round(flat.price / flat.sqm)} €
          </Card.Text>
          <Card.Link href={flat.url}>Visit flat</Card.Link>
        </Card.Body>
      </Card>
    </Col>
  ));
};
