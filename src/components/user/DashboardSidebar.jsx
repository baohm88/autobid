// import { Col } from "react-bootstrap";
// import { NavLink } from "react-router-dom";

// export default function DashboardSidebar() {
//     return (
//         <Col
//             sm="auto"
//             className="p-3 d-flex flex-column flex-sm-row align-items-start align-items-sm-center"
//             style={{ position: "sticky", top: 0, zIndex: 1020 }}
//         >
//             <ul className="nav nav-pills mb-auto flex-row flex-sm-column w-100">
//                 <li className="nav-item">
//                     <NavLink
//                         to="/account/dashboard"
//                         className="nav-link py-2 px-3 d-flex align-items-center"
//                     >
//                         <i className="bi-speedometer2 fs-5 me-2"></i>
//                         <span>Dashboard</span>
//                     </NavLink>
//                 </li>
//                 <li className="nav-item">
//                     <NavLink
//                         to="/account/in-progress"
//                         className="nav-link py-2 px-3 d-flex align-items-center"
//                     >
//                         <i className="bi-clock fs-5 me-2"></i>
//                         <span>In Progress</span>
//                     </NavLink>
//                 </li>
//                 <li className="nav-item">
//                     <NavLink
//                         to="/account/live-auctions"
//                         className="nav-link py-2 px-3 d-flex align-items-center"
//                     >
//                         <i className="bi-lightning fs-5 me-2"></i>
//                         <span>Live Auctions</span>
//                     </NavLink>
//                 </li>
//                 <li className="nav-item">
//                     <NavLink
//                         to="/account/comments"
//                         className="nav-link py-2 px-3 d-flex align-items-center"
//                     >
//                         <i className="bi-chat fs-5 me-2"></i>
//                         <span>Comments</span>
//                     </NavLink>
//                 </li>
//                 <li className="nav-item">
//                     <NavLink
//                         to="/account/past-listings"
//                         className="nav-link py-2 px-3 d-flex align-items-center"
//                     >
//                         <i className="bi-archive fs-5 me-2"></i>
//                         <span>Past Listings</span>
//                     </NavLink>
//                 </li>
//             </ul>
//         </Col>
//     );
// }


import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

export default function DashboardSidebar() {
    return (
        <Nav className="flex-column">
            <NavLink to="/account/dashboard" className="nav-link">
                Dashboard
            </NavLink>
            <NavLink to="/account/in-progress" className="nav-link">
                In Progress Listings
            </NavLink>
            <NavLink to="/account/live-auctions" className="nav-link">
                Live Auctions
            </NavLink>
            <NavLink to="/account/comments" className="nav-link">
                Comments
            </NavLink>
            <NavLink to="/account/past-listings" className="nav-link">
                Past Listings
            </NavLink>
        </Nav>
    );
}