import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

export default function DashboardSidebar() {
    return (
        <Nav className="flex-column">
            <NavLink to="/account/dashboard" className="nav-link">
                <i className="bi-speedometer2 fs-5 me-2"></i> Dashboard
            </NavLink>
            <NavLink to="/account/in-progress" className="nav-link">
                <i className="bi-clock fs-5 me-2"></i> In Progress
            </NavLink>
            <NavLink to="/account/live-auctions" className="nav-link">
                <i className="bi-lightning fs-5 me-2"></i> Live Auctions
            </NavLink>
            <NavLink to="/account/comments" className="nav-link">
                <i className="bi-chat fs-5 me-2"></i> Comments
            </NavLink>
            <NavLink to="/account/past-listings" className="nav-link">
                <i className="bi-archive fs-5 me-2"></i> Past Listings
            </NavLink>
        </Nav>
    );
}
