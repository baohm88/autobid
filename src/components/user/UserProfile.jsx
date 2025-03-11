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
    FloatingLabel,
} from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../../context/user-context";
import axios from "axios";

import QuickAccessBoxes from "./QuickAccessBoxes";
import RandomComments from "./RandomComments";
import { formatter } from "../../utils/formatter";

export default function UserProfile() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [newAvatar, setNewAvatar] = useState(null); // To store the newly selected avatar
    const [newAvatarPreview, setNewAvatarPreview] = useState(null); // To display the preview of the new avatar
    const [isLoading, setIsLoading] = useState(false);

    document.title = user !== null ? user.username : "Account Details";

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
        setIsLoading(true);
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
        userData.admin = user.admin;
        userData.balance = user.balance;
        userData.password = user.password;
        userData.created_at = user.created_at;

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
                navigate("/account/dashboard");
                setUser(userData); // Update the user context
                localStorage.setItem("user", JSON.stringify(userData)); // Update localStorage
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            console.error("Failed to update profile!", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Col sm className="min-vh-100">
            <h3 className="mb-3">Dashboard</h3>

            {/* Profile Card */}

            <Card className="mb-3 shadow-sm">
                <Row className="g-0">
                    {/* Left Column: Profile Picture and Edit Button */}
                    <Col
                        md={4}
                        lg={3}
                        className="p-4 d-flex flex-column justify-content-center align-items-center bg-light" // Added bg-light for contrast
                    >
                        <div className="text-center">
                            <img
                                src={
                                    newAvatarPreview ||
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
                                onClick={handleShow}
                                className="w-75"
                            >
                                <i className="bi bi-person-fill-gear "></i> Edit
                                Profile
                            </Button>
                        </div>
                    </Col>

                    {/* Right Column: User Info */}
                    <Col md={8} lg={9} className="p-4">
                        <Card.Body className="h-100 d-flex flex-column justify-content-center">
                            <Card.Title className="mb-3 fs-3 fw-bold">
                                {" "}
                                {user.username}
                            </Card.Title>
                            <Card.Text className="text-muted mb-4 fs-5">
                                {" "}
                                {user.bio || "No bio available."}{" "}
                            </Card.Text>
                            <Card.Text className="text-muted">
                                <small>
                                    Member since{" "}
                                    <span className="fw-bold">
                                        {" "}
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
                        <div className="d-flex flex-column align-items-center gap-3 mb-3">
                            <img
                                src={
                                    newAvatarPreview ||
                                    user.image_url ||
                                    "https://png.pngtree.com/png-clipart/20240705/original/pngtree-web-programmer-avatar-png-image_15495270.png"
                                } // Show new avatar preview if available
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
                                variant="warning"
                                size="sm"
                                onClick={() =>
                                    document
                                        .getElementById("avatar-upload")
                                        .click()
                                }
                            >
                                <i className="bi bi-person-bounding-box"></i>{" "}
                                Choose a different picture
                            </Button>
                        </div>

                        <FloatingLabel
                            controlId="email"
                            label="New Email"
                            className="mb-3"
                        >
                            <Form.Control
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </FloatingLabel>

                        <Row>
                            <Col>
                                <FloatingLabel
                                    controlId="username"
                                    label="Username"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={user.username}
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                username: e.target.value,
                                            })
                                        }
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlId="password"
                                    label="New Password"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>

                        {/* Balance */}
                        <Row>
                            <Col>
                                <span>Balance: </span>{" "}
                                <span className="fw-bold">
                                    {formatter.format(user.balance)}
                                </span>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlId="balance"
                                    label="Deposit"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="number"
                                        name="balance"
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                balance: e.target.value,
                                            })
                                        }
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>

                        <FloatingLabel
                            controlId="bio"
                            label="Bio"
                            className="mb-3"
                        >
                            <Form.Control
                                as="textarea"
                                name="bio"
                                value={user.bio}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        bio: e.target.value,
                                    })
                                }
                            />
                        </FloatingLabel>

                        <Modal.Footer>
                            <Button
                                variant="light"
                                size="sm"
                                onClick={handleClose}
                            >
                                Close
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? "Saving..." : "Save"}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

            <QuickAccessBoxes />
            <RandomComments />
        </Col>
    );
}
