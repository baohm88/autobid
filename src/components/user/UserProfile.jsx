// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../context/user-context";
// import {
//     Modal,
//     Button,
//     Form,
//     Card,
//     Row,
//     Col,
//     Image,
//     Container,
// } from "react-bootstrap";
// import axios from "axios";

// export default function UserProfile() {
//     const { user } = useContext(UserContext);
//     const navigate = useNavigate();

//     console.log(user);

//     async function useProfileFormAction(fd) {
//         const userData = Object.fromEntries(fd.entries());

//         userData.id = user.id;

//         console.log(userData);

//         try {
//             const res = await axios.put(
//                 `http://localhost:8080/update-account`,
//                 userData,
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );

//             console.log(res);

//             if (res.status === 200) {
//                 alert(res.data.message);
//                 navigate("/user-profile");
//                 document.querySelector('[data-bs-dismiss="modal"]').click();
//             } else {
//                 console.log("Something went wrong");
//             }
//         } catch (error) {
//             console.error("Failed to add a listing!", error);
//         }
//     }

//     return (
//         <div className="container mt-3">
//             <div className="card mb-3">
//                 <div className="row g-0">
//                     <div className="col-md-3 col-lg-2 p-3 d-flex justify-content-center align-items-center">
//                         <div className="d-flex flex-column align-items-center gap-3">
//                             <img
//                                 src={user.image_url}
//                                 className="img-fluid rounded-circle"
//                                 alt={user.username}
//                                 style={{
//                                     width: "130px",
//                                     height: "130px",
//                                     objectFit: "cover",
//                                 }}
//                             />
//                             <button
//                                 type="button"
//                                 className="btn btn-primary btn-sm"
//                                 data-bs-toggle="modal"
//                                 data-bs-target="#exampleModal"
//                             >
//                                 Edit Profile
//                             </button>
//                         </div>
//                     </div>

//                     <div className="col-md-9 col-lg-10">
//                         <div className="card-body">
//                             <h5 className="card-title">{user.username}</h5>
//                             <p className="card-text">
//                                 This is a wider card with supporting text below
//                                 as a natural lead-in to additional content. This
//                                 content is a little bit longer.
//                             </p>
//                             <p className="card-text">
//                                 <small className="text-body-secondary">
//                                     Joined January 2025
//                                 </small>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Modal */}
//             <div
//                 className="modal fade"
//                 id="exampleModal"
//                 tabIndex="-1"
//                 aria-labelledby="exampleModalLabel"
//                 aria-hidden="true"
//             >
//                 <div className="modal-dialog modal-dialog-centered">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h1
//                                 className="modal-title fs-5"
//                                 id="exampleModalLabel"
//                             >
//                                 Edit Profile
//                             </h1>
//                             <button
//                                 type="button"
//                                 className="btn-close"
//                                 data-bs-dismiss="modal"
//                                 aria-label="Close"
//                             ></button>
//                         </div>
//                         <div className="modal-body">
//                             <form action={useProfileFormAction}>
//                                 <div className="d-flex flex-column align-items-center gap-3">
//                                     <img
//                                         src={user.image_url}
//                                         className="img-fluid rounded-circle"
//                                         alt={user.username}
//                                         style={{
//                                             width: "130px",
//                                             height: "130px",
//                                             objectFit: "cover",
//                                         }}
//                                     />
//                                     <button
//                                         type="button"
//                                         className="btn btn-secondary btn-sm"
//                                     >
//                                         Choose a different picture
//                                     </button>
//                                 </div>
//                                 <div className="mb-3">
//                                     <label
//                                         htmlFor="fullname"
//                                         className="col-form-label"
//                                     >
//                                         Full Name:
//                                     </label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id="fullname"
//                                         name="fullname"
//                                         defaultValue={user.username}
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label
//                                         htmlFor="username"
//                                         className="col-form-label"
//                                     >
//                                         User Name:
//                                     </label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id="username"
//                                         name="username"
//                                         defaultValue={user.username}
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label
//                                         htmlFor="password"
//                                         className="col-form-label"
//                                     >
//                                         New Password:
//                                     </label>
//                                     <input
//                                         type="password"
//                                         className="form-control"
//                                         id="password"
//                                         name="password"
//                                         defaultValue={user.password}
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label
//                                         htmlFor="email"
//                                         className="col-form-label"
//                                     >
//                                         New Email:
//                                     </label>
//                                     <input
//                                         type="email"
//                                         className="form-control"
//                                         id="email"
//                                         name="email"
//                                         defaultValue={user.email}
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label
//                                         htmlFor="balance"
//                                         className="col-form-label"
//                                     >
//                                         New Balance:
//                                     </label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id="balance"
//                                         name="balance"
//                                         defaultValue={user.balance}
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label
//                                         htmlFor="image_url"
//                                         className="col-form-label"
//                                     >
//                                         Avatar link:
//                                     </label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id="image_url"
//                                         name="image_url"
//                                         defaultValue={user.image_url}
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label
//                                         htmlFor="bio"
//                                         className="col-form-label"
//                                     >
//                                         Bio:
//                                     </label>
//                                     <textarea
//                                         className="form-control"
//                                         id="bio"
//                                         name="bio"
//                                         defaultValue={user.bio}
//                                     ></textarea>
//                                 </div>

