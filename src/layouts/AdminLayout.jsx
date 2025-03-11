import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../context/user-context";

export default function AdminLayout({ children }) {
    const { user, logOut } = useContext(UserContext);
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
                                className="d-block pt-3 link-dark text-decoration-none"
                                title="Back to Home"
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
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
                                        to="/homes"
                                        className="nav-link  px-1 link-dark"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        title="Home"
                                    >
                                        {({ isActive }) => (
                                            <i
                                                className="bi-house fs-3"
                                                style={{
                                                    color: isActive
                                                        ? "red"
                                                        : "inherit",
                                                }}
                                            ></i>
                                        )}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/auctions"
                                        className="nav-link  px-1 link-dark"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        title="Dashboard"
                                    >
                                        {({ isActive }) => (
                                            <i
                                                className="bi-speedometer2 fs-3"
                                                style={{
                                                    color: isActive
                                                        ? "red"
                                                        : "inherit",
                                                }}
                                            ></i>
                                        )}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/orders"
                                        className="nav-link  px-1 link-dark"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        title="Orders"
                                    >
                                        {({ isActive }) => (
                                            <i
                                                className="bi-table fs-3"
                                                style={{
                                                    color: isActive
                                                        ? "red"
                                                        : "inherit",
                                                }}
                                            ></i>
                                        )}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/users"
                                        className="nav-link  px-1 link-dark"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="right"
                                        title="Users"
                                    >
                                        {({ isActive }) => (
                                            <i
                                                className="bi-people fs-3"
                                                style={{
                                                    color: isActive
                                                        ? "red"
                                                        : "inherit",
                                                }}
                                            ></i>
                                        )}
                                    </NavLink>
                                </li>
                            </ul>

                            <div className="dropdown mx-3">
                                <div
                                    className="dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img
                                        src={
                                            user.image_url ||
                                            "https://png.pngtree.com/png-clipart/20240705/original/pngtree-web-programmer-avatar-png-image_15495270.png"
                                        }
                                        alt={user.username}
                                        style={{
                                            height: "30px",
                                            width: "30px",
                                            borderRadius: "50%",
                                        }}
                                    />
                                </div>
                                <ul className="dropdown-menu dropdown-menu-lg-end">
                                    <>
                                        <li className="dropdown-item">
                                            <button
                                                className="nav-link btn btn-link text-start w-100"
                                                onClick={logOut}
                                            >
                                                <i className="bi bi-box-arrow-right"></i>{" "}
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                </ul>
                               </div>
                        </div>
                    </div>
                )}
                <div
                    className={
                        showSidebar
                            ? "col-sm  min-vh-100"
                            : "col-12  min-vh-100"
                    }
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
