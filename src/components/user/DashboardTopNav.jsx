import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { DASHBOARD_LINKS } from "./dummy_data";

export default function DashboardTopNav() {
    return (
        <Navbar className="justify-content-around py-2 shadow-sm">
            <Nav className="w-100 d-flex justify-content-around">
                {DASHBOARD_LINKS.map(({ to, icon }) => (
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
