import AdminLayout from "../layouts/AdminLayout";
import ClientLayout from "../layouts/ClientLayout";
import Auctions from "./admin/Auctions";
import Orders from "./admin/Orders";
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

const routes = [
    { path: "/", component: Home, layout: ClientLayout },
    { path: "/register", component: Register, layout: ClientLayout },
    { path: "/login", component: Login, layout: ClientLayout },
    { path: "/user-products", component: UserProducts, layout: ClientLayout },
    { path: "/user-bids", component: UserBids, layout: ClientLayout },
    { path: "/user-orders", component: UserOrders, layout: ClientLayout },
    { path: "/user-profile", component: UserProfile, layout: ClientLayout },
    { path: "/add-car", component: CarForm, layout: ClientLayout },
    {
        path: "/watch-list",
        component: UserWatchList,
        layout: ClientLayout,
    },
    { path: "/user-wallet", component: UserWallet, layout: ClientLayout },
    {
        path: "/cars/:id",
        component: Car,
        layout: ClientLayout,
    },
    {
        path: "/account/listings",
        component: SellerDashBoard,
        layout: ClientLayout,
    },
    { path: "/auctions", component: Auctions, layout: AdminLayout },
    { path: "/orders", component: Orders, layout: AdminLayout },
];

export { routes };
