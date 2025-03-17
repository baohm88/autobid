import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/user/DashboardSidebar";
import DashboardTopNav from "../components/user/DashboardTopNav"; // New component
import { useState } from "react";

export default function DashboardLayout() {
    const [searchTerm, setSearchTerm] = useState("");
    const [collapsed, setCollapsed] = useState(() => {
        return localStorage.getItem("dashboardSidebar") === "true";
    });

    const toggleSidebar = () => {
        setCollapsed((prev) => {
            localStorage.setItem("dashboardSidebar", !prev);
            return !prev;
        });
    };

    return (
        <div className="container d-flex flex-column flex-md-row min-vh-100 p-0">
            {/* Sidebar for medium and up */}
            <div className="d-none d-md-block">
                <DashboardSidebar
                    collapsed={collapsed}
                    toggleSidebar={toggleSidebar}
                />
            </div>

            <div className="flex-grow-1 p-2">
                <Outlet context={{ searchTerm }} />
            </div>
        </div>
    );
}
