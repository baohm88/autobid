import { NavLink, useLocation } from "react-router-dom";

export default function AdminLayout({ children }) {
    const location = useLocation();
    // Hide sidebar on the home page; adjust condition as needed.
    const showSidebar = location.pathname !== "/home";

    return (
        <div className="container-fluid">
            <div className="row">
                {showSidebar && (
                    <div className="col-sm-auto bg-light sticky-top">
                        <div className="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
                            <NavLink
                                to="/homes"
                                className="d-block p-3 link-dark text-decoration-none"
                                title="Back to Home"
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                            >
                                <img src="/logo-autobid.svg" alt="auto bid" height={30} />
                            </NavLink>
                            <ul className="nav nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                                <li className="nav-item">
                                    <NavLink
                                        to="/homes"
                                        className="nav-link py-3 px-1 link-dark"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        title="Home"
                                    >
                                        {({ isActive }) => (
                                            <i
                                                className="bi-house fs-1"
                                                style={{ color: isActive ? "red" : "inherit" }}
                                            ></i>
                                        )}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/auctions"
                                        className="nav-link py-3 px-1 link-dark"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        title="Dashboard"
                                    >
                                        {({ isActive }) => (
                                            <i
                                                className="bi-speedometer2 fs-1"
                                                style={{ color: isActive ? "red" : "inherit" }}
                                            ></i>
                                        )}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/orders"
                                        className="nav-link py-3 px-1 link-dark"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        title="Orders"
                                    >
                                        {({ isActive }) => (
                                            <i
                                                className="bi-table fs-1"
                                                style={{ color: isActive ? "red" : "inherit" }}
                                            ></i>
                                        )}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/users"
                                        className="nav-link py-3 px-1 link-dark"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        title="Users"
                                    >
                                        {({ isActive }) => (
                                            <i
                                                className="bi-people fs-1"
                                                style={{ color: isActive ? "red" : "inherit" }}
                                            ></i>
                                        )}
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
                                        <NavLink className="dropdown-item" to="#">
                                            Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="dropdown-item" to="#">
                                            Logout
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
                <div className={showSidebar ? "col-sm p-3 min-vh-100" : "col-12 p-3 min-vh-100"}>
                    {children}
                </div>
            </div>
        </div>
    );
}
