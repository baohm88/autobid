// export default function SellerDashBoard() {
//     return (
//         <div>
//             <h2>Seller Dashboard</h2>
//         </div>
//     );
// }

import { NavLink } from "react-router-dom";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";

export default function SellerDashboard() {
    return (
        <Container>
            <Row>
                {/* Sidebar */}
                <Col
                    sm="auto"
                    // className="bg-light sticky-top p-3 d-flex flex-column flex-sm-row align-items-start align-items-sm-center"
                    className="sticky-top p-3 d-flex flex-column flex-sm-row align-items-start align-items-sm-center"
                >
                    <ul className="nav nav-pills mb-auto flex-row flex-sm-column w-100">
                        <li className="nav-item">
                            <NavLink
                                to="/dashboard"
                                className="nav-link py-2 px-3 d-flex align-items-center"
                            >
                                <i className="bi-speedometer2 fs-5 me-2"></i>
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/in-progress"
                                className="nav-link py-2 px-3 d-flex align-items-center"
                            >
                                <i className="bi-clock fs-5 me-2"></i>
                                <span>In Progress</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/live-auctions"
                                className="nav-link py-2 px-3 d-flex align-items-center"
                            >
                                <i className="bi-lightning fs-5 me-2"></i>
                                <span>Live Auctions</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/comments"
                                className="nav-link py-2 px-3 d-flex align-items-center"
                            >
                                <i className="bi-chat fs-5 me-2"></i>
                                <span>Comments</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/past-listings"
                                className="nav-link py-2 px-3 d-flex align-items-center"
                            >
                                <i className="bi-archive fs-5 me-2"></i>
                                <span>Past Listings</span>
                            </NavLink>
                        </li>
                    </ul>
                </Col>

                {/* Main Content */}
                <Col sm className="p-4 min-vh-100">
                    {/* Heading */}
                    <h3 className="mb-3">Dashboard</h3>

                    {/* Profile Card */}
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>MinhTong</Card.Title>
                            <Card.Text>Joined February 2025</Card.Text>
                            <Button variant="success">Edit Profile</Button>
                        </Card.Body>
                    </Card>

                    {/* Quick Access Boxes */}
                    <Row className="mb-5">
                        {[
                            {
                                name: "In Progress",
                                icon: "bi-clock",
                                link: "/in-progress",
                            },
                            {
                                name: "Live Auctions",
                                icon: "bi-lightning",
                                link: "/live-auctions",
                            },
                            {
                                name: "Auction Comments",
                                icon: "bi-chat",
                                link: "/comments",
                            },
                            {
                                name: "Past Listings",
                                icon: "bi-archive",
                                link: "/past-listings",
                            },
                        ].map((item, index) => (
                            <Col xs={6} md={3} key={index} className="mb-3">
                                <NavLink
                                    to={item.link}
                                    className="text-decoration-none"
                                >
                                    <Card className="text-center p-3 h-100">
                                        <Card.Body>
                                            <i
                                                className={`bi ${item.icon} fs-1 mb-2 d-block`}
                                            ></i>
                                            <Card.Title className="fs-5">
                                                {item.name}
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>
                                </NavLink>
                            </Col>
                        ))}
                    </Row>

                    {/* Why Sell on Cars & Bids? Section */}
                    <Row className="mb-5">
                        <Col md={6}>
                            <h4>Why Sell on Cars &amp; Bids?</h4>
                            <ul className="list-unstyled mt-3">
                                <li className="mb-2">
                                    <i className="bi-search me-2"></i>
                                    <strong>Live support</strong> from listing
                                    to post-sale
                                </li>
                                <li className="mb-2">
                                    <i className="bi-calendar-check me-2"></i>
                                    Sell your car <strong>faster</strong> and
                                    get to auction in under a week
                                </li>
                                <li className="mb-2">
                                    <i className="bi-people me-2"></i>
                                    Access our <strong>huge audience</strong> of
                                    car enthusiasts
                                </li>
                                <li className="mb-2">
                                    <i className="bi-cash me-2"></i>
                                    <strong>Sell for free</strong> and receive
                                    100% of the sale price
                                </li>
                            </ul>
                        </Col>
                        <Col md={6}>
                            {/* Carousel of Comments */}
                            <Carousel interval={3000} controls indicators>
                                {[
                                    {
                                        name: "Andrew G.",
                                        date: "Apr 2024",
                                        comment:
                                            "I have bought and sold on other auction websites, but Cars & Bids definitely tops everyone in customer service.",
                                        rating: 5,
                                    },
                                    {
                                        name: "Sophia L.",
                                        date: "Jan 2024",
                                        comment:
                                            "Fast, easy, and hassle-free experience. Highly recommended!",
                                        rating: 5,
                                    },
                                    {
                                        name: "Michael B.",
                                        date: "Feb 2024",
                                        comment:
                                            "Got a great price for my car and the process was super smooth!",
                                        rating: 5,
                                    },
                                ].map((review, index) => (
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
                                                <Card.Text>
                                                    {review.comment}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
