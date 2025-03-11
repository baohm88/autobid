import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../context/user-context";
import { useNavigate } from "react-router-dom";
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
    FloatingLabel,
} from "react-bootstrap";
import { BODY_STYLES } from "./dummy_data";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object().shape({
    year_model: yup.string().required("Year is required"),
    make: yup.string().required("Make is required"),
    model: yup.string().required("Model is required"),
    transmission: yup.string().required("Transmission is required"),
    mileage: yup.number().required("Mileage is required"),
    engine: yup.string().required("Engine is required"),
    body_style: yup.string().required("Body style is required"),
    interial_color: yup.string().required("Interior color is required"),
    exterior_color: yup.string().required("Exterior color is required"),
    starting_bid: yup.number().required("Starting bid is required"),
    start_time: yup.date().required("Start time is required"),
    end_time: yup.date().required("End time is required"),
    equipment: yup.string(),
    modified: yup.string(),
    modifications: yup.string(),
    flaw: yup.string(),
    flaws: yup.string(),
});

export default function AddCar() {
    const [modified, setModified] = useState("");
    const [hasFlaw, setHasFlaw] = useState("");
    const [uploadedImages, setUploadedImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageError, setImageError] = useState("");
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    document.title = "Add new car";

    const formik = useFormik({
        initialValues: {
            year_model: "",
            make: "",
            model: "",
            transmission: "",
            mileage: "",
            engine: "",
            body_style: "",
            interial_color: "",
            exterior_color: "",
            starting_bid: "",
            start_time: "",
            end_time: "",
            equipment: "",
            modified: "",
            modifications: "",
            flaw: "",
            flaws: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
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
            carData.description = `~${carData.mileage}, ${carData.engine}, ${carData.exterior_color}`;

            console.log(carData);

            // Submit car data to the backend
            try {
                const res = await axios.post(
                    "http://localhost:8080/listings/add-listing",
                    carData,
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );

                if (res.status === 200) {
                    alert(res.data.message);
                    navigate("/");
                } else {
                    console.log("Something went wrong");
                }
            } catch (error) {
                console.error("Failed to add a listing!", error);
            } finally {
                setLoading(false);
            }
        },
    });

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
                                <Form.Group>
                                    <FloatingLabel
                                        controlId="year_model"
                                        label="Year"
                                    >
                                        <Form.Select
                                            name="year_model"
                                            value={formik.values.year_model}
                                            onChange={formik.handleChange}
                                            isInvalid={
                                                !!formik.errors.year_model
                                            }
                                        >
                                            <option value="" disabled>
                                                Choose
                                            </option>
                                            {Array.from(
                                                { length: 2025 - 2000 },
                                                (_, index) => 2025 - index
                                            ).map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.year_model}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <FloatingLabel
                                        controlId="make"
                                        label="Make"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="make"
                                            value={formik.values.make}
                                            onChange={formik.handleChange}
                                            isInvalid={!!formik.errors.make}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.make}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <FloatingLabel
                                        controlId="model"
                                        label="Model"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="model"
                                            value={formik.values.model}
                                            onChange={formik.handleChange}
                                            isInvalid={!!formik.errors.model}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.model}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Transmission, Mileage, Engine */}
                        <Row className="mb-3">
                            <Col md={4}>
                                <Form.Group>
                                    <FloatingLabel
                                        controlId="transmission"
                                        label="Transmission"
                                    >
                                        <Form.Select
                                            name="transmission"
                                            value={formik.values.transmission}
                                            onChange={formik.handleChange}
                                            isInvalid={
                                                !!formik.errors.transmission
                                            }
                                        >
                                            <option value="">
                                                Select transmission
                                            </option>
                                            <option value="Automatic">
                                                Automatic
                                            </option>
                                            <option value="Manual">
                                                Manual
                                            </option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.transmission}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <FloatingLabel
                                        controlId="mileage"
                                        label="Mileage (in miles)"
                                    >
                                        <Form.Control
                                            type="number"
                                            name="mileage"
                                            value={formik.values.mileage}
                                            onChange={formik.handleChange}
                                            isInvalid={!!formik.errors.mileage}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.mileage}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <FloatingLabel
                                        controlId="engine"
                                        label="Engine"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="engine"
                                            value={formik.values.engine}
                                            onChange={formik.handleChange}
                                            isInvalid={!!formik.errors.engine}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.engine}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Body Style, Interior Color, Exterior Color */}
                        <Row className="mb-3">
                            <Col md={4}>
                                <Form.Group>
                                    <FloatingLabel
                                        controlId="body_style"
                                        label="Body Style"
                                    >
                                        <Form.Select
                                            name="body_style"
                                            value={formik.values.body_style}
                                            onChange={formik.handleChange}
                                            isInvalid={
                                                !!formik.errors.body_style
                                            }
                                        >
                                            <option value="">
                                                Select Body Style
                                            </option>
                                            {BODY_STYLES.map((style) => (
                                                <option
                                                    key={style}
                                                    value={style}
                                                >
                                                    {style}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.body_style}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <FloatingLabel
                                        controlId="interial_color"
                                        label="Interior Color"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="interial_color"
                                            value={formik.values.interial_color}
                                            onChange={formik.handleChange}
                                            isInvalid={
                                                !!formik.errors.interial_color
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.interial_color}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <FloatingLabel
                                        controlId="exterior_color"
                                        label="Exterior Color"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="exterior_color"
                                            value={formik.values.exterior_color}
                                            onChange={formik.handleChange}
                                            isInvalid={
                                                !!formik.errors.exterior_color
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.exterior_color}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Starting Bid, Start Time, End Time */}
                        <Row className="mb-3">
                            <Col md={4}>
                                <Form.Group>
                                    <FloatingLabel
                                        controlId="starting_bid"
                                        label="Starting Bid ($)"
                                    >
                                        <Form.Control
                                            type="number"
                                            name="starting_bid"
                                            value={formik.values.starting_bid}
                                            onChange={formik.handleChange}
                                            isInvalid={
                                                !!formik.errors.starting_bid
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.starting_bid}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <FloatingLabel
                                        controlId="start_time"
                                        label="Start Time"
                                    >
                                        <Form.Control
                                            type="datetime-local"
                                            name="start_time"
                                            value={formik.values.start_time}
                                            onChange={formik.handleChange}
                                            isInvalid={
                                                !!formik.errors.start_time
                                            }
                                            min={new Date()
                                                .toISOString()
                                                .slice(0, 16)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.start_time}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <FloatingLabel
                                        controlId="end_time"
                                        label="End Time"
                                    >
                                        <Form.Control
                                            type="datetime-local"
                                            name="end_time"
                                            value={formik.values.end_time}
                                            onChange={formik.handleChange}
                                            isInvalid={!!formik.errors.end_time}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.end_time}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Special Options/Equipment */}
                        <Row className="mb-3">
                            <Form.Group controlId="equipment">
                                <FloatingLabel
                                    controlId="equipment"
                                    label="Special options/equipment - Separate each item with ;"
                                >
                                    <Form.Control
                                        as="textarea"
                                        name="equipment"
                                        rows={5}
                                        value={formik.values.equipment}
                                        onChange={formik.handleChange}
                                    />
                                </FloatingLabel>
                            </Form.Group>
                        </Row>

                        {/* Modified Section */}
                        <Row className="mb-3">
                            <Form.Group controlId="modified">
                                <FloatingLabel
                                    controlId="modified"
                                    label="Has the car been modified?"
                                >
                                    <Form.Select
                                        name="modified"
                                        value={formik.values.modified}
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            setModified(e.target.value);
                                        }}
                                    >
                                        <option value="">Choose</option>
                                        <option value="new">Brand New</option>
                                        <option value="modified">
                                            Modified
                                        </option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>

                        {modified === "modified" && (
                            <Row className="mb-3">
                                <Form.Group controlId="modifications">
                                    <FloatingLabel
                                        controlId="modifications"
                                        label="List of modifications - Separate each item with ;"
                                    >
                                        <Form.Control
                                            as="textarea"
                                            name="modifications"
                                            rows={5}
                                            value={formik.values.modifications}
                                            onChange={formik.handleChange}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                            </Row>
                        )}

                        {/* Flaws Section */}
                        <Row className="mb-3">
                            <Form.Group controlId="flaw">
                                <FloatingLabel
                                    controlId="flaw"
                                    label="Are there any significant mechanical or cosmetic flaws?"
                                >
                                    <Form.Select
                                        name="flaw"
                                        value={formik.values.flaw}
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            setHasFlaw(e.target.value);
                                        }}
                                    >
                                        <option value="">Choose</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>

                        {hasFlaw === "yes" && (
                            <Row className="mb-3">
                                <Form.Group controlId="flaws">
                                    <FloatingLabel
                                        controlId="flaws"
                                        label="List of flaws - Separate each item with ;"
                                    >
                                        <Form.Control
                                            as="textarea"
                                            name="flaws"
                                            rows={5}
                                            value={formik.values.flaws}
                                            onChange={formik.handleChange}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
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
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        Remove
                                    </Button>
                                </Col>
                            ))}
                        </Row>

                        {imageError && (
                            <Alert variant="danger">{imageError}</Alert>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="danger"
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
                                    />{" "}
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