//                                 <div className="modal-footer">
//                                     <button
//                                         className="btn btn-secondary"
//                                         data-bs-dismiss="modal"
//                                     >
//                                         Close
//                                     </button>
//                                     <button className="btn btn-primary">
//                                         Save
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     );
// }

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import axios from "axios";
import {
    Modal,
    Button,
    Form,
    Card,
    Row,
    Col,
    Container,
} from "react-bootstrap";

export default function UserProfile() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    async function useProfileFormAction(fd) {
        const userData = Object.fromEntries(fd.entries());
        userData.id = user.id;

        console.log(userData);

        try {
            const res = await axios.put(
                `http://localhost:8080/update-account`,
                userData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(res);

            if (res.status === 200) {
                alert(res.data.message);
                handleClose();
                navigate("/user-profile");
                setUser(userData);
                // Save the user object to localStorage as a JSON string
                localStorage.setItem("user", JSON.stringify(userData));
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            console.error("Failed to add a listing!", error);
        }
    }

    return (
        <Container className="mt-3">
            <Card className="mb-3">
                <Row className="g-0">
                    <Col
                        md={3}
                        lg={2}
                        className="p-3 d-flex justify-content-center align-items-center"
                    >
                        <div className="d-flex flex-column align-items-center gap-3">
                            <img
                                src={user.image_url}
                                className="img-fluid rounded-circle"
                                alt={user.username}
                                style={{
                                    width: "130px",
                                    height: "130px",
                                    objectFit: "cover",
                                }}
                            />
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={handleShow}
                            >
                                Edit Profile
                            </Button>
                        </div>
                    </Col>
                    <Col md={9} lg={10}>
                        <Card.Body>
                            <Card.Title>{user.username}</Card.Title>
                            <Card.Text>
                                This is a wider card with supporting text below
                                as a natural lead-in to additional content.
                            </Card.Text>
                            <Card.Text>
                                <small className="text-muted">
                                    Joined January 2025
                                </small>
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form action={useProfileFormAction}>
                        <div className="d-flex flex-column align-items-center gap-3">
                            <img
                                src={user.image_url}
                                className="img-fluid rounded-circle"
                                alt={user.username}
                                style={{
                                    width: "130px",
                                    height: "130px",
                                    objectFit: "cover",
                                }}
                            />
                            <Button variant="secondary" size="sm">
                                Choose a different picture
                            </Button>
                        </div>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>New Email:</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                defaultValue={user.email}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                defaultValue={user.username}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>New Password:</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                defaultValue={user.password}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="balance">
                            <Form.Label>New Balance:</Form.Label>
                            <Form.Control
                                type="number"
                                name="balance"
                                defaultValue={user.balance}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="image_url">
                            <Form.Label>Avatar link:</Form.Label>
                            <Form.Control
                                type="text"
                                name="image_url"
                                defaultValue={user.image_url}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="bio">
                            <Form.Label>Bio:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="bio"
                                defaultValue={user.bio}
                            />
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}
