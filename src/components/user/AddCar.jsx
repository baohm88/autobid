import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "react-bootstrap-icons";
import {
    Container,
    Card,
    Form,
    Row,
    Col,
    Button,
    Image,
    Spinner,
    Alert,
} from "react-bootstrap";
import {
    BODY_STYLES,
    MODIFIED_OPTIONS,
    TRANSMISSION_OPTIONS,
    INITIAL_CAR_FORM_VALUES,
    headers,
} from "./dummy_data";

import { useAuth } from "../../context/AuthContext";
import FormInput from "../../UI/FormInput";
import FormTextArea from "../../UI/FormTextArea";
import IconButton from "../../UI/IconButton";
import useCarForm from "../../hooks/useCarForm";
import { toast } from "react-toastify";
import { useCarContext } from "../../context/CarContext";

export default function AddCar() {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageError, setImageError] = useState("");
    const { user } = useAuth();
    const { addNewCar } = useCarContext();
    const navigate = useNavigate();

    document.title = "Add new car";

    const handleSubmit = async (values) => {
        if (uploadedImages.length < 10) {
            setImageError("Please upload at least 10 images.");
            return;
        }

        setLoading(true);
        setImageError("");

        // Upload images to Cloudinary and get their URLs
        const uploadedUrls = [];
        for (const image of uploadedImages) {
            const file = dataURLtoFile(image, `image_${Date.now()}.jpg`);
            const url = await uploadImageToCloudinary(file);
            if (url) {
                uploadedUrls.push(url);
            }
        }

        // Add the URLs to carData
        const carData = { ...values, user: user.id, images: uploadedUrls };

        // Submit car data to the backend
        try {
            const res = await axios.post(
                "http://localhost:8080/listings/add-listing",
                carData,
                headers
            );

            if (res.status === 200) {
                addNewCar(res.data.data);
                toast.success(res.data.message);
                toast.success(
                    "Your list has been added and pending approval by the admin"
                );
                console.log(res.data);
                navigate("/");
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            console.error("Failed to add a listing!", error);
        } finally {
            setLoading(false);
        }
    };

    const formik = useCarForm(INITIAL_CAR_FORM_VALUES, handleSubmit);

    // Handle image upload
    const handleImageUpload = (event) => {
        const files = event.target.files;
        const imagesArray = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onloadend = () => {
                imagesArray.push(reader.result);
                if (imagesArray.length === files.length) {
                    setUploadedImages([...uploadedImages, ...imagesArray]);
                }
            };

            reader.readAsDataURL(file);
        }
    };

    // Handle image removal
    const handleRemoveImage = (index) => {
        const newImages = [...uploadedImages];
        newImages.splice(index, 1);
        setUploadedImages(newImages);

        const newUrls = [...imageUrls];
        newUrls.splice(index, 1);
        setImageUrls(newUrls);
    };

    // Upload image to Cloudinary
    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default");

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dppk10edk/image/upload",
                formData
            );
            console.log(response);

            return response.data.secure_url; // Return the secure URL of the uploaded image
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            return null;
        }
    };

    // Convert data URL to File object
    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    return (
        <Container>
            <h1 className="text-center">Add a new car</h1>
            <Card className="bg-body-tertiary">
                <Card.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        {/* Year, Make, Model */}
                        <Row className="mb-3">
                            <Col md={4}>
                                <FormInput
                                    controlId="year_model"
                                    label="Year:"
                                    name="year_model"
                                    value={formik.values.year_model}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.year_model}
                                    error={formik.errors.year_model}
                                    as="select"
                                    options={Array.from(
                                        { length: 2025 - 2000 },
                                        (_, index) => ({
                                            value: 2025 - index,
                                            label: 2025 - index,
                                        })
                                    )}
                                />
                            </Col>
                            <Col md={4}>
                                <FormInput
                                    controlId="make"
                                    label="Make"
                                    name="make"
                                    type="text"
                                    value={formik.values.make}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.make}
                                    error={formik.errors.make}
                                />
                            </Col>
                            <Col md={4}>
                                <FormInput
                                    controlId="model"
                                    label="Model"
                                    name="model"
                                    type="text"
                                    value={formik.values.model}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.model}
                                    error={formik.errors.model}
                                />
                            </Col>
                        </Row>

                        {/* Transmission, Mileage, Engine */}
                        <Row className="mb-3">
                            <Col md={4}>
                                <FormInput
                                    controlId="transmission"
                                    label="Transmission"
                                    name="transmission"
                                    as="select"
                                    options={TRANSMISSION_OPTIONS}
                                    value={formik.values.transmission}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.transmission}
                                    error={formik.errors.transmission}
                                />
                            </Col>
                            <Col md={4}>
                                <FormInput
                                    controlId="mileage"
                                    label="Mileage"
                                    name="mileage"
                                    type="number"
                                    value={formik.values.mileage}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.mileage}
                                    error={formik.errors.mileage}
                                />
                            </Col>
                            <Col md={4}>
                                <FormInput
                                    controlId="engine"
                                    label="Engine"
                                    name="engine"
                                    type="text"
                                    value={formik.values.engine}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.engine}
                                    error={formik.errors.engine}
                                />
                            </Col>
                        </Row>

                        {/* Body Style, Interior Color, Exterior Color */}
                        <Row className="mb-3">
                            <Col md={4}>
                                <FormInput
                                    controlId="body_style"
                                    label="Body Style"
                                    name="body_style"
                                    as="select"
                                    options={BODY_STYLES}
                                    value={formik.values.body_style}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.body_style}
                                    error={formik.errors.body_style}
                                />
                            </Col>
                            <Col md={4}>
                                <FormInput
                                    controlId="interial_color"
                                    label="Interior Color"
                                    name="interial_color"
                                    type="text"
                                    value={formik.values.interial_color}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.interial_color}
                                    error={formik.errors.interial_color}
                                />
                            </Col>
                            <Col md={4}>
                                <FormInput
                                    controlId="exterior_color"
                                    label="Exterior Color"
                                    name="exterior_color"
                                    type="text"
                                    value={formik.values.exterior_color}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.exterior_color}
                                    error={formik.errors.exterior_color}
                                />
                            </Col>
                        </Row>

                        {/* Starting Bid, Start Time, End Time */}
                        <Row className="mb-3">
                            <Col md={4}>
                                <FormInput
                                    controlId="starting_bid"
                                    label="Starting Bid ($)"
                                    name="starting_bid"
                                    type="number"
                                    value={formik.values.starting_bid}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.starting_bid}
                                    error={formik.errors.starting_bid}
                                />
                            </Col>
                            <Col md={4}>
                                <FormInput
                                    controlId="start_time"
                                    label="Start Time"
                                    name="start_time"
                                    type="datetime-local"
                                    value={formik.values.start_time}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.start_time}
                                    error={formik.errors.start_time}
                                    min={new Date().toISOString().slice(0, 16)}
                                />
                            </Col>
                            <Col md={4}>
                                <FormInput
                                    controlId="end_time"
                                    label="End Time"
                                    name="end_time"
                                    type="datetime-local"
                                    value={formik.values.end_time}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.end_time}
                                    error={formik.errors.end_time}
                                    min={new Date().toISOString().slice(0, 16)}
                                />
                            </Col>
                        </Row>

                        {/* Special Options/Equipment */}
                        <Row className="mb-3">
                            <FormTextArea
                                controlId="equipment"
                                label="Special options/equipment - Separate each item with ;"
                                name="equipment"
                                value={formik.values.equipment}
                                onChange={formik.handleChange}
                                rows={5}
                            />
                        </Row>

                        {/* Modified Section */}
                        <Row className="mb-3">
                            <FormInput
                                controlId="modified"
                                label="Has the car been modified?"
                                name="modified"
                                as="select"
                                options={MODIFIED_OPTIONS}
                                value={formik.values.modified}
                                onChange={formik.handleChange}
                            />
                        </Row>

                        {formik.values.modified === "modified" && (
                            <Row className="mb-3">
                                <FormTextArea
                                    controlId="modifications"
                                    label="List of modifications - Separate each item with ;"
                                    name="modifications"
                                    value={formik.values.modifications}
                                    onChange={formik.handleChange}
                                    rows={5}
                                />
                            </Row>
                        )}

                        {/* Flaws Section */}
                        <Row className="mb-3">
                            <FormInput
                                controlId="flaw"
                                label="Are there any significant mechanical or cosmetic flaws?"
                                name="flaw"
                                as="select"
                                options={[
                                    { value: "", label: "Choose" },
                                    { value: "yes", label: "Yes" },
                                    { value: "no", label: "No" },
                                ]}
                                value={formik.values.flaw}
                                onChange={formik.handleChange}
                            />
                        </Row>

                        {formik.values.flaw === "yes" && (
                            <Row className="mb-3">
                                <FormTextArea
                                    controlId="flaws"
                                    label="List of flaws - Separate each item with ;"
                                    name="flaws"
                                    value={formik.values.flaws}
                                    onChange={formik.handleChange}
                                    rows={5}
                                />
                            </Row>
                        )}

                        {/* Image upload */}
                        <Form.Group controlId="imageUpload" className="mb-3">
                            <Form.Label>Upload Images</Form.Label>
                            <Form.Control
                                type="file"
                                multiple
                                onChange={handleImageUpload}
                            />
                        </Form.Group>

                        {/* Display Uploaded Images */}
                        <Row className="mb-3">
                            {uploadedImages.map((image, index) => (
                                <Col key={index} md={2} className="mb-2">
                                    <Image
                                        src={image}
                                        thumbnail
                                        className="mr-2"
                                    />
                                    <IconButton
                                        icon={<X size={20} />}
                                        variant="danger"
                                        onClick={() => handleRemoveImage(index)}
                                        style={{
                                            position: "absolute",
                                            right: "15px",
                                            top: "15px",
                                            width: "25px",
                                            height: "25px",
                                        }}
                                    />
                                </Col>
                            ))}
                        </Row>

                        {imageError && (
                            <Alert variant="danger">{imageError}</Alert>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="me-2"
                                    />
                                    Saving Car...
                                </>
                            ) : (
                                "Register Car"
                            )}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
