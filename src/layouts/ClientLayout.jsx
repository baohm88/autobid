// import { NavLink } from "react-router-dom";
// import Footer from "../components/Footer";
// import { useContext } from "react";
// import { UserContext } from "../context/user-context";

// export default function ClientLayout({ children }) {
//     const { user, logOut } = useContext(UserContext);
//     const isLoggedIn = !!user;

//     return (
//         <div>
//             <header>
//                 <nav className="navbar navbar-expand-lg bg-body-tertiary">
//                     <div className="container-xxl">
//                         <NavLink className="navbar-brand" to={"/"}>
//                             <img
//                                 src="/logo-autobid.svg"
//                                 alt="auto bid"
//                                 height={50}
//                             />
//                         </NavLink>
//                         <button
//                             className="navbar-toggler custom-toggler"
//                             type="button"
//                             data-bs-toggle="collapse"
//                             data-bs-target="#navbarTogglerDemo02"
//                             aria-controls="navbarTogglerDemo02"
//                             aria-expanded="false"
//                             aria-label="Toggle navigation"
//                         >
//                             <span className="navbar-toggler-icon"></span>
//                         </button>
//                         <div
//                             className="collapse navbar-collapse justify-content-center"
//                             id="navbarTogglerDemo02"
//                         >
//                             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                                 <li className="nav-item">
//                                     <NavLink
//                                         className={({ isActive }) =>
//                                             isActive
//                                                 ? "nav-link active"
//                                                 : "nav-link"
//                                         }
//                                         to={"/add-car"}
//                                     >
//                                         <button
//                                             type="button"
//                                             className="btn btn-danger btn-sm rounded-pill"
//                                         >
//                                             Sell Car
//                                         </button>
//                                     </NavLink>
//                                 </li>
//                             </ul>
//                             <form
//                                 className="d-flex mx-auto search-form"
//                                 role="search"
//                             >
//                                 <input
//                                     className="form-control me-2"
//                                     type="search"
//                                     placeholder="Search for cars (ex. BMW, Audi, Ford)"
//                                     aria-label="Search"
//                                 />
//                             </form>

//                             {isLoggedIn ? (
//                                 <>
//                                     <i className="bi bi-bell-fill mx-2"></i>
//                                     <div className="dropdown mx-3">
//                                         <div
//                                             className="dropdown-toggle"
//                                             type="button"
//                                             data-bs-toggle="dropdown"
//                                             aria-expanded="false"
//                                         >
//                                             <img
//                                                 src={
//                                                     user.image_url ||
//                                                     "https://png.pngtree.com/png-clipart/20240705/original/pngtree-web-programmer-avatar-png-image_15495270.png"
//                                                 }
//                                                 alt={user.username}
//                                                 style={{
//                                                     height: "30px",
//                                                     width: "30px",
//                                                     borderRadius: "50%",
//                                                 }}
//                                             />
//                                         </div>
//                                         <ul className="dropdown-menu dropdown-menu-lg-end">
//                                             <>
//                                                 <li className="dropdown-item">
//                                                     <NavLink
//                                                         className={({
//                                                             isActive,
//                                                         }) =>
//                                                             isActive
//                                                                 ? "nav-link active"
//                                                                 : "nav-link"
//                                                         }
//                                                         to={"/user-products"}
//                                                     >
//                                                         <i className="bi bi-ev-front-fill me-2"></i>{" "}
//                                                         My Products
//                                                     </NavLink>
//                                                 </li>
//                                                 <li className="dropdown-item">
//                                                     <NavLink
//                                                         className={({
//                                                             isActive,
//                                                         }) =>
//                                                             isActive
//                                                                 ? "nav-link active"
//                                                                 : "nav-link"
//                                                         }
//                                                         to={"/user-bids"}
//                                                     >
//                                                         <i className="bi bi-envelope-arrow-up-fill me-2"></i>{" "}
//                                                         My Bids
//                                                     </NavLink>
//                                                 </li>
//                                                 <li className="dropdown-item">
//                                                     <NavLink
//                                                         className={({
//                                                             isActive,
//                                                         }) =>
//                                                             isActive
//                                                                 ? "nav-link active"
//                                                                 : "nav-link"
//                                                         }
//                                                         to={"/user-orders"}
//                                                     >
//                                                         <i className="bi bi-briefcase-fill me-2"></i>{" "}
//                                                         My Orders
//                                                     </NavLink>
//                                                 </li>
//                                                 <li className="dropdown-item">
//                                                     <NavLink
//                                                         className={({
//                                                             isActive,
//                                                         }) =>
//                                                             isActive
//                                                                 ? "nav-link active"
//                                                                 : "nav-link"
//                                                         }
//                                                         to={"/user-wallet"}
//                                                     >
//                                                         <i className="bi bi-wallet-fill me-2"></i>{" "}
//                                                         My Wallet
//                                                     </NavLink>
//                                                 </li>
//                                                 <li className="dropdown-item">
//                                                     <NavLink
//                                                         className={({
//                                                             isActive,
//                                                         }) =>
//                                                             isActive
//                                                                 ? "nav-link active"
//                                                                 : "nav-link"
//                                                         }
//                                                         to={
//                                                             "/account/dashboard"
//                                                         }
//                                                     >
//                                                         <i className="bi bi-clipboard-data-fill me-2"></i>{" "}
//                                                         Dashboard
//                                                     </NavLink>
//                                                 </li>
//                                                 <li className="dropdown-item">
//                                                     <NavLink
//                                                         className={({
//                                                             isActive,
//                                                         }) =>
//                                                             isActive
//                                                                 ? "nav-link"
//                                                                 : "nav-link"
//                                                         }
//                                                         to={"/watch-list"}
//                                                     >
//                                                         <i className="bi bi-heart-fill text-danger me-2"></i>{" "}
//                                                         Favorites
//                                                     </NavLink>
//                                                 </li>
//                                                 <li className="dropdown-item">
//                                                     <button
//                                                         className="nav-link btn btn-link text-start w-100"
//                                                         onClick={logOut}
//                                                     >
//                                                         <i className="bi bi-box-arrow-right me-2"></i>{" "}
//                                                         Logout
//                                                     </button>
//                                                 </li>
//                                             </>
//                                         </ul>
//                                     </div>
//                                 </>
//                             ) : (
//                                 <button className="btn btn-success btn-sm">
//                                     <NavLink className="nav-link" to={"/login"}>
//                                         <i className="bi bi-box-arrow-left"></i>{" "}
//                                         Login
//                                     </NavLink>
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 </nav>
//             </header>
//             <main>{children}</main>
//             <Footer />
//         </div>
//     );
// }

