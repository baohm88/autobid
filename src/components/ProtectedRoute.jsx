import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/user-context";

export default function ProtectedRoute({ children, adminOnly }) {
    const { user } = useContext(UserContext);

    if (!user) {
        alert("You must log in first!");
        return <Navigate to="/login" />;
    }

    if (adminOnly && !user.admin) {
        alert("Access denied!");
        return <Navigate to="/" />;
    }

    return children;
}
