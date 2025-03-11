// // import { NavLink, useNavigate } from "react-router-dom";
// // import {
// //     Dropdown,
// //     OverlayTrigger,
// //     Tooltip as BootstrapTooltip,
// //     Nav,
// // } from "react-bootstrap";
// // import { useContext, useEffect } from "react";
// // import { UserContext } from "../../context/user-context";
// // import { Tooltip } from "bootstrap";

// // export default function AdminSidebar() {
// //     const { user, logOut } = useContext(UserContext);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const tooltipTriggerList = document.querySelectorAll(
// //             '[data-bs-toggle="tooltip"]'
// //         );
// //         tooltipTriggerList.forEach((tooltipTriggerEl) => {
// //             new Tooltip(tooltipTriggerEl);
// //         });

// //         setTimeout(() => {
// //             const dropdownElementList = document.querySelectorAll(
// //                 '[data-bs-toggle="dropdown"]'
// //             );
// //             dropdownElementList.forEach((dropdownEl) => {
// //                 console.log("Dropdown init:", dropdownEl);
// //                 new Dropdown(dropdownEl);
// //             });
// //         }, 100); // slight delay helps when elements aren't yet mounted
// //     }, []);

// //     function handleLogout() {
// //         logOut(); // Clear user + localStorage
// //         navigate("/"); // Redirect users to home
// //     }

// //     return (
// //         <div className="col-sm-auto bg-light sticky-top">
// //             <div className="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
// //                 <NavLink
// //                     to="/"
// //                     className="d-block pt-3 link-dark text-decoration-none"
// //                     title="Back to Home"
// //                     data-bs-toggle="tooltip"
// //                     data-bs-placement="right"
// //                 >
// //                     <img src="/logo-autobid.svg" alt="auto bid" height={30} />
// //                 </NavLink>
// //                 {/* <ul className="nav nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
// //                     <li>
// //                         <OverlayTrigger
// //                             placement="right"
// //                             overlay={
// //                                 <BootstrapTooltip id="tooltip-home">
// //                                     Home
// //                                 </BootstrapTooltip>
// //                             }
// //                         >
// //                             <NavLink
// //                                 to="/admin"
// //                                 end
// //                                 className="nav-link px-1 link-dark"
// //                             >
// //                                 {({ isActive }) => (
// //                                     <i
// //                                         className="bi-house fs-3"
// //                                         style={{
// //                                             color: isActive ? "red" : "inherit",
// //                                         }}
// //                                     ></i>
// //                                 )}
// //                             </NavLink>
// //                         </OverlayTrigger>
// //                     </li>
// //                     <li>
// //                         <OverlayTrigger
// //                             placement="right"
// //                             overlay={
// //                                 <BootstrapTooltip id="tooltip-dashboard">
// //                                     Dashboard
// //                                 </BootstrapTooltip>
// //                             }
// //                         >
// //                             <NavLink
// //                                 to="/admin/auctions"
// //                                 className="nav-link px-1 link-dark"
// //                             >
// //                                 {({ isActive }) => (
// //                                     <i
// //                                         className="bi-speedometer2 fs-3"
// //                                         style={{
// //                                             color: isActive ? "red" : "inherit",
// //                                         }}
// //                                     ></i>
// //                                 )}
// //                             </NavLink>
// //                         </OverlayTrigger>
// //                     </li>

// //                     <li>
// //                         <OverlayTrigger
// //                             placement="right"
// //                             overlay={
// //                                 <BootstrapTooltip id="tooltip-orders">
// //                                     Orders
// //                                 </BootstrapTooltip>
// //                             }
// //                         >
// //                             <NavLink
// //                                 to="/admin/orders"
// //                                 className="nav-link px-1 link-dark"
// //                             >
// //                                 {({ isActive }) => (
// //                                     <i
// //                                         className="bi-table fs-3"
// //                                         style={{
// //                                             color: isActive ? "red" : "inherit",
// //                                         }}
// //                                     ></i>
// //                                 )}
// //                             </NavLink>
// //                         </OverlayTrigger>
// //                     </li>

// //                     <li>
// //                         <OverlayTrigger
// //                             placement="right"
// //                             overlay={
// //                                 <BootstrapTooltip id="tooltip-users">
// //                                     Users
// //                                 </BootstrapTooltip>
// //                             }
// //                         >
// //                             <NavLink
// //                                 to="/admin/users"
// //                                 className="nav-link px-1 link-dark"
// //                             >
// //                                 {({ isActive }) => (
// //                                     <i
// //                                         className="bi-people fs-3"
// //                                         style={{
// //                                             color: isActive ? "red" : "inherit",
// //                                         }}
// //                                     ></i>
// //                                 )}
// //                             </NavLink>
// //                         </OverlayTrigger>
// //                     </li>
// //                 </ul> */}

