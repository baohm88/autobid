import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import ClientLayout from "../layouts/ClientLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

// User components
import UserBids from "./user/UserBids";
import UserOrders from "./user/UserOrders";
import UserWatchList from "./user/UserWatchList";
import ProtectedRoute from "./ProtectedRoute";
import CarDetails from "./car/CarDetails";
import AddCar from "./user/AddCar";
import UpdateCar from "./user/UpdateCar";
import ListingsComments from "./user/sidebar/ListingsComments";
import UserProfile from "./user/UserProfile";

// Admin components
import AdminAuctions from "./admin/AdminAuctions";
import AdminUsers from "./admin/AdminUsers";
import AdminHome from "./admin/AdminHome";
import AdminOrders from "./admin/AdminOrders";
import UserListings from "./user/UserListings";

export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/register", element: <Register /> },
            { path: "/login", element: <Login /> },
            {
                path: "/add-car",
                element: (
                    <ProtectedRoute>
                        <AddCar />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/listings/:id",
                element: <CarDetails />,
            },
            {
                path: "/listings/:id/edit",
                element: (
                    <ProtectedRoute>
                        <UpdateCar />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/account",
                element: (
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                ),
                children: [
                    { path: "dashboard", element: <UserProfile /> },
                    { path: "listings", element: <UserListings /> },
                    { path: "comments", element: <ListingsComments /> },
                    { path: "user-bids", element: <UserBids /> },
                    { path: "user-orders", element: <UserOrders /> },
                    { path: "watch-list", element: <UserWatchList /> },
                ],
            },
        ],
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            { path: "", element: <AdminHome /> }, // Default admin landing
            { path: "auctions", element: <AdminAuctions /> },
            { path: "orders", element: <AdminOrders /> },
            { path: "users", element: <AdminUsers /> },
        ],
    },
]);
