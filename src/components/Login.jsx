import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);

    const { setUser } = useAuth();
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

        if (!valid) return;

        setLoading(true);

        try {
            const res = await axios.post("http://localhost:8080/login", {
                username,
                password,
            });

            const resData = res.data;

            if (resData.success) {
                const user = resData.data[0];
                setUser(user); // ✅ This will update context and localStorage via AuthContext
                toast.success("Welcome, " + user.username);

                // ✅ Slight delay to ensure context updates before navigation
                setTimeout(() => {
                    navigate(user.admin ? "/admin" : "/");
                }, 100);
            } else {
                toast.error(resData.message);
            }
        } catch (error) {
            console.error("Login request failed:", error);
            toast.error("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center">Login</h2>

            <form className="col-md-6 col-lg-4 mx-auto" onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                        className={`form-control ${
                            usernameError ? "is-invalid" : ""
                        }`}
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
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Password:</label>
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
