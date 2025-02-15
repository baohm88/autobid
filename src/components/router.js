import ClientLayout from "../layouts/ClientLayout";
import Car from "./Car";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
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
];

export { routes };
