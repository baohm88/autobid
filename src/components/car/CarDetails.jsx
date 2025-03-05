import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

export default function CarDetails() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); // State to track the selected image index

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

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (showModal) {
                if (event.key === "ArrowLeft") {
                    handlePrevious();
                } else if (event.key === "ArrowRight") {
                    handleNext();
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

    // Handle loading and error states
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

    // Function to open the modal and set the selected image index
    const openModal = (index) => {
        setSelectedImageIndex(index);
        setShowModal(true);
    };

    // Function to navigate to the previous image
    const handlePrevious = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === 0 ? car.images.length - 1 : prevIndex - 1
        );
    };

    // Function to navigate to the next image
    const handleNext = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === car.images.length - 1 ? 0 : prevIndex + 1
        );
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
                                    onClick={() => openModal(index)} // Open modal with the clicked image
                                />
                                {index === 7 && hiddenCount > 0 && (
                                    <Button
                                        variant="dark"
                                        className="w-100 overlay-thumbnail"
                                        onClick={() => openModal(8)} // Open modal starting from the 9th image
                                    >
                                        +{hiddenCount} Photos
                                    </Button>
                                )}
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

            {/* Time Left / High Bid / Bids / Comments + Place Bid + Auctions ending soon */}
            <Row>
                <Col lg={8} className="mb-4">
                    <Container>
                        <h1>Car # {id}</h1>
                        <ButtonsGroup />
                    </Container>

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
                        onClick={handlePrevious}
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
                        onClick={handleNext}
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
        </Container>
    );
}
