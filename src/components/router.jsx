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
import UserProducts from "./user/UserProducts";
import UserWallet from "./user/UserWallet";
import UserWatchList from "./user/UserWatchList";
import ProtectedRoute from "./ProtectedRoute";
import CarDetails from "./car/CarDetails";
import AddCar from "./user/AddCar";
import UpdateCar from "./user/UpdateCar";
import InProgressListings from "./user/sidebar/InProgressListings";
import LiveListings from "./user/sidebar/LiveListings";
import ListingsComments from "./user/sidebar/ListingsComments";
import PastListings from "./user/sidebar/PastListings";
import UserProfile from "./user/UserProfile";

// Admin components
import AdminAuctions from "./admin/AdminAuctions";
import AdminUsers from "./admin/AdminUsers";
import AdminHome from "./admin/AdminHome";
import AdminOrders from "./admin/AdminOrders";

export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/register", element: <Register /> },
            { path: "/login", element: <Login /> },
            {
                path: "/user-products",
                element: (
                    <ProtectedRoute>
                        <UserProducts />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/user-bids",
                element: (
                    <ProtectedRoute>
                        <UserBids />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/user-orders",
                element: (
                    <ProtectedRoute>
                        <UserOrders />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/add-car",
                element: (
                    <ProtectedRoute>
                        <AddCar />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/watch-list",
                element: (
                    <ProtectedRoute>
                        <UserWatchList />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/user-wallet",
                element: (
                    <ProtectedRoute>
                        <UserWallet />
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
                    { path: "in-progress", element: <InProgressListings /> },
                    { path: "live-auctions", element: <LiveListings /> },
                    { path: "comments", element: <ListingsComments /> },
                    { path: "past-listings", element: <PastListings /> },
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
