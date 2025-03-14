import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="d-flex min-vh-100">
            <AdminSidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
            <div className="flex-grow-1 p-3">
                <Outlet />
            </div>
        </div>
    );
}
