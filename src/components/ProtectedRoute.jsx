// import { useContext, useEffect } from "react";
// import { UserContext } from "../context/user-context";
// import { useNavigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//     const { user } = useContext(UserContext);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!user) {
//             alert("You must log in first!");
//             navigate("/login");
//         }
//     }, [user, navigate]);

//     if (!user) {
//         return null;
//     }

//     return children;
// }


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
