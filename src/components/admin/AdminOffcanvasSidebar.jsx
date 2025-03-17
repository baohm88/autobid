import { Offcanvas, Nav, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ADMIN_LINKS } from "./adminLinks";
import { useAuth } from "../../context/AuthContext";
import useLogOut from "../../hooks/useLogOut";

export default function AdminOffcanvasSidebar({ show, onHide }) {
    const { user } = useAuth();
    const logOut = useLogOut();

    return (
        <Offcanvas
            show={show}
            onHide={onHide}
            backdropClassName="fade"
            placement="start"
            scroll={false}
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    <img src="/logo-autobid.svg" alt="AutoBid" height={40} />
                </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="d-flex flex-column h-100">
                {/* Main links */}
                <div className="flex-grow-1">
                    <Nav className="flex-column">
                        {ADMIN_LINKS.map(({ to, icon, label, end }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={end}
                                onClick={onHide}
                                className={({ isActive }) =>
                                    `nav-link d-flex align-items-center gap-2 mb-2 ${
                                        isActive
                                            ? "text-danger fw-bold"
                                            : "text-muted"
                                    }`
                                }
                            >
                                <i className={`bi ${icon} fs-5`} />
                                {label}
                            </NavLink>
                        ))}
                    </Nav>
                </div>

                {/* Footer */}
                <div className="mt-auto">
                    <hr />
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="light"
                            className="border-0 bg-transparent d-flex align-items-center"
                            id="dropdown-user"
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
                            <span className="ms-2">{user.username}</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu align="end">
                            <Dropdown.Item as="button" onClick={logOut}>
                                <i className="bi bi-box-arrow-right me-2"></i>
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
