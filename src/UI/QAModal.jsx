import { Modal, Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

const imageStyle = {
    width: "50px",
    height: "50px",
    objectFit: "cover",
};

export default function QAModal({ show, onClose, qa }) {
    if (!qa) return null;

    return (
        <>
            <Modal show={show} onHide={onClose} centered size="lg">
                <Modal.Header closeButton className="bg-light border-bottom">
                    <Modal.Title>
                        <i className="bi bi-chat-left-text me-2"></i>Question &
                        Answer
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {qa && (
                        <>
                            {/* Question */}
                            <div className="d-flex mb-4 align-items-start">
                                <img
                                    src={qa.askerImage}
                                    alt={qa.askerName}
                                    className="rounded-circle me-3"
                                    style={imageStyle}
                                />
                                <div>
                                    <h6 className="mb-1">
                                        {qa.askerName}{" "}
                                        <small className="text-success fw-semibold">
                                            ({qa.askerScore} pts)
                                        </small>
                                    </h6>
                                    <p className="mb-0">
                                        <ReactMarkdown>
                                            {`**Q:** ${qa.question}`}
                                        </ReactMarkdown>
                                    </p>
                                </div>
                            </div>

                            {/* Answer */}
                            <div className="d-flex align-items-start bg-light p-3 rounded">
                                <img
                                    src={qa.sellerImage}
                                    alt={qa.sellerName}
                                    className="rounded-circle me-3"
                                    style={imageStyle}
                                />
                                <div>
                                    <h6 className="mb-1">
                                        {qa.sellerName}{" "}
                                        <span className="badge bg-info text-dark">
                                            Seller
                                        </span>
                                    </h6>
                                    <ReactMarkdown>
                                        {`**A:** ${qa.answer}`}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
