import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { toast } from "react-toastify";
import useCarForm from "../../hooks/useCarForm";
import FormInput from "../../UI/FormInput";
import FormTextArea from "../../UI/FormTextArea";
import { formatDateTimeForInput } from "../../utils/formatter";
import IconButton from "../../UI/IconButton";

export default function UpdateCar() {
    const { id } = useParams();
    const { user } = useAuth();

    const [uploadedImages, setUploadedImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [imageError, setImageError] = useState("");
    const [initialValues, setInitialValues] = useState(INITIAL_CAR_FORM_VALUES);
    const navigate = useNavigate();

    document.title = "Edit Car";

    // Fetch the existing car data
    useEffect(() => {
        async function fetchListing() {
            try {
                setLoading(true);
                const res = await axios.get(
                    `http://localhost:8080/listings/${id}`
                );
                const car = res.data.data[0];
                setInitialValues(car);
                setUploadedImages(car.images || []);
                const isOwner = user && car && user.id === car.user;

                if (!isOwner) {
                    toast.error("You are not the owner of this car");
                    navigate(`/listings/${id}`);
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch listing");
            } finally {
                setLoading(false);
            }
        }

        fetchListing();
    }, [id, user, navigate]);

    // Handle form submission
    const handleSubmit = async (values, { setSubmitting }) => {
        toast.info("Submitting...");
        if (uploadedImages.length < 10) {
            setImageError("Please upload at least 10 images.");
            return;
        }

        setUpdating(true);
        setImageError("");

        // Upload new images to Cloudinary and get their URLs
        const newImageUrls = [];
        for (const image of uploadedImages) {
            if (image.startsWith("data:")) {
                // Only upload new images (data URLs)
                const file = dataURLtoFile(image, `image_${Date.now()}.jpg`);
                const url = await uploadImageToCloudinary(file);
                if (url) {
                    newImageUrls.push(url);
                }
            } else {
                // Keep existing image URLs
                newImageUrls.push(image);
            }
        }

        // Add the URLs to carData
        const carData = { ...values, images: newImageUrls, user: user.id };

        console.log("Car data to be submitted:", carData); // Debugging

        // Submit updated car data to the backend
        try {
            const res = await axios.put(
                `http://localhost:8080/listings/update-listing/${id}`,
                carData,
                headers
            );

            if (res.status === 200) {
                toast.success(res.data.message);
                navigate(`/listings/${id}`);
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update listing!");
        } finally {
            setUpdating(false);
            setSubmitting(false); // Reset Formik's submitting state
        }
    };

    const formik = useCarForm(initialValues, handleSubmit);

    // Handle image upload
    const handleImageUpload = (e) => {
        const files = e.target.files;
        const imagesArray = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onloadend = () => {
                imagesArray.push(reader.result);
                if (imagesArray.length === files.length) {
                    setUploadedImages((prev) => [...prev, ...imagesArray]); // Add new images to existing ones
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
            return response.data.secure_url; // Return the secure URL of the uploaded image
        } catch (error) {
            toast.error("Error uploading image to Cloudinary:", error);
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

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <div className="spinner-grow text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <h1 className="text-center">Edit Car</h1>
            <Card className="bg-body-tertiary">
                <Card.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        {/* Year, Make, Model */}
                        <Row className="mb-3">
                            <Col md={4}>
                                <FormInput
                                    controlId="year_model"
                                    label="Year"
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
                                    value={formatDateTimeForInput(
                                        formik.values.start_time
                                    )}
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
                                    value={formatDateTimeForInput(
                                        formik.values.end_time
                                    )}
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
                                value={
                                    formik.values.modifications !== null
                                        ? "modified"
                                        : ""
                                }
                                onChange={formik.handleChange}
                            />
                        </Row>

                        {formik.values.modifications !== null && (
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
                                value={
                                    formik.values.flaws !== null ? "yes" : ""
                                }
                                onChange={formik.handleChange}
                            />
                        </Row>

                        {formik.values.flaws !== null && (
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
                                <Col
                                    key={index}
                                    md={2}
                                    className="mb-2 position-relative"
                                >
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

                        <Button type="submit" disabled={updating}>
                            {updating ? (
                                <>
                                    <Spinner
                                        animation="border"
                                        size="sm"
                                        className="me-2"
                                    />
                                    Updating...
                                </>
                            ) : (
                                "Update Car"
                            )}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
