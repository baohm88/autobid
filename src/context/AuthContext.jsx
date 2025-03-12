// import { createContext, useContext, useState, useEffect, useRef } from "react";
// import { redirect } from "react-router-dom";

// const AuthContext = createContext({
//     user: null,
//     setUser: () => {},
//     logOut: () => {},
//     isAuthenticated: false,
//     isAdmin: false,
// });

// export const AuthProvider = ({ children }) => {
//     const [isLoggingOut, setIsLoggingOut] = useState(false);

//     const [user, setUser] = useState(() => {
//         const savedUser = localStorage.getItem("user");
//         return savedUser ? JSON.parse(savedUser) : null;
//     });

//     const isMounted = useRef(true);

//     useEffect(() => {
//         isMounted.current = true;
//         return () => {
//             isMounted.current = false;
//         };
//     }, []);

//     useEffect(() => {
//         if (isMounted.current) {
//             if (user) {
//                 localStorage.setItem("user", JSON.stringify(user));
//             } else {
//                 localStorage.removeItem("user");
//             }
//         }
//     }, [user]);

//     const logOut = () => {
//         if (isLoggingOut) return;

//         if (window.confirm("Are you sure you want to log out?")) {
//             setIsLoggingOut(true);
//             redirect("/");

//             setTimeout(() => {
//                 setUser(null);
//                 localStorage.removeItem("user");

//                 if (isMounted.current) {
//                     setIsLoggingOut(false);
//                 }
//             }, 100);
//         }
//     };

//     const isAuthenticated = !!user;
//     const isAdmin = user?.admin === true;

//     return (
//         <AuthContext.Provider
//             value={{ user, setUser, logOut, isAuthenticated, isAdmin }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // Custom hook to use auth context
// export const useAuth = () => {
//     return useContext(AuthContext);
// };


// AuthContext.jsx
import { createContext, useContext, useState, useEffect, useRef } from "react";

const AuthContext = createContext({
    user: null,
    setUser: () => {},
    isAuthenticated: false,
    isAdmin: false,
});

export const AuthProvider = ({ children }) => {
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

    const isAuthenticated = !!user;
    const isAdmin = user?.admin === true;

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
