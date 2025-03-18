import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Container,
    Card,
    Form,
    Row,
    Col,
    Button,
    Image,
    Spinner,
} from "react-bootstrap";
import { BODY_STYLES } from "./dummy_data";
import { formatDateTimeForInput } from "../../utils/formatter";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function UpdateCar() {
    const { id } = useParams();
    const [modified, setModified] = useState("");
    const [hasFlaw, setHasFlaw] = useState("");
    const [uploadedImages, setUploadedImages] = useState([]);
    const { user } = useAuth();

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    document.title = "Edit Car";

    useEffect(() => {
        async function fetchListing() {
            try {
                const res = await axios.get(
                    `http://localhost:8080/listings/${id}`
                );
                const car = res.data.data[0];
                setCar(car);
                setUploadedImages(car.images || []);
                const isOwner = user && car && user.id === car.user;

                if (!isOwner) {
                    toast.error(
                        "You are not the owner of this car. Please login as the owner first."
                    );
                    navigate("/");
                }
            } catch (err) {
                console.error("Failed to fetch listings:", err);
                toast.error(
                    "Failed to fetch car details. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchListing();
    }, [id]);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

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
        console.log(imagesArray);
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

    async function carFormAction(event) {
        event.preventDefault();

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

        // Prepare the updated car data
        const formData = new FormData(event.target);
        const carData = Object.fromEntries(formData.entries());
        carData.user = user.id;
        carData.images = newImageUrls; // Combine existing and new image URLs

        console.log(carData);

        // Submit updated car data to the backend
        try {
            const res = await axios.put(
                `http://localhost:8080/listings/update-listing/${id}`,
                carData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (res.status === 200) {
                toast.success(res.data.message);
                navigate(`/listings/${car.id}`);
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            console.error("Failed to update car details:", error);
        }
    }

    return (
        <Container>
            <h1 className="text-center">Edit Car</h1>
            <Card className="bg-body-tertiary">
                <Card.Body>
                    <Form onSubmit={carFormAction}>
                        {/* Year, Make, Model */}
                        <Row className="mb-3">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Year</Form.Label>
                                    <Form.Select
                                        name="year_model"
                                        defaultValue={car?.year_model || ""}
                                    >
                                        <option value="" disabled>
                                            Choose
                                        </option>
                                        {Array.from(
                                            { length: 2025 - 1960 },
                                            (_, index) => 2025 - index
                                        ).map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Make</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="make"
                                        defaultValue={car?.make || ""}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="model"
                                        defaultValue={car?.model || ""}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Transmission, Mileage, Engine */}
                        <Row className="mb-3">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Transmission</Form.Label>
                                    <Form.Select
                                        name="transmission"
                                        defaultValue={car?.transmission || ""}
                                    >
                                        <option>Select transmission</option>
                                        <option value="Automatic">
                                            Automatic
                                        </option>
                                        <option value="Manual">Manual</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Mileage (in miles)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="mileage"
                                        defaultValue={car?.mileage || ""}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Engine</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="engine"
                                        defaultValue={car?.engine || ""}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Body Style, Interior Color, Exterior Color */}
                        <Row className="mb-3">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Body Style</Form.Label>
                                    <Form.Select
                                        name="body_style"
                                        defaultValue={car?.body_style || ""}
                                    >
                                        <option>Select Body Style</option>
                                        {BODY_STYLES.map(({ value, label }) => (
                                            <option key={value} value={value}>
                                                {label}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Interior Color</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="interial_color"
                                        defaultValue={car?.interial_color || ""}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Exterior Color</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="exterior_color"
                                        defaultValue={car?.exterior_color || ""}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Starting Bid, Start Time, End Time */}
                        <Row className="mb-3">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Starting Bid ($)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="starting_bid"
                                        defaultValue={car?.starting_bid || ""}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Start Time</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="start_time"
                                        min={new Date()
                                            .toISOString()
                                            .slice(0, 16)}
                                        defaultValue={formatDateTimeForInput(
                                            car?.start_time
                                        )}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>End Time</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="end_time"
                                        min={new Date()
                                            .toISOString()
                                            .slice(0, 16)}
                                        defaultValue={formatDateTimeForInput(
                                            car?.end_time
                                        )}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Special Options/Equipment */}
                        <Row className="mb-3">
                            <Form.Group controlId="equipment">
                                <Form.Label>
                                    Special options/equipment
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="equipment"
                                    rows={3}
                                    placeholder='Separate each item with ",".'
                                    defaultValue={car?.equipment}
                                />
                            </Form.Group>
                        </Row>

                        {/* Modified Section */}
                        <Row className="mb-3">
                            <Form.Group controlId="modified">
                                <Form.Label>
                                    Has the car been modified?
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    name="modified"
                                    onChange={(e) =>
                                        setModified(e.target.value)
                                    }
                                    defaultValue={
                                        car?.modifications !== null
                                            ? "modified"
                                            : ""
                                    }
                                >
                                    <option>Choose</option>
                                    <option value="new">Brand New</option>
                                    <option value="modified">Modified</option>
                                </Form.Control>
                            </Form.Group>
                        </Row>

                        {(modified === "modified" ||
                            car?.modifications !== null) && (
                            <Row className="mb-3">
                                <Form.Group controlId="modification">
                                    <Form.Label>
                                        List any modifications.
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="modifications"
                                        rows={3}
                                        placeholder='Separate each item with ",".'
                                        defaultValue={car?.modifications}
                                    />
                                </Form.Group>
                            </Row>
                        )}

                        {/* Flaws Section */}
                        <Row className="mb-3">
                            <Form.Group controlId="flaw">
                                <Form.Label>
                                    Are there any significant mechanical or
                                    cosmetic flaws?
                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    name="flaw"
                                    onChange={(e) => setHasFlaw(e.target.value)}
                                    defaultValue={
                                        car?.flaws !== null ? "yes" : ""
                                    }
                                >
                                    <option>Choose</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Form.Control>
                            </Form.Group>
                        </Row>

                        {(hasFlaw === "yes" || car?.flaws !== null) && (
                            <Row className="mb-3">
                                <Form.Group controlId="flaws">
                                    <Form.Label>
                                        Please give details.
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="flaws"
                                        rows={3}
                                        placeholder='Separate each item with ";".'
                                        defaultValue={car?.flaws}
                                    />
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
                                "Save Changes"
                            )}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
