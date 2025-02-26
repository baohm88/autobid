import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

export const UserContext = createContext({
    user: null,
    setUser: () => {},
    logOut: () => {},
});

// Define the UserProvider component
export const UserProvider = ({ children }) => {
    const { user, setUser, logOut } = useAuth();

    const ctxValue = { user, setUser, logOut };

    return (
        <UserContext.Provider value={ctxValue}>{children}</UserContext.Provider>
    );
};
