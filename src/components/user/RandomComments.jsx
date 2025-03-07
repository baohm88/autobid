import { Card, Carousel, Col, Row } from "react-bootstrap";
import { DUMMY_COMMENTS } from "./dummy_data";

export default function RandomComments() {
    return (
        <>
            <Row className="mb-5">
                <Col md={6}>
                    <h4>Why Sell on Cars &amp; Bids?</h4>
                    <ul className="list-unstyled mt-3">
                        <li className="mb-2">
                            <i className="bi-search me-2"></i>
                            <strong>Live support</strong> from listing to
                            post-sale
                        </li>
                        <li className="mb-2">
                            <i className="bi-calendar-check me-2"></i>
                            Sell your car <strong>faster</strong> and get to
                            auction in under a week
                        </li>
                        <li className="mb-2">
                            <i className="bi-people me-2"></i>
                            Access our <strong>huge audience</strong> of car
                            enthusiasts
                        </li>
                        <li className="mb-2">
                            <i className="bi-cash me-2"></i>
                            <strong>Sell for free</strong> and receive 100% of
                            the sale price
                        </li>
                    </ul>
                </Col>
                <Col md={6}>
                    {/* Carousel of Comments */}
                    <Carousel interval={3000} controls indicators>
                        {DUMMY_COMMENTS.map((review, index) => (
                            <Carousel.Item key={index}>
                                <Card className="bg-light p-3">
                                    <Card.Body>
                                        <div className="d-flex align-items-center mb-2">
                                            {Array(review.rating)
                                                .fill()
                                                .map((_, i) => (
                                                    <i
                                                        key={i}
                                                        className="bi-star-fill text-warning me-1"
                                                    ></i>
                                                ))}
                                        </div>
                                        <Card.Title>
                                            {review.name}{" "}
                                            <small className="text-muted">
                                                {review.date}
                                            </small>
                                        </Card.Title>
                                        <Card.Text>{review.comment}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
            </Row>
        </>
    );
}
