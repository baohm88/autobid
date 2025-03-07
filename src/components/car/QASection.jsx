import {
    Carousel,
    Container,
    Row,
    Col,
    Button,
    Card,
    Modal,
} from "react-bootstrap";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { DUMMY_QA } from "../user/dummy_data";

const image_style = {
    width: "40px",
    height: "40px",
    objectFit: "cover",
};

const card_style = {
    border: "none",
};

export default function QASection() {
    // Chia dữ liệu thành nhóm, mỗi nhóm chứa 3 Q&A
    const groupSize = 3;
    const groups = [];
    for (let i = 0; i < DUMMY_QA.length; i += groupSize) {
        groups.push(DUMMY_QA.slice(i, i + groupSize));
    }

    const [index, setIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedQA, setSelectedQA] = useState(null);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const handleViewAnswer = (qa) => {
        setSelectedQA(qa);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedQA(null);
    };

    return (
        <Container className="my-4">
            <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
                <h5 className="fw-bold mb-0">Seller Q&A ({DUMMY_QA.length})</h5>
                <div>
                    <Button
                        variant="link"
                        className="text-decoration-none me-3"
                    >
                        Ask a question
                    </Button>
                </div>
            </div>

            {/* Custom Carousel */}
            <div className="position-relative">
                <Carousel
                    activeIndex={index}
                    onSelect={handleSelect}
                    indicators={false}
                    controls={false}
                    // interval={null}
                >
                    {groups.map((group, groupIndex) => (
                        <Carousel.Item key={groupIndex}>
                            <Row className="row-cols-1 row-cols-md-3 g-3">
                                {group.map((qa) => (
                                    <Col key={qa.id}>
                                        <Card>
                                            <div>
                                                <Card
                                                    className="mb-1"
                                                    style={card_style}
                                                >
                                                    <Card.Body className="d-flex">
                                                        <img
                                                            src={qa.askerImage}
                                                            alt={qa.askerName}
                                                            className="rounded-circle me-3"
                                                            style={image_style}
                                                        />
                                                        <div className="text-truncate-container">
                                                            <Card.Title className="mb-1">
                                                                {qa.askerName}{" "}
                                                                <span className="text-success fw-bold">
                                                                    {
                                                                        qa.askerScore
                                                                    }
                                                                </span>
                                                            </Card.Title>
                                                            <Card.Text className="text-truncate">
                                                                <strong>
                                                                    Q:
                                                                </strong>{" "}
                                                                {qa.question}
                                                            </Card.Text>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                                <Card style={card_style}>
                                                    <Card.Body className="d-flex">
                                                        <img
                                                            src={qa.sellerImage}
                                                            alt={qa.sellerName}
                                                            className="rounded-circle me-3"
                                                            style={image_style}
                                                        />
                                                        <div className="text-truncate-container">
                                                            <Card.Title className="mb-1">
                                                                {qa.sellerName}{" "}
                                                                <span className="badge rounded-pill text-bg-info">
                                                                    Seller
                                                                </span>
                                                            </Card.Title>
                                                            <Card.Text className="text-truncate">
                                                                <strong>
                                                                    A:
                                                                </strong>{" "}
                                                                {qa.answer}
                                                            </Card.Text>
                                                        </div>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                            <Button
                                                variant="link"
                                                className="text-decoration-none p-0"
                                                onClick={() =>
                                                    handleViewAnswer(qa)
                                                }
                                            >
                                                View Q&A
                                            </Button>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
                <Button
                    variant="dark"
                    className="carousel-control-prev"
                    onClick={() =>
                        handleSelect(
                            index === 0 ? groups.length - 1 : index - 1
                        )
                    }
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "-40px",
                        transform: "translateY(-50%)",
                        zIndex: 1000,
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        border: "none",
                    }}
                >
                    <ChevronLeft size={20} />
                </Button>
                <Button
                    variant="dark"
                    className="carousel-control-next"
                    onClick={() =>
                        handleSelect(
                            index === groups.length - 1 ? 0 : index + 1
                        )
                    }
                    style={{
                        position: "absolute",
                        top: "50%",
                        right: "-40px",
                        transform: "translateY(-50%)",
                        zIndex: 1000,
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        border: "none",
                    }}
                >
                    <ChevronRight size={20} />
                </Button>
            </div>

            {/* Modal for viewing full Q&A */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Question & Answer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedQA && (
                        <>
                            <div className=" d-flex mb-3">
                                <img
                                    src={selectedQA.askerImage}
                                    alt={selectedQA.askerName}
                                    className="rounded-circle me-3"
                                    style={image_style}
                                />
                                <div>
                                    <Card.Title className="mb-1">
                                        {selectedQA.askerName}{" "}
                                        <span className="text-success fw-bold">
                                            {selectedQA.askerScore}
                                        </span>
                                    </Card.Title>
                                    <Card.Text>
                                        <strong>Q:</strong>{" "}
                                        {selectedQA.question}
                                    </Card.Text>
                                </div>
                            </div>
                            <div className="d-flex">
                                <img
                                    src={selectedQA.sellerImage}
                                    alt={selectedQA.sellerName}
                                    className="rounded-circle me-3"
                                    style={image_style}
                                />
                                <div>
                                    <Card.Title className="mb-1">
                                        {selectedQA.sellerName}{" "}
                                        <span className="badge rounded-pill text-bg-info">
                                            Seller
                                        </span>
                                    </Card.Title>
                                    <Card.Text>
                                        <strong>A:</strong> {selectedQA.answer}
                                    </Card.Text>
                                </div>
                            </div>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
