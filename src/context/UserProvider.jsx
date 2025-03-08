import { createContext, useContext } from "react";
import useAuth from "../hooks/useAuth";

export const UserContext = createContext({
    user: null,
    isLoggingOut: false,
    setUser: () => {},
    logOut: () => {},
});

// Define the UserProvider component
export const UserProvider = ({ children }) => {
    const auth = useAuth(); // This will now only run when UserProvider is rendered inside the Router context

    return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};