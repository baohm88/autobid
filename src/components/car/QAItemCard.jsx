import { Button, Card } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

const imageStyle = {
    width: "40px",
    height: "40px",
    objectFit: "cover",
};

export default function QAItemCard({ qa, onViewAnswer }) {
    console.log(qa);

    return (
        <div className="qa-card flex-shrink-0">
            <Card
                style={{ border: "1px solid #e1e1e1", borderRadius: "8px" }}
                className="p-2 h-100"
            >
                <Card.Body className="d-flex mb-2">
                    <img
                        src={
                            qa.askerImage ||
                            "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp"
                        }
                        alt={qa.askerName}
                        className="rounded-circle me-3"
                        style={imageStyle}
                    />
                    <div className="text-truncate-container">
                        <Card.Title className="mb-1">
                            {qa.askerName}{" "}
                            <span className="text-success fw-bold">
                                {qa.askerScore}
                            </span>
                        </Card.Title>
                        <Card.Text className="text-truncate">
                            <ReactMarkdown>{`**Q:** ${qa.commentText}`}</ReactMarkdown>
                        </Card.Text>
                    </div>
                </Card.Body>

                <Card.Body className="d-flex">
                    <img
                        src={
                            qa.sellerImage ||
                            "https://vntrade.edu.vn/wp-content/uploads/2025/02/avatar-natra.webp"
                        }
                        alt={qa.sellerName}
                        className="rounded-circle me-3"
                        style={imageStyle}
                    />
                    <div className="text-truncate-container">
                        <Card.Title className="mb-1">
                            {qa.sellerName}{" "}
                            <span className="badge rounded-pill text-bg-info">
                                Seller
                            </span>
                        </Card.Title>
                        <Card.Text>
                            <ReactMarkdown>{`**A:** ${qa.answer?.answerText}`}</ReactMarkdown>
                        </Card.Text>
                    </div>
                </Card.Body>

                <Button
                    variant="link"
                    className="text-decoration-none p-0 mt-2"
                    onClick={() => onViewAnswer(qa)}
                >
                    View Full Q&A
                </Button>
            </Card>
        </div>
    );
}