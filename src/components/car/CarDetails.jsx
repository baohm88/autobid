import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";

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
import { useCarDetails } from "../../hooks/useCarDetails";
import ImageViewerModal from "../../UI/ImageViewerModal";
import BidModal from "../../UI/BidModal";
import DepositModal from "../../UI/DepositModal";
import MessageModal from "../../UI/MessageModal";

export default function CarDetails() {
    const { id } = useParams();
    const { user, setUser } = useContext(UserContext);
    const { car, loading: fetching, error } = useCarDetails(id);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); // State to control image modal visibility
    const [showBidModal, setShowBidModal] = useState(false); // State to control bid modal visibility
    const [showDepositModal, setShowDepositModal] = useState(false); // State to control deposit modal visibility
    const [showMessageModal, setShowMessageModal] = useState(false); // State to control message modal visibility
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); // State to track the selected image index
    const [bidAmount, setBidAmount] = useState(""); // State to track the bid amount
    const [depositAmount, setDepositAmount] = useState(""); // State to track the deposit amount
    const [bidAlert, setBidAlert] = useState("");
    const [depositAlert, setDepositAlert] = useState("");
    const [messageModalTitle, setMessageModalTitle] = useState("");
    const [messageModalMessage, setMessageModalMessage] = useState("");
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

    if (fetching) {
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
        if (!bidAmount || isNaN(bidAmount)) {
            setBidAlert("Please enter a valid bid amount.");
            return;
        }

        const bidValue = Number(bidAmount);

        if (bidValue <= car.starting_bid) {
            setBidAlert(`Bid must be greater than ${car.starting_bid}`);
        } else if (user.balance < parseFloat(bidAmount)) {
            setBidAlert(
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
                setMessageModalTitle("Bid Successful");
                setMessageModalMessage(
                    "Your bid has been successfully placed."
                );
                setShowMessageModal(true);

                setTimeout(() => {
                    setShowMessageModal(false);
                }, 3000);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDeposit = async () => {
        const depositValue = Number(depositAmount);
        const newBalance = user.balance + depositValue;
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
                setDepositAlert(res.data.message);
                return;
            }

            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setDepositAlert(
                `Deposit successful! New balance: ${formatter.format(
                    newBalance
                )}`
            );
            setDepositAmount(""); // Clear the input

            // Ask if user wants to place a bid now
            if (newBalance >= car.starting_bid + 100) {
                const wantsToBid = window.confirm(
                    `Deposit successful! New balance: ${formatter.format(
                        newBalance
                    )}. Would you like to place a bid now?`
                );
                if (wantsToBid) {
                    setShowDepositModal(false);
                    setShowBidModal(true);
                }
            }
        } catch (error) {
            setDepositAlert(error.message);
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

            {isOwner && (
                <Button
                    className="mb-3"
                    variant="primary"
                    onClick={() => navigate(`/listings/${car.id}/edit`)}
                >
                    Edit Car Info
                </Button>
            )}

            {user && (
                <>
                    <Button
                        variant="danger"
                        className="mb-3"
                        onClick={handlePlaceBid}
                    >
                        <i className="bi bi-currency-dollar"></i> Place Bid
                    </Button>
                    <Button variant="warning" className="mb-3 ms-2">
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
            <ImageViewerModal
                show={showModal}
                imageSrc={car?.images[selectedImageIndex]}
                onClose={() => setShowModal(false)}
                onPrev={showPreviousImage}
                onNext={showNextImage}
            />

            {/* Place Bid Modal */}
            <BidModal
                show={showBidModal}
                onClose={() => setShowBidModal(false)}
                car={car}
                user={user}
                bidAmount={bidAmount}
                setBidAmount={setBidAmount}
                onSubmit={handleSaveBid}
                loading={loading}
                alertMessage={bidAlert}
                clearAlert={() => setBidAlert("")}
            />

            {/* Deposit Modal */}
            <DepositModal
                show={showDepositModal}
                onClose={() => setShowDepositModal(false)}
                car={car}
                user={user}
                depositAmount={depositAmount}
                setDepositAmount={setDepositAmount}
                onSubmit={handleDeposit}
                alertMessage={depositAlert}
                clearAlert={() => setDepositAlert("")}
            />

            {/* Message Modal */}
            <MessageModal
                show={showMessageModal}
                onClose={() => setShowMessageModal(false)}
                title={messageModalTitle}
                message={messageModalMessage}
            />
        </Container>
    );
}
