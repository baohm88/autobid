// import { NavLink } from "react-router-dom";
// import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";

// export default function SellerDashboard() {
//     return (
//         <Container>
//             <Row>
//                 {/* Sidebar */}
//                 <Col
//                     sm="auto"
//                     // className="bg-light sticky-top p-3 d-flex flex-column flex-sm-row align-items-start align-items-sm-center"
//                     className="sticky-top p-3 d-flex flex-column flex-sm-row align-items-start align-items-sm-center"
//                 >
//                     <ul className="nav nav-pills mb-auto flex-row flex-sm-column w-100">
//                         <li className="nav-item">
//                             <NavLink
//                                 to="/dashboard"
//                                 className="nav-link py-2 px-3 d-flex align-items-center"
//                             >
//                                 <i className="bi-speedometer2 fs-5 me-2"></i>
//                                 <span>Dashboard</span>
//                             </NavLink>
//                         </li>
//                         <li className="nav-item">
//                             <NavLink
//                                 to="/in-progress"
//                                 className="nav-link py-2 px-3 d-flex align-items-center"
//                             >
//                                 <i className="bi-clock fs-5 me-2"></i>
//                                 <span>In Progress</span>
//                             </NavLink>
//                         </li>
//                         <li className="nav-item">
//                             <NavLink
//                                 to="/live-auctions"
//                                 className="nav-link py-2 px-3 d-flex align-items-center"
//                             >
//                                 <i className="bi-lightning fs-5 me-2"></i>
//                                 <span>Live Auctions</span>
//                             </NavLink>
//                         </li>
//                         <li className="nav-item">
//                             <NavLink
//                                 to="/comments"
//                                 className="nav-link py-2 px-3 d-flex align-items-center"
//                             >
//                                 <i className="bi-chat fs-5 me-2"></i>
//                                 <span>Comments</span>
//                             </NavLink>
//                         </li>
//                         <li className="nav-item">
//                             <NavLink
//                                 to="/past-listings"
//                                 className="nav-link py-2 px-3 d-flex align-items-center"
//                             >
//                                 <i className="bi-archive fs-5 me-2"></i>
//                                 <span>Past Listings</span>
//                             </NavLink>
//                         </li>
//                     </ul>
//                 </Col>

//                 {/* Main Content */}
//                 <Col sm className="p-4 min-vh-100">
//                     {/* Heading */}
//                     <h3 className="mb-3">Dashboard</h3>

//                     {/* Profile Card */}
//                     <Card className="mb-4">
//                         <Card.Body>
//                             <Card.Title>MinhTong</Card.Title>
//                             <Card.Text>Joined February 2025</Card.Text>
//                             <Button variant="success">Edit Profile</Button>
//                         </Card.Body>
//                     </Card>

//                     {/* Quick Access Boxes */}
//                     <Row className="mb-5">
//                         {[
//                             {
//                                 name: "In Progress",
//                                 icon: "bi-clock",
//                                 link: "/in-progress",
//                             },
//                             {
//                                 name: "Live Auctions",
//                                 icon: "bi-lightning",
//                                 link: "/live-auctions",
//                             },
//                             {
//                                 name: "Auction Comments",
//                                 icon: "bi-chat",
//                                 link: "/comments",
//                             },
//                             {
//                                 name: "Past Listings",
//                                 icon: "bi-archive",
//                                 link: "/past-listings",
//                             },
//                         ].map((item, index) => (
//                             <Col xs={6} md={3} key={index} className="mb-3">
//                                 <NavLink
//                                     to={item.link}
//                                     className="text-decoration-none"
//                                 >
//                                     <Card className="text-center p-3 h-100">
//                                         <Card.Body>
//                                             <i
//                                                 className={`bi ${item.icon} fs-1 mb-2 d-block`}
//                                             ></i>
//                                             <Card.Title className="fs-5">
//                                                 {item.name}
//                                             </Card.Title>
//                                         </Card.Body>
//                                     </Card>
//                                 </NavLink>
//                             </Col>
//                         ))}
//                     </Row>

