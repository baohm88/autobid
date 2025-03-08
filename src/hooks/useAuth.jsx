import { useState, useEffect, useRef } from "react";
import { redirect, useNavigate } from "react-router-dom";

export default function useAuth() {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (isMounted.current) {
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                localStorage.removeItem("user");
            }
        }
    }, [user]);

    const logOut = () => {
        if (isLoggingOut) return; // Prevent multiple logout requests

        if (window.confirm("Are you sure you want to log out?")) {
            setIsLoggingOut(true); // Set logging out state

            // Navigate to home page first
            redirect("/");

            // Delay clearing the user state and localStorage
            setTimeout(() => {
                setUser(null); // Clear user state
                localStorage.removeItem("user"); // Clear user from localStorage

                if (isMounted.current) {
                    setIsLoggingOut(false); // Reset logging out state
                }
            }, 100); // Adjust the delay as needed
        }
    };

    return { user, setUser, logOut, isLoggingOut };
}
