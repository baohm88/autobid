import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user-context";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    document.title = "Account Login";

    async function handleSubmit(e) {
        e.preventDefault();

        const userData = { username, password };
        try {
            const response = await axios.post(
                "http://localhost:8080/login",
                userData,
                {
                    headers: {
                        "Content-Type": "application/json", // Sending data as JSON
                    },
                }
            );

            const resData = await response.data;

            if (resData.success === true) {
                const user = resData.data[0];

                setError(false);
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
                setError(resData.message);
            }
        } catch (error) {
            console.error("Login request failed:", error);
        }
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center">Login</h2>

            <form className="col-md-6 col-lg-4 mx-auto" onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                        className="form-control"
                        placeholder="Username"
                        type="text"
                        id="username"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        autoFocus
                    />
                    <label htmlFor="username">Username:</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        className="form-control"
                        placeholder="Password"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                </div>

                <button className="btn btn-primary w-100 py-2 mb-3">
                    Sign in
                </button>

                <p>
                    Need an account? <Link to="/register">Register here</Link>
                </p>
            </form>
        </div>
    );
}
