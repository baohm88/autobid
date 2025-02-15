import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";

export default function ClientLayout({ children }) {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-xxl">
                        <NavLink className="navbar-brand" to={"/"}>
                            <img
                                src="/logo-autobid.svg"
                                alt="auto bid"
                                height={50}
                            />
                        </NavLink>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarTogglerDemo02"
                            aria-controls="navbarTogglerDemo02"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarTogglerDemo02"
                        >
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive
                                                ? "nav-link active"
                                                : "nav-link"
                                        }
                                        to={"/user-products"}
                                    >
                                        My Products
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive
                                                ? "nav-link active"
                                                : "nav-link"
                                        }
                                        to={"/user-bids"}
                                    >
                                        My Bids
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive
                                                ? "nav-link active"
                                                : "nav-link"
                                        }
                                        to={"/user-orders"}
                                    >
                                        My Orders
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive
                                                ? "nav-link active"
                                                : "nav-link"
                                        }
                                        to={"/user-wallet"}
                                    >
                                        My Wallet
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive
                                                ? "nav-link active"
                                                : "nav-link"
                                        }
                                        to={"/watch-list"}
                                    >
                                        <i className="bi bi-heart-fill text-danger"></i>{" "}
                                        Favorites
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">
                                        Login
                                    </NavLink>
                                </li>
                            </ul>
                            <form className="d-flex" role="search">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search for cars (ex. BMW, Audi, Ford)"
                                    aria-label="Search"
                                />
                                <button
                                    className="btn btn-outline-success"
                                    type="submit"
                                >
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                </nav>
            </header>
            <main>{children}</main>
            <Footer />
        </div>
    );
}
