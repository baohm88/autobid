import AdminLayout from "../layouts/AdminLayout";
import ClientLayout from "../layouts/ClientLayout";
import Auctions from "./admin/Auctions";
import Car from "./Car";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import CarForm from "./user/CarForm";
import SellerDashBoard from "./user/SellerDashBoard";
import UserBids from "./user/UserBids";
import UserOrders from "./user/UserOrders";
import UserProducts from "./user/UserProducts";
import UserProfile from "./user/UserProfile";
import UserWallet from "./user/UserWallet";
import UserWatchList from "./user/UserWatchList";
import ProtectedRoute from "./ProtectedRoute";
import Orders from "./admin/Orders";
import Users from "./admin/Users";
import Homes from "./admin/Homes";

const routes = [
    { path: "/", component: Home, layout: ClientLayout },
    { path: "/register", component: Register, layout: ClientLayout },
    { path: "/login", component: Login, layout: ClientLayout },
    {
        path: "/user-products",
        component: (props) => (
            <ProtectedRoute>
                <UserProducts {...props} />
            </ProtectedRoute>
        ),
        layout: ClientLayout,
    },
    {
        path: "/user-bids",
        component: (props) => (
            <ProtectedRoute>
                <UserBids {...props} />
            </ProtectedRoute>
        ),
        layout: ClientLayout,
    },
    {
        path: "/user-orders",
        component: (props) => (
            <ProtectedRoute>
                <UserOrders {...props} />
            </ProtectedRoute>
        ),
        layout: ClientLayout,
    },
    {
        path: "/user-profile",
        component: (props) => (
            <ProtectedRoute>
                <UserProfile {...props} />
            </ProtectedRoute>
        ),
        layout: ClientLayout,
    },
    {
        path: "/add-car",
        component: (props) => (
            <ProtectedRoute>
                <CarForm {...props} />
            </ProtectedRoute>
        ),
        layout: ClientLayout,
    },
    {
        path: "/watch-list",
        component: (props) => (
            <ProtectedRoute>
                <UserWatchList {...props} />
            </ProtectedRoute>
        ),
        layout: ClientLayout,
    },
    {
        path: "/user-wallet",
        component: (props) => (
            <ProtectedRoute>
                <UserWallet {...props} />
            </ProtectedRoute>
        ),
        layout: ClientLayout,
    },
    {
        path: "/cars/:id",
        component: Car,
        layout: ClientLayout,
    },
    {
        path: "/account/listings",
        component: (props) => (
            <ProtectedRoute>
                <SellerDashBoard {...props} />
            </ProtectedRoute>
        ),
        layout: ClientLayout,
    },
    {
        path: "/auctions",
        component: (props) => (
            <ProtectedRoute>
                <Auctions {...props} />
            </ProtectedRoute>
        ),
        layout: AdminLayout,
    },
    {
        path: "/orders",
        component: (props) => (
            <ProtectedRoute>
                <Orders {...props} />
            </ProtectedRoute>
        ),
        layout: AdminLayout,
    },
    {
        path: "/users",
        component: (props) => (
            <ProtectedRoute>
                <Users {...props} />
            </ProtectedRoute>
        ),
        layout: AdminLayout,
    },
    {
        path: "/homes",
        component: (props) => (
            <ProtectedRoute>
                <Homes {...props} />
            </ProtectedRoute>
        ),
        layout: AdminLayout,
    },
];

export { routes };