//                     {/* Why Sell on Cars & Bids? Section */}
//                     <Row className="mb-5">
//                         <Col md={6}>
//                             <h4>Why Sell on Cars &amp; Bids?</h4>
//                             <ul className="list-unstyled mt-3">
//                                 <li className="mb-2">
//                                     <i className="bi-search me-2"></i>
//                                     <strong>Live support</strong> from listing
//                                     to post-sale
//                                 </li>
//                                 <li className="mb-2">
//                                     <i className="bi-calendar-check me-2"></i>
//                                     Sell your car <strong>faster</strong> and
//                                     get to auction in under a week
//                                 </li>
//                                 <li className="mb-2">
//                                     <i className="bi-people me-2"></i>
//                                     Access our <strong>huge audience</strong> of
//                                     car enthusiasts
//                                 </li>
//                                 <li className="mb-2">
//                                     <i className="bi-cash me-2"></i>
//                                     <strong>Sell for free</strong> and receive
//                                     100% of the sale price
//                                 </li>
//                             </ul>
//                         </Col>
//                         <Col md={6}>
//                             {/* Carousel of Comments */}
//                             <Carousel interval={3000} controls indicators>
//                                 {[
//                                     {
//                                         name: "Andrew G.",
//                                         date: "Apr 2024",
//                                         comment:
//                                             "I have bought and sold on other auction websites, but Cars & Bids definitely tops everyone in customer service.",
//                                         rating: 5,
//                                     },
//                                     {
//                                         name: "Sophia L.",
//                                         date: "Jan 2024",
//                                         comment:
//                                             "Fast, easy, and hassle-free experience. Highly recommended!",
//                                         rating: 5,
//                                     },
//                                     {
//                                         name: "Michael B.",
//                                         date: "Feb 2024",
//                                         comment:
//                                             "Got a great price for my car and the process was super smooth!",
//                                         rating: 5,
//                                     },
//                                 ].map((review, index) => (
//                                     <Carousel.Item key={index}>
//                                         <Card className="bg-light p-3">
//                                             <Card.Body>
//                                                 <div className="d-flex align-items-center mb-2">
//                                                     {Array(review.rating)
//                                                         .fill()
//                                                         .map((_, i) => (
//                                                             <i
//                                                                 key={i}
//                                                                 className="bi-star-fill text-warning me-1"
//                                                             ></i>
//                                                         ))}
//                                                 </div>
//                                                 <Card.Title>
//                                                     {review.name}{" "}
//                                                     <small className="text-muted">
//                                                         {review.date}
//                                                     </small>
//                                                 </Card.Title>
//                                                 <Card.Text>
//                                                     {review.comment}
//                                                 </Card.Text>
//                                             </Card.Body>
//                                         </Card>
//                                     </Carousel.Item>
//                                 ))}
//                             </Carousel>
//                         </Col>
//                     </Row>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }

import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Carousel,
    Modal,
    Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../../context/user-context";
import axios from "axios";

export default function SellerDashboard() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    async function useProfileFormAction(fd) {
        const userData = Object.fromEntries(fd.entries());
        userData.id = user.id;

        console.log(userData);

        try {
            const res = await axios.put(
                `http://localhost:8080/update-account`,
                userData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(res);

            if (res.status === 200) {
                alert(res.data.message);
                handleClose();
                navigate("/user-profile");
                setUser(userData);
                // Save the user object to localStorage as a JSON string
                localStorage.setItem("user", JSON.stringify(userData));
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            console.error("Failed to add a listing!", error);
        }
    }

    return (
        <Container>
            <Row>
                {/* Sidebar */}
                <Col
                    sm="auto"
                    className="p-3 d-flex flex-column flex-sm-row align-items-start align-items-sm-center"
                    style={{ position: "sticky", top: 0, zIndex: 1020 }}
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

                    <Card className="mb-3">
                        <Row className="g-0">
                            <Col
                                md={3}
                                lg={2}
                                className="p-3 d-flex justify-content-center align-items-center"
                            >
                                <div className="d-flex flex-column align-items-center gap-3">
                                    <img
                                        src={user.image_url}
                                        className="img-fluid rounded-circle"
                                        alt={user.username}
                                        style={{
                                            width: "130px",
                                            height: "130px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={handleShow}
                                    >
                                        Edit Profile
                                    </Button>
                                </div>
                            </Col>
                            <Col md={9} lg={10}>
                                <Card.Body>
                                    <Card.Title>{user.username}</Card.Title>
                                    <Card.Text>{user.bio}</Card.Text>
                                    <Card.Text>
                                        <small className="text-muted">
                                            Joined January 2025
                                        </small>
                                    </Card.Text>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>

                    <Modal show={showModal} onHide={handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form action={useProfileFormAction}>
                                <div className="d-flex flex-column align-items-center gap-3">
                                    <img
                                        src={user.image_url}
                                        className="img-fluid rounded-circle"
                                        alt={user.username}
                                        style={{
                                            width: "130px",
                                            height: "130px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    {/* <Button variant="secondary" size="sm">
                                        Choose a different picture
                                    </Button> */}
                                </div>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>New Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        defaultValue={user.email}
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="username"
                                >
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        defaultValue={user.username}
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="password"
                                >
                                    <Form.Label>New Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        defaultValue={user.password}
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="balance"
                                >
                                    <Form.Label>New Balance:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="balance"
                                        defaultValue={user.balance}
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="image_url"
                                >
                                    <Form.Label>Avatar link:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="image_url"
                                        defaultValue={user.image_url}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="bio">
                                    <Form.Label>Bio:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="bio"
                                        defaultValue={user.bio}
                                    />
                                </Form.Group>

                                <Modal.Footer>
                                    <Button
                                        variant="secondary"
                                        onClick={handleClose}
                                    >
                                        Close
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Save
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        </Modal.Body>
                    </Modal>

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
