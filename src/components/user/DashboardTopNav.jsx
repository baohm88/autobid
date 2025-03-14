import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export default function DashboardTopNav() {
    const links = [
        { to: "/account/dashboard", icon: "bi-speedometer2" },
        { to: "/account/in-progress", icon: "bi-clock" },
        { to: "/account/live-auctions", icon: "bi-lightning" },
        { to: "/account/comments", icon: "bi-chat" },
        { to: "/account/past-listings", icon: "bi-archive" },
    ];

    return (
        <Navbar className="justify-content-around py-2 shadow-sm">
            <Nav className="w-100 d-flex justify-content-around">
                {links.map(({ to, icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `nav-link d-flex flex-column align-items-center ${
                                isActive ? "text-danger" : "text-secondary"
                            }`
                        }
                    >
                        <i className={`bi ${icon} fs-5`}></i>
                    </NavLink>
                ))}
            </Nav>
        </Navbar>
    );
}