// //                 <Nav
// //                     className="flex-sm-column flex-row justify-content-center align-items-center text-center w-100 mt-3"
// //                     variant="pills"
// //                 >
// //                     <Nav.Item>
// //                         <OverlayTrigger
// //                             placement="right"
// //                             overlay={
// //                                 <BootstrapTooltip id="tooltip-home">
// //                                     Home
// //                                 </BootstrapTooltip>
// //                             }
// //                         >
// //                             <NavLink
// //                                 to="/admin"
// //                                 end
// //                                 className="nav-link px-1 d-flex flex-column align-items-center"
// //                             >
// //                                 {({ isActive }) => (
// //                                     <>
// //                                         <i
// //                                             className="bi-house fs-3"
// //                                             style={{
// //                                                 color: isActive
// //                                                     ? "red"
// //                                                     : "inherit",
// //                                             }}
// //                                         ></i>
// //                                         <span className="small d-sm-none mt-1">
// //                                             Home
// //                                         </span>
// //                                     </>
// //                                 )}
// //                             </NavLink>
// //                         </OverlayTrigger>
// //                     </Nav.Item>

// //                     <Nav.Item>
// //                         <OverlayTrigger
// //                             placement="right"
// //                             overlay={
// //                                 <BootstrapTooltip id="tooltip-dashboard">
// //                                     Dashboard
// //                                 </BootstrapTooltip>
// //                             }
// //                         >
// //                             <NavLink
// //                                 to="/admin/auctions"
// //                                 className="nav-link px-1 d-flex flex-column align-items-center"
// //                             >
// //                                 {({ isActive }) => (
// //                                     <>
// //                                         <i
// //                                             className="bi-speedometer2 fs-3"
// //                                             style={{
// //                                                 color: isActive
// //                                                     ? "red"
// //                                                     : "inherit",
// //                                             }}
// //                                         ></i>
// //                                         <span className="small d-sm-none mt-1">
// //                                             Auctions
// //                                         </span>
// //                                     </>
// //                                 )}
// //                             </NavLink>
// //                         </OverlayTrigger>
// //                     </Nav.Item>

// //                     <Nav.Item>
// //                         <OverlayTrigger
// //                             placement="right"
// //                             overlay={
// //                                 <BootstrapTooltip id="tooltip-orders">
// //                                     Orders
// //                                 </BootstrapTooltip>
// //                             }
// //                         >
// //                             <NavLink
// //                                 to="/admin/orders"
// //                                 className="nav-link px-1 d-flex flex-column align-items-center"
// //                             >
// //                                 {({ isActive }) => (
// //                                     <>
// //                                         <i
// //                                             className="bi-table fs-3"
// //                                             style={{
// //                                                 color: isActive
// //                                                     ? "red"
// //                                                     : "inherit",
// //                                             }}
// //                                         ></i>
// //                                         <span className="small d-sm-none mt-1">
// //                                             Orders
// //                                         </span>
// //                                     </>
// //                                 )}
// //                             </NavLink>
// //                         </OverlayTrigger>
// //                     </Nav.Item>

// //                     <Nav.Item>
// //                         <OverlayTrigger
// //                             placement="right"
// //                             overlay={
// //                                 <BootstrapTooltip id="tooltip-users">
// //                                     Users
// //                                 </BootstrapTooltip>
// //                             }
// //                         >
// //                             <NavLink
// //                                 to="/admin/users"
// //                                 className="nav-link px-1 d-flex flex-column align-items-center"
// //                             >
// //                                 {({ isActive }) => (
// //                                     <>
// //                                         <i
// //                                             className="bi-people fs-3"
// //                                             style={{
// //                                                 color: isActive
// //                                                     ? "red"
// //                                                     : "inherit",
// //                                             }}
// //                                         ></i>
// //                                         <span className="small d-sm-none mt-1">
// //                                             Users
// //                                         </span>
// //                                     </>
// //                                 )}
// //                             </NavLink>
// //                         </OverlayTrigger>
// //                     </Nav.Item>
// //                 </Nav>

// //                 <Dropdown className="mt-3">
// //                     <Dropdown.Toggle
// //                         variant="light"
// //                         className="border-0 bg-transparent d-flex align-items-center p-0"
// //                         id="dropdown-user"
// //                     >
// //                         <img
// //                             src={
// //                                 user.image_url ||
// //                                 "https://png.pngtree.com/png-clipart/20240705/original/pngtree-web-programmer-avatar-png-image_15495270.png"
// //                             }
// //                             alt={user.username}
// //                             style={{
// //                                 height: "30px",
// //                                 width: "30px",
// //                                 borderRadius: "50%",
// //                             }}
// //                         />
// //                     </Dropdown.Toggle>

