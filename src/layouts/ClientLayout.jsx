import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
    Navbar,
    Nav,
    Container,
    Button,
    Form,
    FormControl,
    NavDropdown,
    Image,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import useLogOut from "../hooks/useLogOut";
import ScrollToTop from "../utils/ScrollToTop";
import ScrollTopButton from "../UI/ScrollTopButton";
import Footer from "../components/Footer";
import { AnimatePresence, motion } from "framer-motion";

export default function ClientLayout() {
    const { user, isAuthenticated } = useAuth();
    const logOut = useLogOut();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && searchTerm.trim() !== "") {
            navigate("/");
        }
    };

    return (
        <div>
            <ScrollToTop />
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <header>
                        <Navbar expand="md" bg="light" className="shadow-sm">
                            <Container>
                                <Navbar.Brand as={NavLink} to="/">
                                    <img
                                        src="/logo-autobid.svg"
                                        alt="auto bid"
                                        height={50}
                                    />
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls="main-navbar" />
                                <Navbar.Collapse
                                    id="main-navbar"
                                    className="justify-content-between"
                                >
                                    <Nav className="me-auto">
                                        <Nav.Link as={NavLink} to="/add-car">
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                className="rounded-pill"
                                            >
                                                Sell Car
                                            </Button>
                                        </Nav.Link>
                                    </Nav>

                                    {/* Search form */}
                                    <Form
                                        className="d-flex mx-auto w-100 d-md-none mb-2"
                                        onKeyPress={handleKeyPress}
                                    >
                                        <FormControl
                                            type="search"
                                            placeholder="Search for cars (ex. BMW, Audi, Ford)"
                                            className="me-2"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                    </Form>
                                    <Form
                                        className="d-flex mx-auto w-50 d-none d-md-flex"
                                        onKeyPress={handleKeyPress}
                                    >
                                        <FormControl
                                            type="search"
                                            placeholder="Search for cars (ex. BMW, Audi, Ford)"
                                            className="me-2"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                    </Form>

                                    {/* User area */}
                                    {isAuthenticated ? (
                                        <Nav className="align-items-center">
                                            <i className="bi bi-bell-fill me-3 fs-5"></i>
                                            <NavDropdown
                                                align="end"
                                                title={
                                                    <Image
                                                        src={
                                                            user.image_url ||
                                                            "https://png.pngtree.com/png-clipart/20240705/original/pngtree-web-programmer-avatar-png-image_15495270.png"
                                                        }
                                                        roundedCircle
                                                        height={30}
                                                        width={30}
                                                    />
                                                }
                                                id="user-dropdown"
                                            >
                                                <NavDropdown.Item
                                                    as={NavLink}
                                                    to="/user-bids"
                                                >
                                                    <i className="bi bi-envelope-arrow-up-fill me-2"></i>{" "}
                                                    My Bids
                                                </NavDropdown.Item>
                                                <NavDropdown.Item
                                                    as={NavLink}
                                                    to="/user-orders"
                                                >
                                                    <i className="bi bi-briefcase-fill me-2"></i>{" "}
                                                    My Orders
                                                </NavDropdown.Item>

                                                <NavDropdown.Item
                                                    as={NavLink}
                                                    to="/account/dashboard"
                                                >
                                                    <i className="bi bi-clipboard-data-fill me-2"></i>{" "}
                                                    Dashboard
                                                </NavDropdown.Item>
                                                <NavDropdown.Item
                                                    as={NavLink}
                                                    to="/watch-list"
                                                >
                                                    <i className="bi bi-heart-fill text-danger me-2"></i>{" "}
                                                    Favorites
                                                </NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item
                                                    as="button"
                                                    onClick={logOut}
                                                >
                                                    <i className="bi bi-box-arrow-right me-2"></i>{" "}
                                                    Logout
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </Nav>
                                    ) : (
                                        <Button
                                            variant="success"
                                            size="sm"
                                            className="mt-2"
                                        >
                                            <NavLink
                                                className="nav-link text-white"
                                                to="/login"
                                            >
                                                <i className="bi bi-box-arrow-left me-2"></i>{" "}
                                                Login
                                            </NavLink>
                                        </Button>
                                    )}
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </header>

                    <main className="mt-3">
                        <Outlet context={{ searchTerm }} />
                    </main>

                    <ScrollTopButton />
                    <Footer />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
