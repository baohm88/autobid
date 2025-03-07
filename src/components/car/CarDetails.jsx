import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
    Container,
    Row,
    Col,
    Button,
    Image,
    Modal,
    Spinner,
    Alert,
    Form,
} from "react-bootstrap";
import { ChevronLeft, ChevronRight, X } from "react-bootstrap-icons"; // Import icons for navigation
import CarDetailsTable from "./CarDetailsTable";
import EndingSoonTable from "./EndingSoonTable";
import QASection from "./QASection";
import BidsSection from "./BidsSection";
import CurrentBidSection from "./CurrentBidSection";
import EquipmentSection from "./EquipmentSection";
import ModificationsSection from "./ModificationsSection";
import FlawsSection from "./FlawsSection";
import VideosSection from "./VideosSection";
import ButtonsGroup from "./ButtonsGroup";
import { UserContext } from "../../context/user-context";
import { formatter } from "../../utils/formatter";

export default function CarDetails() {
    const { id } = useParams();
    const { user, setUser } = useContext(UserContext);
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // State to control image modal visibility
    const [showBidModal, setShowBidModal] = useState(false); // State to control bid modal visibility
    const [showDepositModal, setShowDepositModal] = useState(false); // State to control deposit modal visibility
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); // State to track the selected image index
    const [bidAmount, setBidAmount] = useState(""); // State to track the bid amount
    const [depositAmount, setDepositAmount] = useState(""); // State to track the deposit amount
    const [alertMessage, setAlertMessage] = useState(""); // State to track alert message
    const navigate = useNavigate();

    document.title =
        car !== null
            ? car.year_model + " " + car.make + " " + car.model
            : "Listing Details";

    useEffect(() => {
        async function fetchListing() {
            try {
                const res = await axios.get(
                    `http://localhost:8080/listings/${id}`
                );
                const data = res.data.data[0];
                setCar(data);
                console.log(data);
            } catch (err) {
                console.error("Failed to fetch listings:", err);
                setError(
                    "Failed to fetch car details. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchListing();
    }, [id]);

    const isOwner = user && car && user.id === car.user;

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (showModal) {
                if (event.key === "ArrowLeft") {
                    showPreviousImage();
                } else if (event.key === "ArrowRight") {
                    showNextImage();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [showModal, selectedImageIndex]);

    const visibleThumbnails = car?.images?.slice(0, 8) || [];
    const hiddenCount = car?.images?.length > 8 ? car.images.length - 8 : 0;

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    const openModal = (index) => {
        setSelectedImageIndex(index);
        setShowModal(true);
    };

    const showPreviousImage = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === 0 ? car.images.length - 1 : prevIndex - 1
        );
    };

    const showNextImage = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === car.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePlaceBid = () => {
        if (user.balance < car.starting_bid) {
            setShowDepositModal(true);
        } else {
            setShowBidModal(true);
        }
    };

    const handleSaveBid = () => {
        if (parseFloat(bidAmount) < car.starting_bid) {
            setAlertMessage(`Bid must be greater than ${car.starting_bid}`);
        } else {
            // Logic to handle placing a bid
            console.log(`Bid placed: ${bidAmount}`);
            setShowBidModal(false);
        }
    };

    const handleDeposit = () => {
        const newBalance = user.balance + parseFloat(depositAmount);
        const updatedUser = { ...user, balance: newBalance };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setShowDepositModal(false);
        if (newBalance >= car.starting_bid) {
            setShowBidModal(true);
        }
    };

    return (
        <Container className="py-4">
            {car && (
                <h1 className="fw-bold">
                    {car.year_model} {car.make} {car.model}
                </h1>
            )}
            <p className="text-muted">
                ~{car.mileage} Miles, {car.transmission} {car.engine} engine,{" "}
                {car.exterior_color} exterior
            </p>
            <p>Current bid: {formatter.format(car.starting_bid)}</p>
            {/* Edit Button (only visible to the owner) */}
            {isOwner ? (
                <Button
                    className="mb-3"
                    variant="primary"
                    onClick={() => navigate(`/listings/${car.id}/edit`)}
                >
                    Edit Car Info
                </Button>
            ) : (
                <>
                    <Button
                        variant="warning"
                        className="my-3"
                        onClick={handlePlaceBid}
                    >
                        <i className="bi bi-coin"></i> Place Bid
                    </Button>
                    <Button variant="info" className="my-3 ms-2">
                        <i className="bi bi-heart-fill text-danger"></i> Add to
                        Watchlist
                    </Button>
                </>
            )}

            {/* Row: Main Image + Thumbnails */}
            <Row>
                {/* Main Image */}
                <Col lg={8} className="mb-3">
                    {car?.images?.length > 0 && (
                        <Image
                            src={car.images[0]}
                            alt="Main Car"
                            fluid
                            rounded
                            style={{ cursor: "pointer" }}
                            onClick={() => openModal(0)} // Open modal with the first image
                        />
                    )}
                </Col>

                {/* Thumbnails & All Photos Button */}
                <Col lg={4}>
                    <Row className="g-2">
                        {visibleThumbnails.map((thumb, index) => (
                            <Col
                                key={index}
                                xs={6}
                                className="position-relative"
                            >
                                <Image
                                    src={thumb}
                                    alt={`Thumb ${index + 1}`}
                                    fluid
                                    rounded
                                    style={{ cursor: "pointer" }}
                                    onClick={() => openModal(index)}
                                />
                                {index === 7 && hiddenCount > 0 && (
                                    <Button
                                        variant="dark"
                                        className="w-100 position-absolute top-0 start-0 h-100"
                                        style={{
                                            opacity: 0.8, // Adjust opacity for better visibility
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "1.2rem",
                                            color: "white",
                                        }}
                                        onClick={() => openModal(8)}
                                    >
                                        +{hiddenCount} Photos
                                    </Button>
                                )}
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col lg={8} className="mb-4">
                    <ButtonsGroup car={car} />
                    <CarDetailsTable car={car} />
                    <EquipmentSection equipments={car.equipment.split(";")} />
                    <ModificationsSection
                        modifications={car.modifications.split(";")}
                    />
                    <FlawsSection flaws={car.flaws.split(";")} />
                    <VideosSection />
                    <QASection />
                    <CurrentBidSection />
                    <BidsSection />
                </Col>

                <EndingSoonTable />
            </Row>

            {/* Fullscreen Image Modal */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                size="lg"
                fullscreen
                contentClassName="bg-dark"
            >
                <Modal.Body className="p-0 d-flex align-items-center justify-content-center position-relative">
                    {/* Close Button (X icon) */}
                    <Button
                        variant="light"
                        onClick={() => setShowModal(false)}
                        style={{
                            position: "absolute",
                            right: "20px",
                            top: "20px",
                            zIndex: 1000,
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <X size={20} />
                    </Button>

                    {/* Previous Button */}
                    <Button
                        variant="light"
                        onClick={showPreviousImage}
                        style={{
                            position: "absolute",
                            left: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 1000,
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <ChevronLeft size={20} />
                    </Button>

                    {/* Image */}
                    <Image
                        src={car?.images[selectedImageIndex]}
                        alt={`Fullscreen Image ${selectedImageIndex + 1}`}
                        fluid
                        style={{ maxHeight: "90vh", objectFit: "contain" }}
                    />

                    {/* Next Button */}
                    <Button
                        variant="light"
                        onClick={showNextImage}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 1000,
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <ChevronRight size={20} />
                    </Button>
                </Modal.Body>
            </Modal>

            {/* Place Bid Modal */}
            <Modal
                show={showBidModal}
                onHide={() => setShowBidModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Place Bid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Current bid: {formatter.format(car?.starting_bid)}</p>
                    <p>Current Balance: {formatter.format(user?.balance)}</p>
                    {alertMessage && (
                        <Alert
                            variant="danger"
                            onClose={() => setAlertMessage("")}
                            dismissible
                        >
                            {alertMessage}
                        </Alert>
                    )}
                    <Form>
                        <Form.Group controlId="bidAmount">
                            <Form.Label>Bid Amount</Form.Label>
                            <Form.Control
                                type="number"
                                value={bidAmount}
                                onChange={(e) => setBidAmount(e.target.value)}
                                placeholder="Enter your bid"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowBidModal(false)}
                    >
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveBid}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Deposit Modal */}
            <Modal
                show={showDepositModal}
                onHide={() => setShowDepositModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Deposit Funds</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>
                        Insufficient funds! Please deposit funds to continue.
                    </h4>
                    <hr />
                    <p>Current Balance: {formatter.format(user?.balance)}</p>
                    <p>
                        Required Amount:{" "}
                        {formatter.format(car?.starting_bid - user?.balance)}{" "}
                    </p>

                    <Form>
                        <Form.Group controlId="depositAmount">
                            <Form.Label>Deposit Amount</Form.Label>
                            <Form.Control
                                type="number"
                                value={depositAmount}
                                onChange={(e) =>
                                    setDepositAmount(e.target.value)
                                }
                                placeholder="Enter amount to deposit"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowDepositModal(false)}
                    >
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDeposit}>
                        Deposit
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