// //                     <Dropdown.Menu align="end">
// //                         <Dropdown.Item as="button" onClick={handleLogout}>
// //                             <i className="bi bi-box-arrow-right me-2"></i>
// //                             Logout
// //                         </Dropdown.Item>
// //                     </Dropdown.Menu>
// //                 </Dropdown>
// //             </div>
// //         </div>
// //     );
// // }

// import { NavLink, useNavigate } from "react-router-dom";
// import { Dropdown, Nav } from "react-bootstrap";
// import { useContext } from "react";
// import { UserContext } from "../../context/user-context";

// export default function AdminSidebar() {
//     const { user, logOut } = useContext(UserContext);
//     const navigate = useNavigate();

//     function handleLogout() {
//         logOut();
//         navigate("/");
//     }

//     return (
//         <div className="col-12 col-sm-auto bg-light border-bottom border-sm-end">
//             <div className="d-flex flex-sm-column justify-content-between align-items-center align-items-sm-start px-3 py-2">
//                 {/* Logo */}
//                 <NavLink to="/" className="mb-sm-4 text-decoration-none">
//                     <img
//                         src="/logo-autobid.svg"
//                         alt="auto bid"
//                         height={30}
//                         className="d-inline-block"
//                     />
//                 </NavLink>

//                 {/* Navigation Links */}
//                 <Nav
//                     variant="pills"
//                     className="flex-row flex-sm-column justify-content-center align-items-center align-items-sm-start w-100"
//                 >
//                     <Nav.Item>
//                         <NavLink
//                             to="/admin"
//                             end
//                             className="nav-link d-flex flex-column align-items-center align-items-sm-start"
//                         >
//                             <i className="bi-house fs-5" />
//                             <span className="d-sm-none small">Home</span>
//                             <span className="d-none d-sm-inline">Home</span>
//                         </NavLink>
//                     </Nav.Item>

//                     <Nav.Item>
//                         <NavLink
//                             to="/admin/auctions"
//                             className="nav-link d-flex flex-column align-items-center align-items-sm-start"
//                         >
//                             <i className="bi-speedometer2 fs-5" />
//                             <span className="d-sm-none small">Auctions</span>
//                             <span className="d-none d-sm-inline">Auctions</span>
//                         </NavLink>
//                     </Nav.Item>

//                     <Nav.Item>
//                         <NavLink
//                             to="/admin/orders"
//                             className="nav-link d-flex flex-column align-items-center align-items-sm-start"
//                         >
//                             <i className="bi-table fs-5" />
//                             <span className="d-sm-none small">Orders</span>
//                             <span className="d-none d-sm-inline">Orders</span>
//                         </NavLink>
//                     </Nav.Item>

//                     <Nav.Item>
//                         <NavLink
//                             to="/admin/users"
//                             className="nav-link d-flex flex-column align-items-center align-items-sm-start"
//                         >
//                             <i className="bi-people fs-5" />
//                             <span className="d-sm-none small">Users</span>
//                             <span className="d-none d-sm-inline">Users</span>
//                         </NavLink>
//                     </Nav.Item>
//                 </Nav>

//                 {/* User Dropdown */}
//                 <Dropdown className="mt-sm-auto ms-sm-0 ms-auto">
//                     <Dropdown.Toggle
//                         variant="light"
//                         className="border-0 bg-transparent p-0 d-flex align-items-center"
//                         id="dropdown-user"
//                     >
//                         <img
//                             src={
//                                 user.image_url ||
//                                 "https://png.pngtree.com/png-clipart/20240705/original/pngtree-web-programmer-avatar-png-image_15495270.png"
//                             }
//                             alt={user.username}
//                             style={{
//                                 height: "30px",
//                                 width: "30px",
//                                 borderRadius: "50%",
//                             }}
//                         />
//                     </Dropdown.Toggle>
//                     <Dropdown.Menu align="end">
//                         <Dropdown.Item as="button" onClick={handleLogout}>
//                             <i className="bi bi-box-arrow-right me-2"></i>
//                             Logout
//                         </Dropdown.Item>
//                     </Dropdown.Menu>
//                 </Dropdown>
//             </div>
//         </div>
//     );
// }

import { NavLink, useNavigate } from "react-router-dom";
import {
    Dropdown,
    OverlayTrigger,
    Tooltip as BootstrapTooltip,
    Nav,
    Button,
} from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../../context/user-context";

export default function AdminSidebar({ collapsed, toggleSidebar }) {
    const { user, logOut } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut();
        navigate("/");
    };

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
                        <Dropdown.Item as="button" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right me-2"></i>
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}
