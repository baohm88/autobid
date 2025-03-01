import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";
import {
    hasMinLength,
    isEmail,
    isEmpty,
    isEqualsToOtherValue,
} from "../utils/validation";

export default function Register() {
    const [emailError, setEmailError] = useState();
    const [usernameError, setUsernameError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [password2Error, setPassword2Error] = useState();
    const [serverError, setServerError] = useState();

    const navigate = useNavigate();
    document.title = "Registration";

    async function handleSubmit(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const userData = Object.fromEntries(fd.entries());

        if (isEmpty(userData.email) || !isEmail(userData.email)) {
            setEmailError("Please enter a valid email");
            return;
        }
        setEmailError(false);

        if (isEmpty(userData.username)) {
            setUsernameError("Username is required");
            return;
        }
        setUsernameError(false);

        if (isEmpty(userData.password)) {
            setPasswordError("Password is required");
            return;
        }
        setPasswordError(false);

        if (isEmpty(userData.password2)) {
            setPassword2Error("Confirm password is required");
            return;
        }
        setPassword2Error(false);

        if (!isEqualsToOtherValue(userData.password, userData.password2)) {
            setPassword2Error("Passwords must match");
            return;
        }
        setPassword2Error(false);

        delete userData.password2;

        try {
            const response = await axios.post(
                `http://localhost:8080/register`,
                userData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                alert(response.data.message);
                navigate("/login");
            } else {
                setServerError(response.data.message);
            }
        } catch (error) {
            setServerError("Registration request failed.");
            console.log(error);
        }
    }

    return (
        <Container className="mt-4">
            <h2 className="text-center">Register a new account</h2>
            {serverError && <Alert variant="danger">{serverError}</Alert>}
            <Form onSubmit={handleSubmit} className="col-md-6 col-lg-4 mx-auto">
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                    />
                    {emailError && <Alert variant="danger">{emailError}</Alert>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                    />
                    {usernameError && (
                        <Alert variant="danger">{usernameError}</Alert>
                    )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                    {passwordError && (
                        <Alert variant="danger">{passwordError}</Alert>
                    )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="password2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password2"
                        placeholder="Confirm Password"
                    />
                    {password2Error && (
                        <Alert variant="danger">{password2Error}</Alert>
                    )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="balance">
                    <Form.Label>Balance:</Form.Label>
                    <Form.Control type="number" name="balance" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="image_url">
                    <Form.Label>Avatar link:</Form.Label>
                    <Form.Control type="text" name="image_url" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="bio">
                    <Form.Label>Bio:</Form.Label>
                    <Form.Control as="textarea" name="bio" />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-2 mb-3"
                >
                    Register
                </Button>

                <p>
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </Form>
        </Container>
    );
}
