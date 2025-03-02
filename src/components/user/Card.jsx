import React from "react";

export default function Card() {
    return (
        <>
            <Card className="mb-3 shadow-sm">
                {" "}
                {/* Added shadow for depth */}
                <Row className="g-0">
                    {/* Left Column: Profile Picture and Edit Button */}
                    <Col
                        md={4}
                        lg={3}
                        className="p-4 d-flex flex-column justify-content-center align-items-center bg-light" // Added bg-light for contrast
                    >
                        <div className="text-center">
                            <img
                                src={newAvatarPreview || user.image_url}
                                className="img-fluid rounded-circle mb-3" // Added margin-bottom
                                alt={user.username}
                                style={{
                                    width: "130px",
                                    height: "130px",
                                    objectFit: "cover",
                                    border: "3px solid #fff", // Added border for emphasis
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Added shadow for depth
                                }}
                            />
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={handleShow}
                                className="w-75" // Made the button wider
                            >
                                Edit Profile
                            </Button>
                        </div>
                    </Col>

                    {/* Right Column: User Info */}
                    <Col md={8} lg={9} className="p-4">
                        <Card.Body className="h-100 d-flex flex-column justify-content-center">
                            <Card.Title className="mb-3 fs-3 fw-bold">
                                {" "}
                                {/* Increased font size and weight */}
                                {user.username}
                            </Card.Title>
                            <Card.Text className="text-muted mb-4 fs-5">
                                {" "}
                                {/* Increased font size */}
                                {user.bio || "No bio available."}{" "}
                                {/* Fallback text if bio is empty */}
                            </Card.Text>
                            <Card.Text className="text-muted">
                                <small>
                                    Member since{" "}
                                    <span className="fw-bold">
                                        {" "}
                                        {/* Added bold for emphasis */}
                                        {new Date(
                                            user.created_at
                                        ).toDateString()}
                                    </span>
                                </small>
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>

            {/* Edit Profile Modal */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={useProfileFormAction}>
                        <div className="d-flex flex-column align-items-center gap-3">
                            <img
                                src={newAvatarPreview || user.image_url} // Show new avatar preview if available
                                className="img-fluid rounded-circle"
                                alt={user.username}
                                style={{
                                    width: "130px",
                                    height: "130px",
                                    objectFit: "cover",
                                }}
                            />
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                style={{ display: "none" }}
                                id="avatar-upload"
                            />
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() =>
                                    document
                                        .getElementById("avatar-upload")
                                        .click()
                                }
                            >
                                Choose a different picture
                            </Button>
                        </div>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>New Email:</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                defaultValue={user.email}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                defaultValue={user.username}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>New Password:</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                defaultValue={user.password}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="balance">
                            <Form.Label>New Balance:</Form.Label>
                            <Form.Control
                                type="number"
                                name="balance"
                                defaultValue={user.balance}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="bio">
                            <Form.Label>Bio:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="bio"
                                defaultValue={user.bio}
                            />
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
