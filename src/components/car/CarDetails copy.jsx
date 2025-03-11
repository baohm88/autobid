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
import CarImagesSection from "./CarImagesSection";
import { AlertBox } from "../../UI/AlertBox";
import IconButton from "../../UI/IconButton";
import { useCarDetails } from "../../hooks/useCarDetails";


export default function CarDetails() {
    const { id } = useParams();
    const { user, setUser } = useContext(UserContext);
    const { car, loading, error } = useCarDetails(id);
    const [showModal, setShowModal] = useState(false); // State to control image modal visibility
    const [showBidModal, setShowBidModal] = useState(false); // State to control bid modal visibility
    const [showDepositModal, setShowDepositModal] = useState(false); // State to control deposit modal visibility
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); // State to track the selected image index
    const [bidAmount, setBidAmount] = useState(""); // State to track the bid amount
    const [depositAmount, setDepositAmount] = useState(""); // State to track the deposit amount
    const [alertMessage, setAlertMessage] = useState(""); // State to track alert message
    const navigate = useNavigate();

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

    useEffect(() => {
        if (car) {
            document.title = `${car.year_model} ${car.make} ${car.model}`;
        }
        return () => {
            document.title = "Listing Details"; // cleanup (optional)
        };
    }, [car]);

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
            <AlertBox
                variant="danger"
                message={error}
                onClose={() => setError(null)}
            />
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
        if (user.balance < car.starting_bid + 100) {
            setShowDepositModal(true);
        } else {
            setShowBidModal(true);
        }
    };

    const handleSaveBid = async () => {
        if (parseFloat(bidAmount) <= car.starting_bid) {
            setAlertMessage(`Bid must be greater than ${car.starting_bid}`);
        } else if (user.balance < parseFloat(bidAmount)) {
            setAlertMessage(
                `Insufficient balance. Your balance must be at least $100 greater than your bid amount.`
            );
        } else {
            // Logic to handle placing a bid
            try {
                setLoading(true);
                const res = await axios.post(
                    "http://localhost:8080/listings/add-bid/" + car.id,
                    {
                        user_id: user.id,
                        bid_amount: bidAmount,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json", // Sending data as JSON
                        },
                    }
                );

                console.log(res.data);
                // Update user balance after placing the bid
                const newBalance = user.balance - parseFloat(bidAmount);
                const updatedUser = { ...user, balance: newBalance };
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));

                setShowBidModal(false);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDeposit = async () => {
        const newBalance = user.balance + parseFloat(depositAmount);
        const updatedUser = { ...user, balance: newBalance };

        try {
            setLoading(true);
            const res = await axios.post(
                "http://localhost:8080/deposit",
                {
                    userId: user.id,
                    amount: depositAmount,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(res.data);
            if (res.data.success === false) {
                setAlertMessage(res.data.message);
                return;
            }

            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setAlertMessage("Deposit successful!");
            // Keep the deposit modal open and clear the input field
            setDepositAmount("");
            if (newBalance >= car.starting_bid + 100) {
                setShowBidModal(true);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
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
                        variant="danger"
                        className="my-3"
                        onClick={handlePlaceBid}
                    >
                        <i className="bi bi-currency-dollar"></i> Place Bid
                    </Button>
                    <Button variant="warning" className="my-3 ms-2">
                        <i className="bi bi-heart-fill text-danger"></i> Add to
                        Watchlist
                    </Button>
                </>
            )}

            <CarImagesSection
                car={car}
                openModal={openModal}
                visibleThumbnails={visibleThumbnails}
                hiddenCount={hiddenCount}
            />

            <Row>
                <Col lg={8} className="mb-4">
                    <ButtonsGroup car={car} />
                    <CarDetailsTable car={car} />
                    <EquipmentSection equipments={car.equipment.split(";")} />
                    <ModificationsSection
                        modifications={car.modifications.split(";")}
                    />
                    <FlawsSection flaws={car.flaws.split(";")} />
                    <VideosSection car={car} />
                    <QASection car={car} />
                    <CurrentBidSection car={car} onPlaceBid={handlePlaceBid} />
                    <BidsSection car={car} />
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
                    <IconButton
                        icon={<X size={20} />}
                        onClick={() => setShowModal(false)}
                        style={{
                            position: "absolute",
                            right: "20px",
                            top: "20px",
                            zIndex: 1000,
                        }}
                    />

                    {/* Previous Button */}
                    <IconButton
                        icon={<ChevronLeft size={20} />}
                        onClick={showPreviousImage}
                        style={{
                            position: "absolute",
                            left: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 1000,
                        }}
                    />

                    {/* Image */}
                    <Image
                        src={car?.images[selectedImageIndex]}
                        alt={`Fullscreen Image ${selectedImageIndex + 1}`}
                        fluid
                        style={{ maxHeight: "90vh", objectFit: "contain" }}
                    />

                    {/* Next Button */}
                    <IconButton
                        icon={<ChevronRight size={20} />}
                        onClick={showNextImage}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 1000,
                        }}
                    />
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
                    <AlertBox
                        variant="danger"
                        message={alertMessage}
                        onClose={() => setAlertMessage("")}
                    />
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
                        variant="light"
                        onClick={() => setShowBidModal(false)}
                    >
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleSaveBid}>
                        {loading ? "Placing Bid..." : "Place Bid"}
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
                    <Modal.Title>Insufficient funds!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4> Please deposit to continue.</h4>
                    <hr />
                    <p>Current Balance: {formatter.format(user?.balance)}</p>
                    <p>
                        Required Amount:{" "}
                        {formatter.format(
                            car?.starting_bid + 100 - user?.balance
                        )}{" "}
                    </p>
                    <AlertBox
                        variant="success"
                        message={alertMessage}
                        onClose={() => setAlertMessage("")}
                    />
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
                        variant="light"
                        onClick={() => setShowDepositModal(false)}
                    >
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeposit}>
                        Deposit
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
