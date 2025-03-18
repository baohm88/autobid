import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminOffcanvasSidebar from "../components/admin/AdminOffcanvasSidebar";
import ScrollTopButton from "../UI/ScrollTopButton";
import { AnimatePresence, motion } from "framer-motion";
import { RiMenu2Line } from "react-icons/ri";

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
                    {/* Mobile top navbar */}
                    {isMobile && (
                        <div className="d-flex justify-content-between align-items-center p-2 bg-light border-bottom">
                            <RiMenu2Line
                                className="fs-3 text-danger"
                                onClick={() => setShowMobileSidebar(true)}
                                style={{ cursor: "pointer" }}
                            />
                            <img
                                src="/logo-autobid.svg"
                                alt="Logo"
                                height={30}
                            />
                        </div>
                    )}

                    <div className="d-flex vh-100">
                        {/* Sidebar for desktop */}
                        {!isMobile && (
                            <div
                                className={`sidebar-wrapper ${
                                    collapsed ? "collapsed" : ""
                                }`}
                            >
                                <AdminSidebar
                                    collapsed={collapsed}
                                    toggleSidebar={toggleSidebar}
                                />
                            </div>
                        )}

                        {/* Main content */}
                        <div className="flex-grow-1 p-3 overflow-auto">
                            <Outlet />
                        </div>
                    </div>

                    {/* Offcanvas Sidebar for mobile */}
                    {isMobile && (
                        <AdminOffcanvasSidebar
                            show={showMobileSidebar}
                            onHide={() => setShowMobileSidebar(false)}
                        />
                    )}

                    <ScrollTopButton />
                </motion.div>
            </AnimatePresence>
        </>
    );
}
