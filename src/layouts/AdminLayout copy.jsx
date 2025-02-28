import { NavLink } from "react-router-dom";

export default function AdminLayout({ children }) {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    {/* side bar */}
                    <div className="col-sm-auto bg-light sticky-top">
                        <div className="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
                            <NavLink
                                // to="/"
                                className="d-block p-3 link-dark text-decoration-none"
                                title=""
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                data-bs-original-title="Back to Home"
                            >
                                <img
                                    src="/logo-autobid.svg"
                                    alt="auto bid"
                                    height={30}
                                />
                            </NavLink>
                            <ul className="nav nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                                <li className="nav-item">
                                    <NavLink
                                        to={"/auctions"}
                                        className="nav-link py-3 px-1"
                                        title=""
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        data-bs-original-title="Home"
                                    >
                                        <i className="bi-house fs-1"></i>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={"/auctions"}
                                        className="nav-link py-3 px-1"
                                        title=""
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        data-bs-original-title="Dashboard"
                                    >
                                        <i className="bi-speedometer2 fs-1"></i>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={"/orders"}
                                        className="nav-link py-3 px-1"
                                        title=""
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        data-bs-original-title="Orders"
                                    >
                                        <i className="bi-table fs-1"></i>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to={"/users"}
                                        className="nav-link py-3 px-1"
                                        title=""
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        data-bs-original-title="Users"
                                    >
                                        <i className="bi-people fs-1"></i>
                                    </NavLink>
                                </li>
                            </ul>
                            <div className="dropdown">
                                <NavLink
                                    to="#"
                                    className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
                                    id="dropdownUser3"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="bi-person-circle h2"></i>
                                </NavLink>
                                <ul
                                    className="dropdown-menu text-small shadow"
                                    aria-labelledby="dropdownUser3"
                                >
                                    <li>
                                        <NavLink
                                            className="dropdown-item "
                                            to="#"
                                        >
                                            Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className="dropdown-item "
                                            to="#"
                                        >
                                            Logout
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* main content */}
                    <div className="col-sm p-3 min-vh-100">{children}</div>
                </div>
            </div>
        </>
    );
}
