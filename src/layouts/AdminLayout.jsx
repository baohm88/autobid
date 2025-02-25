import { NavLink } from "react-router-dom";

export default function AdminLayout({ children }) {
    return (
        <>
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
                                            to={"/auctions"}
                                        >
                                            Auctions
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "nav-link active"
                                                    : "nav-link"
                                            }
                                            to={"/orders"}
                                        >
                                            Orders
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
                <main>{children}</main>
            </div>
        </>
    );
}
