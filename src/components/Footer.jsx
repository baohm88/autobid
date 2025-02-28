import { NavLink } from "react-router-dom";

export default function Footer() {
    return (
        <div>
            <div className="container">
                <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
                    <div className="col mb-3">
                        <NavLink
                            to="/"
                            className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"
                        >
                            <img
                                src="/logo-autobid.svg"
                                alt="auto bid"
                                height={50}
                            />
                        </NavLink>
                        <p className="text-body-secondary">© 2025</p>
                    </div>

                    <div className="col mb-3"></div>

                    <div className="col mb-3">
                        <h5>Section</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <NavLink
                                    to="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item mb-2">
                                <NavLink
                                    to="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Features
                                </NavLink>
                            </li>
                            <li className="nav-item mb-2">
                                <NavLink
                                    to="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Pricing
                                </NavLink>
                            </li>
                            <li className="nav-item mb-2">
                                <NavLink
                                    to="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    FAQs
                                </NavLink>
                            </li>
                            <li className="nav-item mb-2">
                                <NavLink
                                    to="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    About
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="col mb-3">
                        <h5>Section</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <NavLink
                                    to="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item mb-2">
                                <NavLink
                                    to="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Features
                                </NavLink>
                            </li>
                            <li className="nav-item mb-2">
                                <NavLink
                                    to="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Pricing
                                </NavLink>
                            </li>
                            <li className="nav-item mb-2">
                                <NavLink
                                    to="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    FAQs
                                </NavLink>
                            </li>
                            <li className="nav-item mb-2">
                                <NavLink
                                    to="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    About
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="col mb-3">
                        <h5>Section</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <NavLink
                                    to="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item mb-2">
                                <NavLink
                                    to="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Features
                                </NavLink>
                            </li>
                            <li className="nav-item mb-2">
                                <NavLink
                                    to="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    Pricing
                                </NavLink>
                            </li>
                            <li className="nav-item mb-2">
                                <NavLink
                                    to="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    FAQs
                                </NavLink>
                            </li>
                            <li className="nav-item mb-2">
                                <NavLink
                                    to="#"
                                    className="nav-link p-0 text-body-secondary"
                                >
                                    About
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
    );
}
