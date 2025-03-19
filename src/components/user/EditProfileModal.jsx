import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { headers } from "./dummy_data";

export default function EditProfileModal({ show, handleClose }) {
    const { user, setUser } = useAuth();
    const [avatarPreview, setAvatarPreview] = useState(user.image_url || "");
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object({
        username: Yup.string().min(3).required("Required"),
        bio: Yup.string(),
        email: Yup.string().email("Invalid email").required("Required"),
    });

    const formik = useFormik({
        initialValues: {
            username: user.username || "",
            bio: user.bio || "",
            email: user.email || "",
            image: user.image_url || null,
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

            formik.values.id = user.id;

            if (imageUrl) {
                formik.values.image_url = imageUrl;
            }

            try {
                const res = await axios.put(
                    "http://localhost:8080/update-account",
                    formik.values,
                    headers
                );

                console.log(res);

                if (res.status === 200) {
                    toast.success(res.data.message);
                    setUser(res.data.data[0]);
                    localStorage.setItem(
                        "user",
                        JSON.stringify(res.data.data[0])
                    );
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

                    <Row>
                        <Col>
                            <FloatingLabel label="Email" className="mb-3">
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    isInvalid={
                                        formik.touched.email &&
                                        !!formik.errors.email
                                    }
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.email}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Col>
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
                    </Row>

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
