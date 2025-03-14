// src/components/user/ProfileCard.jsx
import { Card, Button, Col, Row } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

export default function ProfileCard({
    onEdit,
    userListings,
    activeListings,
    endedListings,
}) {
    const { user } = useAuth();
    return (
        <Card className="mb-3 shadow-sm">
            <Row className="g-0">
                <Col
                    md={4}
                    lg={3}
                    className="p-4 d-flex flex-column align-items-center bg-light"
                >
                    <img
                        src={
                            user.image_url ||
                            "https://png.pngtree.com/png-clipart/20240705/original/pngtree-web-programmer-avatar-png-image_15495270.png"
                        }
                        className="img-fluid rounded-circle mb-3"
                        alt={user.username}
                        style={{
                            width: "130px",
                            height: "130px",
                            objectFit: "cover",
                            border: "3px solid #fff",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    />
                    <Button
                        variant="warning"
                        size="sm"
                        className="w-75"
                        onClick={onEdit}
                    >
                        <i className="bi bi-person-fill-gear"></i> Edit Profile
                    </Button>
                </Col>
                <Col md={8} lg={9} className="p-4">
                    <Card.Body className="h-100 d-flex flex-column justify-content-center">
                        <Card.Title className="mb-3 fs-3 fw-bold">
                            {user.username}
                        </Card.Title>
                        <Card.Text className="text-muted mb-4 fs-5">
                            {user.bio || "No bio available."}
                        </Card.Text>

                        <Card.Text className="text-muted mb-2">
                            <strong>Listings:</strong> {userListings.length}{" "}
                            total |{" "}
                            <span className="text-success">
                                {activeListings.length} active
                            </span>{" "}
                            |{" "}
                            <span className="text-secondary">
                                {endedListings.length} ended
                            </span>
                        </Card.Text>
                        <Card.Text className="text-muted">
                            <small>
                                Member since{" "}
                                <span className="fw-bold">
                                    {new Date(user.created_at).toDateString()}
                                </span>
                            </small>
                        </Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}
