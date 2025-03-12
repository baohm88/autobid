import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/user-context";
import { AppRouter } from "./components/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <UserProvider>
            <RouterProvider router={AppRouter} />
            <ToastContainer position="top-right" autoClose={3000} />
        </UserProvider>
    );
}

export default App;
