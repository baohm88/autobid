import { useAuth } from "../context/AuthContext";
import { useCallback } from "react";

export default function useLogOut() {
    const { setUser } = useAuth();

    const logOut = useCallback(() => {
        if (window.confirm("Are you sure you want to log out?")) {
            setUser(null);
            localStorage.removeItem("user");

        }
    }, [setUser]);

    return logOut;
}
