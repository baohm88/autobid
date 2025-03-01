import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Effect to keep user state in sync with localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    // Ensure user state is initialized from localStorage on first load
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const logOut = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            setUser(null);
            localStorage.removeItem("user"); // Clear user from localStorage

            // Wait for the user state to be updated before navigating
            setTimeout(() => {
                navigate("/");
            }, 100);
        }
    };

    return { user, setUser, logOut };
};


