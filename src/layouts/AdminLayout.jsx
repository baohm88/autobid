import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import ScrollTopButton from "../UI/ScrollTopButton";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "react-bootstrap";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const savedState = localStorage.getItem("admin_sidebar_collapsed");
        if (savedState) {
            setCollapsed(JSON.parse(savedState));
        }

        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const toggleSidebar = () => {
        const newState = !collapsed;
        setCollapsed(newState);
        localStorage.setItem(
            "admin_sidebar_collapsed",
            JSON.stringify(newState)
        );
    };

    return (
        <>
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Top navbar for mobile */}
                    {isMobile && (
                        <div className="d-flex justify-content-between align-items-center p-2 bg-light border-bottom">
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => setShowMobileSidebar(true)}
                            >
                                {/* <i className="bi bi-list fs-4"></i> */}
                                <HiOutlineMenuAlt1 className="fs-4" />
                            </Button>
                            <img
                                src="/logo-autobid.svg"
                                alt="Logo"
                                height={30}
                            />
                        </div>
                    )}

                    <div className="d-flex vh-100">
                        {/* Sidebar drawer on mobile */}
                        {(showMobileSidebar || !isMobile) && (
                            <div
                                className={`sidebar-wrapper ${
                                    isMobile ? "mobile" : ""
                                } ${showMobileSidebar ? "show" : ""}`}
                                onClick={() =>
                                    isMobile && setShowMobileSidebar(false)
                                }
                            >
                                <AdminSidebar
                                    collapsed={collapsed}
                                    toggleSidebar={toggleSidebar}
                                    onCloseMobile={() =>
                                        setShowMobileSidebar(false)
                                    }
                                    isMobile={isMobile}
                                />
                            </div>
                        )}

                        {/* Main content */}
                        <div className="flex-grow-1 p-3">
                            <Outlet />
                        </div>
                    </div>

                    <ScrollTopButton />
                </motion.div>
            </AnimatePresence>
        </>
    );
}
