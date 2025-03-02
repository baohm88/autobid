// import axios from "axios";
// import { useContext, useState } from "react";
// import { UserContext } from "../../context/user-context";
// import { useNavigate } from "react-router-dom";
// import {
//     Container,
//     Card,
//     Form,
//     Row,
//     Col,
//     Button,
//     Image,
// } from "react-bootstrap";

// export default function CarForm() {
//     const [uploadedImages, setUploadedImages] = useState([]);
//     const { user } = useContext(UserContext);
//     const navigate = useNavigate();

//     document.title = "Add new car";

//     const handleImageUpload = (event) => {
//         const files = event.target.files;
//         const imagesArray = [];

//         for (let i = 0; i < files.length; i++) {
//             const file = files[i];
//             const reader = new FileReader();

//             reader.onloadend = () => {
//                 imagesArray.push(reader.result);
//                 if (imagesArray.length === files.length) {
//                     setUploadedImages([...uploadedImages, ...imagesArray]);
//                 }
//             };

//             reader.readAsDataURL(file);
//         }
//     };

//     const handleRemoveImage = (index) => {
//         const newImages = [...uploadedImages];
//         newImages.splice(index, 1);
//         setUploadedImages(newImages);
//     };

//     async function carFormAction(event) {
//         event.preventDefault();
//         const formData = new FormData(event.target);
//         const carData = Object.fromEntries(formData.entries());
//         carData.user = user.id;
//         carData.description = `~${carData.mileage}, ${carData.engine}, ${carData.exterior}`;

//         console.log(carData);

//         try {
//             const res = await axios.post(
//                 "http://localhost:8080/listings/add-listing",
//                 carData,
//                 {
//                     headers: { "Content-Type": "application/json" },
//                 }
//             );
//             if (res.status === 200) {
//                 alert(res.data.message);
//                 navigate("/");
//             } else {
//                 console.log("Something went wrong");
//             }
//         } catch (error) {
//             console.error("Failed to add a listing!", error);
//         }
//     }

//     return (
//         <Container>
//             <h1 className="text-center">Add a new car</h1>
//             <Card className="bg-body-tertiary">
//                 <Card.Body>
//                     <Form onSubmit={carFormAction}>
//                         {/* 1st row */}
//                         <Row className="mb-3">
//                             <Col md={4}>
//                                 <Form.Group>
//                                     <Form.Label>Year</Form.Label>
//                                     <Form.Select name="year" defaultValue="">
//                                         <option value="" disabled>
//                                             Choose
//                                         </option>
//                                         {Array.from(
//                                             { length: 2025 - 1960 },
//                                             (_, index) => 2025 - index
//                                         ).map((year) => (
//                                             <option key={year} value={year}>
//                                                 {year}
//                                             </option>
//                                         ))}
//                                     </Form.Select>
//                                 </Form.Group>
//                             </Col>
//                             <Col md={4}>
//                                 <Form.Group>
//                                     <Form.Label>Make</Form.Label>
//                                     <Form.Control type="text" name="make" />
//                                 </Form.Group>
//                             </Col>
//                             <Col md={4}>
//                                 <Form.Group>
//                                     <Form.Label>Model</Form.Label>
//                                     <Form.Control type="text" name="model" />
//                                 </Form.Group>
//                             </Col>
//                         </Row>

//                         {/* Image upload */}
//                         <Form.Group controlId="imageUpload" className="mb-3">
//                             <Form.Label>Upload Images</Form.Label>
//                             <Form.Control
//                                 type="file"
//                                 multiple
//                                 onChange={handleImageUpload}
//                             />
//                         </Form.Group>

//                         {/* Display uploaded images */}
//                         <Row className="mb-3">
//                             {uploadedImages.map((image, index) => (
//                                 <Col key={index} md={2} className="mb-2">
//                                     <Image
//                                         src={image}
//                                         thumbnail
//                                         className="mr-2"
//                                     />
//                                     <Button
//                                         variant="danger"
//                                         size="sm"
//                                         onClick={() => handleRemoveImage(index)}
//                                     >
//                                         Remove
//                                     </Button>
//                                 </Col>
//                             ))}
//                         </Row>

//                         <Button type="submit" variant="primary">
//                             Save
//                         </Button>
//                     </Form>
//                 </Card.Body>
//             </Card>
//         </Container>
//     );
// }

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

export default function CarForm() {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]); // To store Cloudinary URLs
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

        // Also remove the corresponding URL from imageUrls
        const newUrls = [...imageUrls];
        newUrls.splice(index, 1);
        setImageUrls(newUrls);
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
            console.log(response);

            return response.data.secure_url; // Return the secure URL of the uploaded image
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            return null;
        }
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

    // Helper function to convert data URL to a File object
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
