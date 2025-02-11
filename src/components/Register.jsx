export default function Register() {
    return (
        <div className="container mt-4">
            <h2 className="text-center">Register a new account</h2>
            <form>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
            </form>
        </div>
    );
}