import { Outlet, NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import { useContext } from "react";
import { UserContext } from "../context/user-context";

export default function ClientLayout({ children }) {
    const { user, logOut } = useContext(UserContext);
    const isLoggedIn = !!user;

    console.log(isLoggedIn);

    return (
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
                            className="navbar-toggler custom-toggler"
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
                            className="collapse navbar-collapse justify-content-center"
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
                                        to={"/add-car"}
                                    >
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm rounded-pill"
                                        >
                                            Sell Car
                                        </button>
                                    </NavLink>
                                </li>
                            </ul>
                            <form
                                className="d-flex mx-auto search-form"
                                role="search"
                            >
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search for cars (ex. BMW, Audi, Ford)"
                                    aria-label="Search"
                                />
                            </form>

                            {isLoggedIn ? (
                                <>
                                    <i className="bi bi-bell-fill mx-2"></i>
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
                                                    <NavLink
                                                        className={({
                                                            isActive,
                                                        }) =>
                                                            isActive
                                                                ? "nav-link active"
                                                                : "nav-link"
                                                        }
                                                        to={"/user-products"}
                                                    >
                                                        <i className="bi bi-ev-front-fill"></i>{" "}
                                                        My Products
                                                    </NavLink>
                                                </li>
                                                <li className="dropdown-item">
                                                    <NavLink
                                                        className={({
                                                            isActive,
                                                        }) =>
                                                            isActive
                                                                ? "nav-link active"
                                                                : "nav-link"
                                                        }
                                                        to={"/user-bids"}
                                                    >
                                                        <i className="bi bi-envelope-arrow-up-fill"></i>{" "}
                                                        My Bids
                                                    </NavLink>
                                                </li>
                                                <li className="dropdown-item">
                                                    <NavLink
                                                        className={({
                                                            isActive,
                                                        }) =>
                                                            isActive
                                                                ? "nav-link active"
                                                                : "nav-link"
                                                        }
                                                        to={"/user-orders"}
                                                    >
                                                        <i className="bi bi-briefcase-fill"></i>{" "}
                                                        My Orders
                                                    </NavLink>
                                                </li>
                                                <li className="dropdown-item">
                                                    <NavLink
                                                        className={({
                                                            isActive,
                                                        }) =>
                                                            isActive
                                                                ? "nav-link active"
                                                                : "nav-link"
                                                        }
                                                        to={"/user-wallet"}
                                                    >
                                                        <i className="bi bi-wallet-fill"></i>{" "}
                                                        My Wallet
                                                    </NavLink>
                                                </li>
                                                <li className="dropdown-item">
                                                    <NavLink
                                                        className={({
                                                            isActive,
                                                        }) =>
                                                            isActive
                                                                ? "nav-link active"
                                                                : "nav-link"
                                                        }
                                                        to={
                                                            "/account/dashboard"
                                                        }
                                                    >
                                                        <i className="bi bi-clipboard-data-fill"></i>{" "}
                                                        Dashboard
                                                    </NavLink>
                                                </li>
                                                <li className="dropdown-item">
                                                    <NavLink
                                                        className={({
                                                            isActive,
                                                        }) =>
                                                            isActive
                                                                ? "nav-link"
                                                                : "nav-link"
                                                        }
                                                        to={"/watch-list"}
                                                    >
                                                        <i className="bi bi-heart-fill text-danger"></i>{" "}
                                                        Favorites
                                                    </NavLink>
                                                </li>
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
                                </>
                            ) : (
                                <button className="btn btn-success btn-sm">
                                    <NavLink className="nav-link" to={"/login"}>
                                        <i className="bi bi-box-arrow-left"></i>{" "}
                                        Login
                                    </NavLink>
                                </button>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
