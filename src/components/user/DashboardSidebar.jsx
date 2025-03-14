import {
    OverlayTrigger,
    Tooltip as BootstrapTooltip,
    Nav,
    Button,
} from "react-bootstrap";

import { NavLink } from "react-router-dom";


const links = [
    {
        to: "/account/dashboard",
        icon: "bi-speedometer2",
        text: "Dashboard",
    },
    {
        to: "/account/listings",
        icon: "bi-ev-front",
        text: "All Listings",
    },
    { to: "/account/in-progress", icon: "bi-clock", text: "In Progress" },
    {
        to: "/account/live-auctions",
        icon: "bi-lightning",
        text: "Live Auctions",
    },
    { to: "/account/comments", icon: "bi-chat", text: "Comments" },
    {
        to: "/account/past-listings",
        icon: "bi-archive",
        text: "Past Listings",
    },
];



export default function DashboardSidebar({ collapsed, toggleSidebar }) {
    return (
        <div
            className={`d-flex flex-column  p-2 ${
                collapsed ? "sidebar-collapsed" : "sidebar-expanded"
            }`}
            style={{
                width: collapsed ? "60px" : "200px",
                transition: "width 0.3s",
                minHeight: "100vh",
            }}
        >
            <div className="d-flex align-items-center justify-content-end mb-4">
                <Button
                    variant="light"
                    onClick={toggleSidebar}
                    className="p-1"
                    size="sm"
                >
                    <i
                        className={`bi ${
                            collapsed ? "bi-arrow-right" : "bi-arrow-left"
                        }`}
                        style={{ fontSize: "1rem" }}
                    ></i>
                </Button>
            </div>

            <Nav className="flex-column text-center text-sm-start">
                {links.map(({ to, icon, text }) => (
                    <Nav.Item key={to} className="mb-3">
                        <OverlayTrigger
                            placement="right"
                            overlay={
                                collapsed ? (
                                    <BootstrapTooltip
                                        id={`tooltip-${text.toLowerCase()}`}
                                    >
                                        {text}
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
                                {!collapsed && <span>{text}</span>}
                            </NavLink>
                        </OverlayTrigger>
                    </Nav.Item>
                ))}
            </Nav>
        </div>
    );
}
