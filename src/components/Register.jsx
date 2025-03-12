import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Image, FloatingLabel } from "react-bootstrap";
import {
    hasMinLength,
    isEmail,
    isEmpty,
    isEqualsToOtherValue,
} from "../utils/validation";
import { toast } from "react-toastify";

export default function Register() {
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [password2Error, setPassword2Error] = useState("");
    const [avatar, setAvatar] = useState(null); // To store the selected avatar image
    const [avatarPreview, setAvatarPreview] = useState(null); // To display the avatar preview
    const [loading, setLoading] = useState(false); // State to track loading status

    const navigate = useNavigate();
    document.title = "Registration";

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(file);
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveAvatar = () => {
        setAvatar(null);
        setAvatarPreview(null);
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

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true); // Set loading to true when form is submitted
        const fd = new FormData(e.target);
        const userData = Object.fromEntries(fd.entries());

        // Reset validation errors
        setEmailError("");
        setUsernameError("");
        setPasswordError("");
        setPassword2Error("");

        // Validate email
        if (isEmpty(userData.email) || !isEmail(userData.email)) {
            setEmailError("Please enter a valid email");
            setLoading(false);
            return;
        }

        // Validate username
        if (isEmpty(userData.username)) {
            setUsernameError("Username is required");
            setLoading(false);
            return;
        }

        // Validate password
        if (isEmpty(userData.password)) {
            setPasswordError("Password is required");
            setLoading(false);
            return;
        }

        // Validate confirm password
        if (isEmpty(userData.password2)) {
            setPassword2Error("Confirm password is required");
            setLoading(false);
            return;
        }

        // Check if passwords match
        if (!isEqualsToOtherValue(userData.password, userData.password2)) {
            setPassword2Error("Passwords must match");
            setLoading(false);
            return;
        }

        // Upload avatar to Cloudinary if selected
        if (avatar) {
            const avatarUrl = await uploadImageToCloudinary(avatar);
            if (avatarUrl) {
                userData.image_url = avatarUrl; // Add Cloudinary URL to userData
            } else {
                toast.error("Failed to upload avatar.");
                setLoading(false);
                return;
            }
        }

        delete userData.password2;

        try {
            const response = await axios.post(
                `http://localhost:8080/register`,
                userData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(response);

            if (response.data.success) {
                toast.success(response.data.message);

                navigate("/login");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Registration request failed.");
            console.log(error);
        } finally {
            setLoading(false); // Set loading to false after request is complete
        }
    }

    return (
        <Container className="mt-4">
            <h2 className="text-center">Register a new account</h2>
            {/* {serverError && <Alert variant="danger">{serverError}</Alert>} */}
            <Form onSubmit={handleSubmit} className="col-md-6 col-lg-4 mx-auto">
                <FloatingLabel controlId="email" label="Email" className="mb-3">
                    <Form.Control
                        type="email"
                        name="email"
                        className={emailError ? "is-invalid" : ""}
                    />
                    {emailError && (
                        <div className="invalid-feedback">{emailError}</div>
                    )}
                </FloatingLabel>

                <FloatingLabel
                    controlId="username"
                    label="Username"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        name="username"
                        className={usernameError ? "is-invalid" : ""}
                    />
                    {usernameError && (
                        <div className="invalid-feedback">{usernameError}</div>
                    )}
                </FloatingLabel>

                <FloatingLabel
                    controlId="password"
                    label="Password"
                    className="mb-3"
                >
                    <Form.Control
                        type="password"
                        name="password"
                        className={passwordError ? "is-invalid" : ""}
                    />
                    {passwordError && (
                        <div className="invalid-feedback">{passwordError}</div>
                    )}
                </FloatingLabel>

                <FloatingLabel
                    controlId="password2"
                    label="Confirm Password"
                    className="mb-3"
                >
                    <Form.Control
                        type="password"
                        name="password2"
                        className={password2Error ? "is-invalid" : ""}
                    />
                    {password2Error && (
                        <div className="invalid-feedback">{password2Error}</div>
                    )}
                </FloatingLabel>

                <Form.Group className="mb-3" controlId="avatar">
                    <Form.Label>Avatar:</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="mb-2"
                    />
                    {avatarPreview && (
                        <div className="d-flex align-items-center">
                            <Image
                                src={avatarPreview}
                                thumbnail
                                style={{ width: "100px", height: "100px" }}
                                className="me-2"
                            />
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={handleRemoveAvatar}
                            >
                                Remove
                            </Button>
                        </div>
                    )}
                </Form.Group>

                <FloatingLabel controlId="bio" label="Bio" className="mb-3">
                    <Form.Control as="textarea" name="bio" />
                </FloatingLabel>

                <Button
                    variant="danger"
                    type="submit"
                    className="w-100 py-2 mb-3"
                    disabled={loading} // Disable button when loading
                >
                    {loading ? "Registering..." : "Register"}
                </Button>

                <p>
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </Form>
        </Container>
    );
}
