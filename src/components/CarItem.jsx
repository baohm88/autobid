import { useState } from "react";
import { Card, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function CarItem({ car }) {
    const [showFullText, setShowFullText] = useState(false);
    const maxLength = 50;

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };

    const text = `~${car.mileage} Miles, ${car.transmission} ${car.engine} engine, ${car.exterior_color} exterior`;
    const displayText = showFullText ? text : truncateText(text, maxLength);

    return (
        <Col md={3} className="mb-4">
            <Card>
                <NavLink to={`listings/${car.id}`}>
                    <Card.Img
                        variant="top"
                        src={car.images[0]}
                        alt={car.name || car.description}
                    />
                </NavLink>

                <Card.Body>
                    <Card.Title>
                        {car.year_model} {car.make} {car.model}
                    </Card.Title>
                    <Card.Text>
                        {displayText}
                        {text.length > maxLength && (
                            <span
                                style={{ color: "blue", cursor: "pointer" }}
                                onClick={() => setShowFullText(!showFullText)}
                            >
                                {showFullText ? " Show less" : " Show more"}
                            </span>
                        )}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}
