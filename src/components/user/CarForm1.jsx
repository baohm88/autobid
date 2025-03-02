import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../context/user-context";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Row, Col, Button, Image } from "react-bootstrap";

const BODY_STYLES = [
    "Coupe",
    "Convertible",
    "Hatchback",
    "Sedan",
    "SUV/Crossover",
    "Truck",
    "Van/Minivan",
    "Wagon",
];

export default function CarForm() {
    const [modified, setModified] = useState("");
    const [hasFlaw, setHasFlaw] = useState("");
    const [imageLinks, setImageLinks] = useState(Array(10).fill(""));
    const [uploadedImages, setUploadedImages] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    document.title = "Add new car";

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

    const handleRemoveImage = (index) => {
        const newImages = [...uploadedImages];
        newImages.splice(index, 1);
        setUploadedImages(newImages);
    };

    async function carFormAction(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const carData = Object.fromEntries(formData.entries());
        carData.user = user.id;
        carData.description = `~${carData.mileage}, ${carData.engine}, ${carData.exterior}`;
        carData.images = [...imageLinks.filter((link) => link.trim() !== ""), ...uploadedImages];
        console.log(carData);

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

    const handleImageLinkChange = (index, value) => {
        const newImageLinks = [...imageLinks];
        newImageLinks[index] = value;
        setImageLinks(newImageLinks);
    };

    return (
        <Container>
            <h1 className="text-center">Add a new car</h1>
            <Card className="bg-body-tertiary">
                <Card.Body>
                    <Form onSubmit={carFormAction}>
                        {/* 1st row */}
                        <Row className="mb-3">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Year</Form.Label>
                                    <Form.Select name="year" defaultValue="">
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

                        {/* 2nd row */}
                        {/* <Row className="mb-3">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Transmission</Form.Label>
                                    <Form.Select name="transmission">
                                        <option>Select transmission</option>
                                        <option value="automatic">
                                            Automatic
                                        </option>
                                        <option value="manual">Manual</option>
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
                        </Row> */}

                        {/* 3rd row */}
                        {/* <Row className="mb-3">
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
                                        name="interior_color"
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
                        </Row> */}

                        {/* 4th row */}
                        {/* <Row className="mb-3">
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
                        </Row> */}

                        {/* <Row className="mb-3">
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
                        </Row> */}

                        {/* <Row className="mb-3">
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
                        </Row> */}

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

                        {/* <Row className="mb-3">
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
                        </Row> */}

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
                                        placeholder='Separate each item with ",".'
                                    />
                                </Form.Group>
                            </Row>
                        )}

                        {/* image link */}
                        {/* {imageLinks.map((link, index) => (
                            <Form.Group key={index} className="mb-2">
                                <Form.Label>Image URL {index + 1}</Form.Label>
                                <Form.Control
                                    type="url"
                                    value={link}
                                    onChange={(e) =>
                                        handleImageLinkChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                />
                            </Form.Group>
                        ))} */}

                        {/* Image upload */}
                        <Form.Group controlId="imageUpload" className="mb-3">
                            <Form.Label>Upload Images</Form.Label>
                            <Form.Control
                                type="file"
                                multiple
                                onChange={handleImageUpload}
                            />
                        </Form.Group>

                        {/* Display uploaded images */}
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

                        <Button type="submit" variant="primary">
                            Save
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}