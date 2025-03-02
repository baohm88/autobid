import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Modal,
    Form,
    Image,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../../context/user-context";
import axios from "axios";

import QuickAccessBoxes from "./QuickAccessBoxes";
import RandomComments from "./RandomComments";
import DashboardSidebar from "./DashboardSidebar";

export default function SellerDashboard() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [newAvatar, setNewAvatar] = useState(null); // To store the newly selected avatar
    const [newAvatarPreview, setNewAvatarPreview] = useState(null); // To display the preview of the new avatar

    console.log(user);

    const handleClose = () => {
        setShowModal(false);
        setNewAvatar(null); // Reset the new avatar when the modal is closed
        setNewAvatarPreview(null); // Reset the preview
    };
    const handleShow = () => setShowModal(true);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewAvatar(file); // Store the new file
                setNewAvatarPreview(reader.result); // Set the preview URL
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary upload preset

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dppk10edk/image/upload",
                formData
            );
            return response.data.secure_url; // Return the secure URL of the uploaded image
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            return null;
        }
    };

    async function useProfileFormAction(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const userData = Object.fromEntries(fd.entries());
        userData.id = user.id;

        // Upload new avatar to Cloudinary if selected
        if (newAvatar) {
            const avatarUrl = await uploadImageToCloudinary(newAvatar);
            if (avatarUrl) {
                userData.image_url = avatarUrl; // Add Cloudinary URL to userData
            } else {
                alert("Failed to upload avatar.");
                return;
            }
        } else {
            // Preserve the existing image_url if no avatar is selected
            userData.image_url = user.image_url;
        }

        console.log(userData);

        try {
            const res = await axios.put(
                `http://localhost:8080/update-account`,
                userData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(res);

            if (res.status === 200) {
                alert(res.data.message);
                handleClose();
                navigate("/account/listings");
                setUser(userData); // Update the user context
                localStorage.setItem("user", JSON.stringify(userData)); // Update localStorage
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            console.error("Failed to update profile!", error);
        }
    }

    return (
        <Container>
            <Row>
                {/* Sidebar */}
                <DashboardSidebar />

                {/* Main Content */}
                <Col sm className="p-4 min-vh-100">
                    {/* Heading */}
                    <h3 className="mb-3">Dashboard</h3>

                    {/* Profile Card */}

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
                                            boxShadow:
                                                "0 4px 6px rgba(0, 0, 0, 0.1)", // Added shadow for depth
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

                                <Form.Group
                                    className="mb-3"
                                    controlId="username"
                                >
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        defaultValue={user.username}
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="password"
                                >
                                    <Form.Label>New Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        defaultValue={user.password}
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="balance"
                                >
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
                                    <Button
                                        variant="secondary"
                                        onClick={handleClose}
                                    >
                                        Close
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Save
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        </Modal.Body>
                    </Modal>

                    {/* Quick Access Boxes */}
                    <QuickAccessBoxes />

                    {/* Why Sell on Cars & Bids? Section */}
                    <RandomComments />
                </Col>
            </Row>
        </Container>
    );
}
