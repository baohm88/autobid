import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="container mt-4">
            <h2 className="text-center">Login</h2>

            <form className="col-md-4 mx-auto">
                <div className="form-floating">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="form-check text-start my-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value="remember-me"
                        id="flexCheckDefault"
                    />
                    <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                    >
                        Remember me
                    </label>
                </div>
                <button
                    className="btn btn-primary w-100 py-2 mb-3"
                    type="submit"
                >
                    Sign in
                </button>

                <p>
                    Need an account? <Link to="/register">Register here</Link>
                </p>
            </form>
        </div>
    );
}
