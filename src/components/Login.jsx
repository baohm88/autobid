import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user-context";
import { Alert } from "react-bootstrap";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    document.title = "Account Login";

    async function handleSubmit(e) {
        e.preventDefault();

        // Reset validation errors
        setUsernameError("");
        setPasswordError("");

        // Validate inputs
        let valid = true;
        if (username.trim() === "") {
            setUsernameError("Username is required");
            valid = false;
        }
        if (password.trim() === "") {
            setPasswordError("Password is required");
            valid = false;
        }

        if (!valid) {
            return;
        }

        setLoading(true); // Set loading to true when form is submitted

        const userData = { username, password };
        try {
            const res = await axios.post(
                "http://localhost:8080/login",
                userData,
                {
                    headers: {
                        "Content-Type": "application/json", // Sending data as JSON
                    },
                }
            );

            console.log(res);

            const resData = await res.data;

            if (resData.success === true) {
                const user = resData.data[0];

                setError(null); // Clear any previous error
                alert("Welcome, " + resData.data[0].username);

                setUser(user);
                // Save the user object to localStorage as a JSON string
                localStorage.setItem("user", JSON.stringify(user));

                // Navigate to different routes based on user role
                if (user.admin === true) {
                    navigate("/auctions");
                } else {
                    navigate("/");
                }
            } else {
                setError(resData.message); // Set error message
            }
        } catch (error) {
            console.error("Login request failed:", error);
            setError("Login failed. Please try again."); // Set generic error message
        } finally {
            setLoading(false); // Set loading to false after request is complete
        }
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center">Login</h2>

            {/* Dismissible Alert for Error Messages */}
            {error && (
                <Alert
                    variant="danger"
                    onClose={() => setError(null)}
                    dismissible
                    className="col-md-6 col-lg-4 mx-auto"
                >
                    {error}
                </Alert>
            )}

            <form className="col-md-6 col-lg-4 mx-auto" onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                        className={`form-control ${
                            usernameError ? "is-invalid" : ""
                        }`}
                        placeholder="Username"
                        type="text"
                        id="username"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        autoFocus
                    />
                    <label htmlFor="username">Username:</label>
                    {usernameError && (
                        <div className="invalid-feedback">{usernameError}</div>
                    )}
                </div>
                <div className="form-floating mb-3">
                    <input
                        className={`form-control ${
                            passwordError ? "is-invalid" : ""
                        }`}
                        placeholder="Password"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    {passwordError && (
                        <div className="invalid-feedback">{passwordError}</div>
                    )}
                </div>

                <button
                    className="btn btn-danger w-100 py-2 mb-3"
                    disabled={loading} 
                >
                    {loading ? "Signing in..." : "Sign in"}
                </button>

                <p>
                    Need an account? <Link to="/register">Register here</Link>
                </p>
            </form>
        </div>
    );
}
