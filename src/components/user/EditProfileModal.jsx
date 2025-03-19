// src/components/user/EditProfileModal.jsx
import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { formatter } from "../../utils/formatter";
import { toast } from "react-toastify";
import { headers } from "./dummy_data";

export default function EditProfileModal({ show, handleClose }) {
    const { user, setUser } = useAuth();
    const [avatarPreview, setAvatarPreview] = useState(user.image_url || "");
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Required"),
        username: Yup.string().min(3).required("Required"),
        password: Yup.string()
            .min(6, "Minimum 6 characters")
            .required("Required"),
        bio: Yup.string(),
        balance: Yup.number().min(0, "Must be positive").required("Required"),
    });

    const formik = useFormik({
        initialValues: {
            email: user.email || "",
            username: user.username || "",
            password: user.password || "",
            bio: user.bio || "",
            balance: user.balance || 0,
            image: null,
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            let imageUrl = user.image_url;

            // Upload avatar if changed
            if (values.image) {
                const formData = new FormData();
                formData.append("file", values.image);
                formData.append("upload_preset", "ml_default");

                try {
                    const res = await axios.post(
                        "https://api.cloudinary.com/v1_1/dppk10edk/image/upload",
                        formData
                    );
                    imageUrl = res.data.secure_url;
                } catch (err) {
                    console.error("Image upload failed", err);
                    toast.error("Failed to upload avatar.");
                    return;
                }
            }

            const updatedUser = {
                ...user,
                email: values.email,
                username: values.username,
                password: values.password,
                bio: values.bio,
                balance: values.balance,
                image_url: imageUrl,
            };

            try {
                const res = await axios.put(
                    "http://localhost:8080/update-account",
                    updatedUser,
                    headers
                );

                if (res.status === 200) {
                    toast.success("Profile updated!");
                    setUser(updatedUser);
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                    handleClose();
                }
            } catch (err) {
                console.error("Update failed", err);
                toast.error("Update failed!");
            } finally {
                setLoading(false);
            }
        },
    });

    const handleAvatarChange = (e) => {
        const file = e.currentTarget.files[0];
        if (file) {
            formik.setFieldValue("image", file);

            const reader = new FileReader();
            reader.onloadend = () => setAvatarPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <div className="d-flex flex-column align-items-center gap-3 mb-3">
                        <img
                            src={
                                avatarPreview ||
                                "https://png.pngtree.com/png-clipart/20240705/original/pngtree-web-programmer-avatar-png-image_15495270.png"
                            }
                            className="img-fluid rounded-circle"
                            alt="Preview"
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
                                document.getElementById("avatar-upload").click()
                            }
                        >
                            <i className="bi bi-person-bounding-box"></i> Choose
                            a different picture
                        </Button>
                    </div>

                    <FloatingLabel label="Email" className="mb-3">
                        <Form.Control
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            isInvalid={
                                formik.touched.email && !!formik.errors.email
                            }
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.email}
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <Row>
                        <Col>
                            <FloatingLabel label="Username" className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    isInvalid={
                                        formik.touched.username &&
                                        !!formik.errors.username
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.username}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel label="Password" className="mb-3">
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    isInvalid={
                                        formik.touched.password &&
                                        !!formik.errors.password
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.password}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Col>
                    </Row>

                    {/* <Row>
                        <Col>
                            <span>Current Balance: </span>
                            <span className="fw-bold">
                                {formatter.format(user.balance)}
                            </span>
                        </Col>
                        <Col>
                            <FloatingLabel label="Deposit" className="mb-3">
                                <Form.Control
                                    type="number"
                                    name="balance"
                                    value={formik.values.balance}
                                    onChange={formik.handleChange}
                                    isInvalid={
                                        formik.touched.balance &&
                                        !!formik.errors.balance
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.balance}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Col>
                    </Row> */}

                    <FloatingLabel label="Bio" className="mb-3">
                        <Form.Control
                            as="textarea"
                            name="bio"
                            value={formik.values.bio}
                            onChange={formik.handleChange}
                        />
                    </FloatingLabel>

                    <Modal.Footer>
                        <Button variant="light" size="sm" onClick={handleClose}>
                            Close
                        </Button>
                        <Button
                            variant="danger"
                            size="sm"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
