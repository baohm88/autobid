import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Hooks
import { useCarDetails } from "../hooks/useCarDetails";
import { useCountdown } from "../hooks/useCountDown";
import { useBidHandler } from "../hooks/useBidHandler";

// Context
import { useWatchList } from "../context/WatchListContext";
import { useAuth } from "../context/AuthContext";

// UI
import { AlertBox } from "./AlertBox";
import ImageViewerModal from "./ImageViewerModal";
import BidModal from "./BidModal";
import DepositModal from "./DepositModal";
import WatchListButton from "./WatchListButton";

// Car components
import BidsSection from "../components/car/BidsSection";
import QASection from "../components/car/QASection";
import VideosSection from "../components/car/VideosSection";
import ButtonsGroup from "../components/car/ButtonsGroup";
import CarDetailsTable from "../components/car/CarDetailsTable";
import EquipmentSection from "../components/car/EquipmentSection";
import ModificationsSection from "../components/car/ModificationsSection";
import CarImagesSection from "../components/car/CarImagesSection";
import FlawsSection from "../components/car/FlawsSection";
import CurrentBidSection from "../components/car/CurrentBidSection";

export default function CarDetailsModal({ show, onClose, carId }) {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const {
        car,
        loading: fetching,
        error,
    } = useCarDetails(show && carId ? carId : null);
    const {
        bidAmount,
        setBidAmount,
        depositAmount,
        setDepositAmount,
        showBidModal,
        setShowBidModal,
        showDepositModal,
        setShowDepositModal,
        loading,
        handleSaveBid,
        handleDeposit,
    } = useBidHandler({ car, user, setUser });

    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const { isInWatchList } = useWatchList();
    const { isExpired } = useCountdown(car?.end_time);

    const isOwner = user && car && user.id === car.user;

    // Keyboard navigation for images
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (showImageModal) {
                if (event.key === "ArrowLeft") showPreviousImage();
                if (event.key === "ArrowRight") showNextImage();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [showImageModal, selectedImageIndex]);

    // Modal title
    useEffect(() => {
        if (car) {
            document.title = `${car.year_model} ${car.make} ${car.model}`;
        }
        return () => {
            document.title = "Car Auctions";
        };
    }, [car]);

    const openImageModal = (index) => {
        setSelectedImageIndex(index);
        setShowImageModal(true);
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

    const visibleThumbnails = car?.images?.slice(0, 8) || [];
    const hiddenCount = car?.images?.length > 8 ? car.images.length - 8 : 0;

    if (fetching) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">
                        Loading car details...
                    </span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return <AlertBox variant="danger" message={error} onClose={() => {}} />;
    }

    return (
        <Modal show={show} onHide={onClose} centered scrollable size="xl">
            <Modal.Header closeButton>
                <Modal.Title>
                    {car
                        ? `${car.year_model} ${car.make} ${car.model}`
                        : "Car Details"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {fetching ? (
                    <div className="text-center my-3">
                        <Spinner animation="border" />
                    </div>
                ) : error ? (
                    <AlertBox message={error} onClose={onClose} />
                ) : (
                    <>
                        <p className="text-muted mb-1">
                            ~{car.mileage} miles, {car.transmission}{" "}
                            {car.engine} engine, {car.exterior_color} exterior
                        </p>

                        {/* Edit Button (only visible to the owner) */}
                        <div className="d-flex align-items-center mb-3 ">
                            {isOwner && (
                                <Button
                                    variant="primary"
                                    className="me-2"
                                    onClick={() =>
                                        navigate(`/listings/${car.id}/edit`)
                                    }
                                >
                                    <i className="bi bi-pencil-square me-2"></i>{" "}
                                    Edit Car Info
                                </Button>
                            )}

                            {user && !isOwner && (
                                <>
                                    {!isExpired && (
                                        <Button
                                            variant="danger"
                                            className="me-2"
                                            onClick={handlePlaceBid}
                                        >
                                            <i className="bi bi-currency-dollar"></i>{" "}
                                            Place Bid
                                        </Button>
                                    )}
                                </>
                            )}

                            <span className="d-inline-flex align-items-center bg-body px-3 rounded border">
                                <WatchListButton carId={car.id} />{" "}
                                <span className="ms-2 text-muted">
                                    {isInWatchList(car?.id)
                                        ? "Watching"
                                        : "Watch"}
                                </span>
                            </span>
                        </div>

                        <CarImagesSection
                            car={car}
                            openModal={openImageModal}
                            visibleThumbnails={visibleThumbnails}
                            hiddenCount={hiddenCount}
                        />

                        <Row>
                            <Col lg={12} className="mt-3">
                                <ButtonsGroup car={car} />
                                <CarDetailsTable car={car} />
                                <EquipmentSection
                                    equipments={car.equipment.split(";")}
                                />
                                <ModificationsSection
                                    modifications={car.modifications.split(";")}
                                />
                                <FlawsSection flaws={car.flaws.split(";")} />
                                <VideosSection car={car} />
                                <QASection car={car} />
                                <CurrentBidSection
                                    car={car}
                                    onPlaceBid={handlePlaceBid}
                                />
                                <BidsSection car={car} />
                            </Col>
                        </Row>

                        {/* Fullscreen Image Viewer */}
                        <ImageViewerModal
                            show={showImageModal}
                            imageSrc={car?.images[selectedImageIndex]}
                            onClose={() => setShowImageModal(false)}
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
                        />
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
}
