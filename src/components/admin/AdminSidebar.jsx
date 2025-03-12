import { NavLink } from "react-router-dom";
import {
    Dropdown,
    OverlayTrigger,
    Tooltip as BootstrapTooltip,
    Nav,
    Button,
} from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import useLogOut from "../../hooks/useLogOut";

export default function AdminSidebar({ collapsed, toggleSidebar }) {
    const { user } = useAuth();
    const logOut = useLogOut();

    return (
        <div
            className={`d-flex flex-column bg-light p-2 ${
                collapsed ? "sidebar-collapsed" : "sidebar-expanded"
            }`}
            style={{
                width: collapsed ? "60px" : "200px",
                transition: "width 0.3s",
                minHeight: "100vh",
            }}
        >
            <div className="d-flex align-items-center justify-content-between mb-4">
                <img
                    src="/logo-autobid.svg"
                    alt="Auto Bid"
                    height={30}
                    style={{ display: collapsed ? "none" : "inline-block" }}
                />
                <Button
                    variant="light"
                    onClick={toggleSidebar}
                    className="p-1"
                    size="sm"
                >
                    <i
                        className={`bi ${
                            collapsed ? "bi-chevron-right" : "bi-chevron-left"
                        }`}
                    ></i>
                </Button>
            </div>

            <Nav className="flex-column text-center text-sm-start">
                {[
                    { to: "/admin", icon: "bi-house", label: "Home" },
                    {
                        to: "/admin/auctions",
                        icon: "bi-speedometer2",
                        label: "Auctions",
                    },
                    { to: "/admin/orders", icon: "bi-table", label: "Orders" },
                    { to: "/admin/users", icon: "bi-people", label: "Users" },
                ].map(({ to, icon, label }) => (
                    <Nav.Item key={to} className="mb-3">
                        <OverlayTrigger
                            placement="right"
                            overlay={
                                collapsed ? (
                                    <BootstrapTooltip
                                        id={`tooltip-${label.toLowerCase()}`}
                                    >
                                        {label}
                                    </BootstrapTooltip>
                                ) : (
                                    <></>
                                )
                            }
                        >
                            <NavLink
                                to={to}
                                end
                                className={({ isActive }) =>
                                    `nav-link d-flex align-items-center gap-2 ${
                                        isActive ? "text-danger" : "text-dark"
                                    }`
                                }
                            >
                                <i className={`bi ${icon} fs-5`}></i>
                                {!collapsed && <span>{label}</span>}
                            </NavLink>
                        </OverlayTrigger>
                    </Nav.Item>
                ))}
            </Nav>

            <div className="mt-auto text-center">
                <Dropdown>
                    <Dropdown.Toggle
                        variant="light"
                        className="border-0 bg-transparent d-flex align-items-center justify-content-center p-0 w-100"
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
                        {!collapsed && (
                            <span className="ms-2">{user.username}</span>
                        )}
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="end">
                        <Dropdown.Item as="button" onClick={logOut}>
                            <i className="bi bi-box-arrow-right me-2"></i>
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}
