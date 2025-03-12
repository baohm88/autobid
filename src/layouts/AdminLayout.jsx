import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout() {
    const location = useLocation();
    const showSidebar = location.pathname.startsWith("/admin");

    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="d-flex min-vh-100">
            {showSidebar && (
                <AdminSidebar
                    collapsed={collapsed}
                    toggleSidebar={toggleSidebar}
                />
            )}
            <div className="flex-grow-1 p-3">
                <Outlet />
            </div>
        </div>
    );
}
