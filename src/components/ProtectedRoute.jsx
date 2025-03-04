import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/user-context";
import { Spinner } from "react-bootstrap";

export default function ProtectedRoute({ children, adminOnly }) {
    const { user, isLoggingOut } = useContext(UserContext);
    const location = useLocation();

    // If logging out, render nothing or a loading indicator
    if (isLoggingOut) {
        // return null; // Or return a loading spinner: <div>Logging out...</div>
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center bg-dark text-white">
                <Spinner animation="border" className="me-2" /> Logging out...
            </div>
        );
    }

    // If user is not logged in and not logging out, show alert and redirect
    if (!user) {
        if (location.pathname !== "/" && location.pathname !== "/login") {
            setTimeout(() => {
                alert("You must log in first!");
            }, 0);
        }
        return <Navigate to="/login" replace />;
    }

    // If adminOnly is true and user is not an admin, show alert and redirect
    if (adminOnly && !user.admin) {
        alert("Access denied!");
        return <Navigate to="/" replace />;
    }

    // Otherwise, render the protected content
    return children;
}
