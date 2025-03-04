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
} from "react-bootstrap";
import { BODY_STYLES } from "./dashboardLInks";

export default function CarForm() {
    const [modified, setModified] = useState("");
    const [hasFlaw, setHasFlaw] = useState("");
    const [uploadedImages, setUploadedImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    document.title = "Add new car";

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

    async function carFormAction(event) {
        event.preventDefault();

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
        const formData = new FormData(event.target);
        const carData = Object.fromEntries(formData.entries());
        carData.user = user.id;
        carData.description = `~${carData.mileage}, ${carData.engine}, ${carData.exterior}`;
        carData.images = uploadedUrls; // Add Cloudinary URLs to carData

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
        }
    }

    return (
        <Container>
            <h1 className="text-center">Add a new car</h1>
            <Card className="bg-body-tertiary">
                <Card.Body>
                    <Form onSubmit={carFormAction}>
                        {/* Year, Make, Model */}
                        <Row className="mb-3">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Year</Form.Label>
                                    <Form.Select name="year_model" defaultValue="">
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
                                    <Form.Control type="text" name="make" />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control type="text" name="model" />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Transmission, Mileage, Engine */}
                        <Row className="mb-3">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Transmission</Form.Label>
                                    <Form.Select name="transmission">
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
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Engine</Form.Label>
                                    <Form.Control type="text" name="engine" />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Body Style, Interior Color, Exterior Color */}
                        <Row className="mb-3">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Body Style</Form.Label>
                                    <Form.Select name="body_style">
                                        <option>Select Body Style</option>
                                        {BODY_STYLES.map((style) => (
                                            <option key={style} value={style}>
                                                {style}
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
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Exterior Color</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="exterior_color"
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
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>End Time</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="end_time"
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
                                >
                                    <option>Choose</option>
                                    <option value="new">Brand New</option>
                                    <option value="modified">Modified</option>
                                </Form.Control>
                            </Form.Group>
                        </Row>

                        {modified === "modified" && (
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
                                >
                                    <option>Choose</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Form.Control>
                            </Form.Group>
                        </Row>

                        {hasFlaw === "yes" && (
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
                        <Button type="submit" variant="primary">
                            Save
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
