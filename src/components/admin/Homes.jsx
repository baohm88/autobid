import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaUser, FaShoppingCart, FaGavel } from "react-icons/fa";
import { Link } from "react-router-dom"; // import Link

export default function Home() {
    return (
        <Container className="py-4">
            <h1 className="mb-4">Home</h1>
            <Row className="g-4">
                {/* Users Section */}
                <Col md={4}>
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <div className="d-flex align-items-center mb-3">
                                <FaUser size={28} className="me-2" />
                                <Card.Title className="mb-0">Users</Card.Title>
                            </div>
                            <Card.Text>
                                Manage users, add, edit, delete, search...
                            </Card.Text>
                            {/* Link to /users */}
                            <div className="d-flex align-items-center mb-3 justify-content-center">
                                <Link to="/users">
                                    <Button className="mt-4" variant="primary">Go to Users</Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Orders Section */}
                <Col md={4}>
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <div className="d-flex align-items-center mb-3">
                                <FaShoppingCart size={28} className="me-2" />
                                <Card.Title className="mb-0">Orders</Card.Title>
                            </div>
                            <Card.Text>
                                Manage orders, statistics, update status...
                            </Card.Text>
                            {/* Link to /orders */}
                            <Link to="/orders">
                                <div className="d-flex align-items-center mb-3 justify-content-center">
                                    <Button className="mt-4" variant="primary">Go to Orders</Button>
                                </div>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Auctions Section */}
                <Col md={4}>
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <div className="d-flex align-items-center mb-3">
                                <FaGavel size={28} className="me-2" />
                                <Card.Title className="mb-0">Auctions</Card.Title>
                            </div>
                            <Card.Text>
                                Manage auctions, product information, timing...
                            </Card.Text>
                            {/* Link to /auctions */}
                            <div className="d-flex align-items-center mb-3 justify-content-center">
                                <Link to="/auctions">
                                    <Button className="mt-4" variant="primary">Go to Auctions</Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
