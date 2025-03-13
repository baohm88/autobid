import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";

// Car components
import CarDetailsTable from "./CarDetailsTable";
import VideosSection from "./VideosSection";
import EndingSoonTable from "./EndingSoonTable";
import QASection from "./QASection";
import CurrentBidSection from "./CurrentBidSection";
import CarImagesSection from "./CarImagesSection";
import ButtonsGroup from "./ButtonsGroup";
import EquipmentSection from "./EquipmentSection";
import FlawsSection from "./FlawsSection";
import ModificationsSection from "./ModificationsSection";
import BidsSection from "./BidsSection";

// UI components
import BidModal from "../../UI/BidModal";
import DepositModal from "../../UI/DepositModal";
import { AlertBox } from "../../UI/AlertBox";
import ImageViewerModal from "../../UI/ImageViewerModal";

// hooks
import { useCarDetails } from "../../hooks/useCarDetails";
import { useBidHandler } from "../../hooks/useBidHandler";
import { useCountdown } from "../../hooks/useCountDown";

// utils
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useAuth } from "../../context/AuthContext";
dayjs.extend(duration);

export default function CarDetails() {
    const { id } = useParams();
    const { user, setUser } = useAuth();
    const { car, loading: fetching, error } = useCarDetails(id);

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

    const [showModal, setShowModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const { countdown, isExpired } = useCountdown(car?.end_time);

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

    // Set page title
    useEffect(() => {
        if (car) {
            document.title = `${car.year_model} ${car.make} ${car.model}`;
        }
        return () => {
            document.title = "Listing Details"; // cleanup (optional)
        };
    }, [car]);

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
        return <AlertBox variant="danger" message={error} onClose={() => {}} />;
    }

    const visibleThumbnails = car?.images?.slice(0, 8) || [];
    const hiddenCount = car?.images?.length > 8 ? car.images.length - 8 : 0;

    return (
        <Container className="py-4">
            {car && (
                <h1 className="fw-bold">
                    {car.year_model} {car.make} {car.model}
                </h1>
            )}
            <p className="text-muted">
                ~{car.mileage} miles, {car.transmission} {car.engine} engine,{" "}
                {car.exterior_color} exterior
            </p>

            <p className="text-danger fw-semibold">⏳ {countdown}</p>

            {/* Edit Button (only visible to the owner) */}

            {isOwner && (
                <Button
                    className="mb-3"
                    variant="primary"
                    onClick={() => navigate(`/listings/${car.id}/edit`)}
                >
                    <i className="bi bi-pencil-square me-1"></i> Edit Car Info
                </Button>
            )}

            {user && !isOwner && (
                <>
                    {!isExpired && (
                        <Button
                            variant="danger"
                            className="mb-3 me-2"
                            onClick={handlePlaceBid}
                        >
                            <i className="bi bi-currency-dollar"></i> Place Bid
                        </Button>
                    )}
                    <Button variant="warning" className="mb-3">
                        <i className="bi bi-heart-fill text-danger me-1"></i>{" "}
                        Add to Watchlist
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
        </Container>
    );
}
